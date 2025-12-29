<?php
// DANS api/orders/create.php

// 1. CONFIGURATION
ob_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    http_response_code(200);
    exit;
}

try {
    // 2. AUTHENTIFICATION & DONNÉES
    require_once __DIR__ . '/../config/database.php'; 
    require_once __DIR__ . '/../Manager/UserManager.php';

    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;
    $token = $authHeader ? str_replace('Bearer ', '', $authHeader) : null;

    if (!$token) throw new Exception('Token manquant', 401);

    $userManager = new UserManager();
    $user = $userManager->getUserByToken($token);

    if (!$user) throw new Exception('Utilisateur non trouvé', 401);

    $input = json_decode(file_get_contents("php://input"), true);
    
    // Vérification de base
    if (!isset($input['items']) || !is_array($input['items'])) throw new Exception('Panier vide ou format invalide', 400);

    // Vérification limite 10 box et quantité
    $totalQuantity = 0;
    foreach ($input['items'] as $item) {
        $totalQuantity += (int)($item['quantite'] ?? 0); 
    }
    
    if ($totalQuantity <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Erreur fatale: Panier vide (aucune quantité positive trouvée)']);
        exit;
    }

    if ($totalQuantity > 10) {
        http_response_code(409);
        echo json_encode(['error' => 'Limite de 10 boîtes par commande atteinte.']);
        exit;
    }

    // 3. TRANSACTION SQL
    $db = new Database();
    $pdo = $db->getConnection();
    $pdo->beginTransaction();

    // Gestion du code promo
    $codePromo = $input['codePromo'] ?? null;
    $promoTag = "";

    if ($codePromo === 'OISHI2026') {
         // VÉRIFICATION D'USAGE UNIQUE (Via hack signature dans l'adresse pour éviter changement SQL)
         $stmtCheckPromo = $pdo->prepare("SELECT COUNT(*) FROM orders WHERE user_id = :uid AND adresse LIKE :tag");
         $stmtCheckPromo->execute(['uid' => $user['id'], 'tag' => '%[PROMO:OISHI2026]%']);
         $alreadyUsed = $stmtCheckPromo->fetchColumn();

         if ($alreadyUsed > 0) {
             throw new Exception("Le code promo OISHI2026 a déjà été utilisé sur ce compte.", 403);
         }
         
         $promoTag = "\n[PROMO:OISHI2026]";
    }

    // ADRESSE
    $adresse = null;
    if (isset($input['client'])) {
        $client = $input['client'];
        $adresse_text = "Nom: " . ($client['nom'] ?? 'N/A') . "\n";
        $adresse_text .= "Email: " . ($client['email'] ?? 'N/A') . "\n";
        $adresse_text .= "Téléphone: " . ($client['telephone'] ?? 'N/A') . "\n";
        $adresse_text .= "Adresse: " . ($client['adresse'] ?? 'N/A') . "\n";
        $adresse_text .= "Notes: " . ($client['notes'] ?? 'Aucune');
        
        // On marque l'adresse avec le tag promo pour traquer l'usage
        $adresse_text .= $promoTag; 

        $adresse = $adresse_text;
    }

    // Insertion Commande
    $sqlOrder = "INSERT INTO orders (user_id, total_price, status, adresse, created_at) 
                 VALUES (:user_id, 0.00, 'on_site_payment', :adresse, NOW())";
    
    $stmtOrder = $pdo->prepare($sqlOrder);
    $stmtOrder->execute([
        'user_id' => $user['id'],
        'adresse' => $adresse 
    ]);

    $orderId = $pdo->lastInsertId();

    // Insertion Items & Calcul Total
    $sqlItem = "INSERT INTO order_items (order_id, box_id, quantity, unit_price) 
                VALUES (:order_id, :box_id, :quantity, :unit_price)";
    $stmtItem = $pdo->prepare($sqlItem);
    $sqlPrice = $pdo->prepare("SELECT price FROM boxes WHERE id = :id");

    $totalCalculated = 0;
    $foundItems = 0;

    foreach ($input['items'] as $item) {
        $boxId = $item['boxId'] ?? null;
        $quantite = (int)($item['quantite'] ?? 0);
        
        if (!$boxId || $quantite <= 0) continue; 
        
        $sqlPrice->execute(['id' => $boxId]); 
        $box = $sqlPrice->fetch(PDO::FETCH_ASSOC);
        
        if ($box) {
            $price = floatval($box['price']); 
            $stmtItem->execute([
                'order_id' => $orderId,
                'box_id' => $boxId, 
                'quantity' => $quantite, 
                'unit_price' => $price
            ]);
            $totalCalculated += ($price * $quantite); 
            $foundItems++;
        }
    }
    
    if ($foundItems === 0 || $totalCalculated <= 0) {
        $pdo->rollBack();
        http_response_code(409);
        echo json_encode(['error' => "Erreur critique : Calcul de la commande impossible."]);
        exit;
    }

    // 4. APPLICATION DES REMISES
    // Remise Étudiant (-10%)
    if (isset($user['status']) && $user['status'] === 'student') {
        $totalCalculated = $totalCalculated * 0.90;
    }

    // Remise Volume > 50€ (-1.5%)
    if ($totalCalculated > 50) {
        $totalCalculated = $totalCalculated * 0.985;
    }

    // --- REMISE CODE PROMO (-20%) SI VALIDE ---
    if ($codePromo === 'OISHI2026') {
        // La vérification d'unicité a déjà été faite plus haut
        $totalCalculated = $totalCalculated * 0.80; 
    }
    
    $finalTotal = floatval($totalCalculated);

    $sqlUpdate = "UPDATE orders SET total_price = :total_price WHERE id = :id";
    $stmtUpdate = $pdo->prepare($sqlUpdate);
    $stmtUpdate->execute(['total_price' => $finalTotal, 'id' => $orderId]);

    // Update User Stats
    $sqlUserStats = $pdo->prepare("UPDATE users SET nb_commande = nb_commande + 1, depense_totale = depense_totale + :total WHERE id = :user_id");
    $sqlUserStats->execute(['total' => $finalTotal, 'user_id' => $user['id']]);

    $pdo->commit();

    ob_end_clean();
    http_response_code(201);
    echo json_encode(['success' => true, 'order_id' => $orderId]);

} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
    ob_end_clean();
    http_response_code($e->getCode() ?: 500);
    echo json_encode(['error' => 'Erreur: ' . $e->getMessage()]);
}
?>

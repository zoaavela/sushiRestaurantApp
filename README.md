# Oishi - Borne de Commande Digitale

**Oishi** est une application web de type "borne tactile" permettant aux clients de consulter le catalogue et de passer commande directement en restaurant. Le projet repose sur une architecture découplée utilisant **Angular** pour l'interface utilisateur et **PHP** pour la gestion des données et de l'API.

---

## Technologies Utilisées

* **Frontend :** Angular (TypeScript, HTML, CSS)
* **Backend :** PHP (API REST)
* **Base de Données :** MySQL
* **Serveur Local :** Environnement type XAMPP / WAMP / MAMP

---

## Protocole d'Installation

Suivez rigoureusement ces étapes pour déployer le projet sur votre machine locale :

### 1. Préparation de la Base de Données
1. Lancez votre serveur MySQL (via XAMPP/WAMP/MAMP).
2. Ouvrez **phpMyAdmin** et créez une nouvelle base de données nommée : `sushi_box`.
3. Importez le fichier `sushi_box.sql` (situé à la racine du projet) pour générer les tables et les données de test.

### 2. Configuration du Backend (API PHP)
Le dossier API doit être servi par votre serveur local (Apache) pour traiter les requêtes.
1. Localisez le dossier **`API/`** à la racine de ce projet.
2. Déplacez ou copiez l'intégralité de ce dossier dans le répertoire **htdocs** de votre installation :
   * *Exemple Windows :* `C:\xampp\htdocs\API`
   * *Exemple Mac :* `/Applications/MAMP/htdocs/API`
3. Vérifiez que votre serveur Apache est bien activé.

### 3. Lancement du Frontend (Angular)
1. Ouvrez un terminal dans le dossier racine du projet (là où se trouve le dossier `sushi_box/`).
2. Installez les dépendances Node.js :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement Angular :
   ```bash
   ng serve
   ```
4. Ouvrez votre navigateur sur : http://localhost:4200

---

## Arborescence du Projet

```
.
├── API/                 # Dossier Backend PHP (À DÉPLACER DANS HTDOCS)
│   └── ...              # Scripts de récupération et d'envoi de données
├── sushi_box/           # Code source Angular (Composants, Services, Styles)
├── sushi_box.sql        # Script d'importation de la base de données MySQL
└── README.md            # Documentation
```

---

## Fonctionnalités du Site

* **Catalogue Dynamique :** Affichage des produits récupérés via l'API.
* **Gestion du Panier :** Système d'ajout et de suppression d'articles avec calcul du total automatique.
* **Validation de Commande :** Envoi de la sélection client vers la base de données pour traitement en cuisine.
* **Interface Borne :** Design épuré et ergonomique, adapté à un usage sur écran tactile.

> **Note :** Ce projet est une borne de commande, il n'intègre pas de module de paiement en ligne.

---

# Oishī



🍣 Sushi Box - Borne de Commande Digitale

Sushi Box est une application web de type borne de commande (sans paiement en ligne) permettant de simuler une prise de commande fluide en restaurant. Le projet lie une interface moderne en Angular à un backend PHP pour la gestion des données.



🚀 Technologies Utilisées

Frontend : Angular (TypeScript, HTML, CSS)



Backend : PHP (API REST)



Base de Données : MySQL



Serveur Local : Environnement type XAMPP / WAMP / MAMP



🛠️ Protocole d'Installation

Suivez rigoureusement ces étapes pour déployer le projet localement :



1\. Base de Données

Lancez votre serveur MySQL (via XAMPP/WAMP).



Créez une base de données nommée : sushi-box.



Importez le fichier sushi\_box.sql situé à la racine du projet.



2\. Configuration du Backend (API)

Le dossier API contient les scripts PHP nécessaires au fonctionnement du site.



Localisez le dossier API dans les fichiers téléchargés.



Déplacez ce dossier dans le répertoire htdocs de votre serveur local (ex: C:/xampp/htdocs/).



Assurez-vous que le serveur Apache est activé.



3\. Lancement du Frontend (Angular)

Ouvrez un terminal dans le dossier contenant le projet Angular (là où se trouve le dossier src).



Installez les dépendances :



Bash



npm install

Lancez le serveur de développement :



Bash



ng serve

L'application est alors accessible à l'adresse : http://localhost:4200



📂 Arborescence du Projet (GitHub)

Voici l'organisation des fichiers telle qu'elle apparaît sur ce dépôt :



Plaintext



.

├── sushi\_box/          # Code source Angular (TS, HTML, CSS)

├── API/                # Scripts PHP (à déplacer dans htdocs)

├── sushi\_box.sql       # Script d'importation de la base de données

└── README.md           # Documentation📋 Fonctionnalités du Site



Catalogue complet : Affichage dynamique des sushis et menus.



Panier interactif : Ajout et suppression de produits sans rechargement de page.



Validation de commande : Envoi de la sélection client vers la base de données.



Interface Borne : Design épuré adapté à une utilisation tactile sur site.



Note : Pas de module de paiement (validation simple).



👤 Auteur

Ton Nom / Pseudo - Développement Fullstack



S


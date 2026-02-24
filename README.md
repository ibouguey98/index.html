# 🌟 Biinaa-Glam - Boutique de Luxe en Ligne

BIINAA_GLAM est une entreprise spécialisée dans la vente de sacs et de chaussures faits main, 100 % « MADE IN SÉNÉGAL ». Alliant créativité, qualité artisanale et identité culturelle ; BIINAA_GLAM se positionne comme une marque engagée dans la valorisation du savoir-faire local et la promotion de la mode éthique. Chaque pièce est conçue avec soin par des artisans sénégalais, en utilisant des matériaux durables et en respectant les traditions culturelles pour offrir des produits uniques et responsables.

Boutique en ligne élégante et luxueuse pour cosmétiques et accessoires de beauté premium.

## ✨ Caractéristiques

- **Design Luxueux**: Thème or, noir et blanc cassé
- **Responsive**: Optimisé pour tous les appareils (mobile, tablette, desktop)
- **Panier Dynamique**: Gestion complète du panier avec ajout/suppression/quantité
- **Commande WhatsApp**: Commande directe via WhatsApp au +221 77 806 99 48
- **Animations Élégantes**: Transitions fluides et effets visuels sophistiqués
- **12 Produits Premium**: Collection variée de cosmétiques et accessoires

## 🎨 Palette de Couleurs

- **Or**: #D4AF37 (couleur principale)
- **Noir**: #1a1a1a (texte et fond)
- **Blanc Cassé**: #f8f5f0 (arrière-plan)
- **Or Clair**: #F4E4B8 (accents)

## 📁 Structure des Fichiers

```
Biinaa-Glam/
├── index.html          # Page principale
├── styles.css          # Styles CSS luxueux
├── app.js              # Logique JavaScript
├── products.json       # Base de données des produits
├── logo.png            # Logo de la boutique (à ajouter)
└── README.md           # Documentation
```

## 🚀 Installation

1. Placez votre logo dans le dossier principal avec le nom `logo.png`
2. Ouvrez `index.html` dans votre navigateur
3. La boutique est prête à l'emploi!

## 📱 Contact


## 🛠️ Technologies Utilisées


## Backend Node.js (optionnel)
---------------------------

Un backend Node.js minimal est inclus pour recevoir les formulaires en local et stocker les entrées dans `contacts.csv`.

1. Ouvrez un terminal dans le dossier du projet:

```powershell
cd "c:\Users\UVS\OneDrive\Documents\html\Biinaa-Glam"
```

2. Installez les dépendances puis démarrez le serveur:

```powershell
npm install
npm start
```

3. Le serveur écoute par défaut sur `http://localhost:3000`. Le formulaire (`contact.html`) est configuré pour poster vers `http://localhost:3000/contact`.

4. Les soumissions sont ajoutées à `contacts.csv` dans le dossier du projet.

Remarque: si vous préférez envoyer vers Google Sheets (Apps Script), remplacez `WEBHOOK_URL` dans `contact.html` par l'URL `/exec` fournie par Apps Script.

Page d'administration (local)
----------------------------

Un simple tableau d'administration est disponible à `http://localhost:3000/admin.html` après démarrage du serveur.

- Mot de passe par défaut: `admin123` (variable d'environnement `ADMIN_PASSWORD` pour changer)
- Le tableau charge les entrées via `/admin/data` (protégé par Basic Auth) et permet de télécharger le fichier `contacts.csv`.

Pour changer le mot de passe avant démarrage (Windows PowerShell):

```powershell
$env:ADMIN_PASSWORD = "votre_mot_de_passe"
npm start
```


## 📝 Instructions pour le Logo

Pour ajouter votre logo:
1. Nommez votre fichier logo `logo.png`
2. Placez-le dans le dossier principal
3. Dimensions recommandées: 200x60px (transparent PNG)
4. Le logo s'affichera automatiquement dans le header

Si aucun logo n'est trouvé, le nom "Biinaa-Glam" s'affichera automatiquement.

## 🎯 Fonctionnalités du Panier

- Ajout de produits
- Modification des quantités (+/-)
- Suppression d'articles
- Calcul automatique du total
- Commande via WhatsApp avec récapitulatif

## 💎 Design Premium

- Typographie élégante (Playfair Display pour les titres)
- Effets de hover sophistiqués
- Animations fluides
- Dégradés dorés
- Ombres élégantes
- Section hero immersive

## 📞 Support

Pour toute question ou personnalisation, contactez-nous au +221 77 806 99 48

---

**Biinaa-Glam** - L'Excellence de la Beauté 💄✨

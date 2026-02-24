# Script de déploiement GitHub pour Biinaa-Glam
# Exécuter ce script après l'installation de Git et GitHub CLI

Write-Host "🚀 Déploiement de Biinaa-Glam sur GitHub..." -ForegroundColor Yellow

# Configuration Git
git config --global user.email "ibouguey98@github.com"
git config --global user.name "ibouguey98"

# Initialiser le dépôt
git init
Write-Host "✅ Dépôt Git initialisé" -ForegroundColor Green

# Ajouter tous les fichiers
git add .
Write-Host "✅ Fichiers ajoutés" -ForegroundColor Green

# Premier commit
git commit -m "Initial commit - Biinaa-Glam boutique de luxe en ligne"
Write-Host "✅ Commit créé" -ForegroundColor Green

# Connexion GitHub CLI
Write-Host "🔐 Connexion à GitHub..." -ForegroundColor Yellow
gh auth login

# Créer le repository sur GitHub
gh repo create Biinaa-glam --public --description "Boutique de luxe en ligne - Cosmétiques, Chaussures, Sacs & Accessoires" --source=. --remote=origin --push
Write-Host "✅ Repository créé et fichiers poussés sur GitHub!" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Votre boutique est maintenant sur GitHub!" -ForegroundColor Cyan
Write-Host "🌐 URL: https://github.com/ibouguey98/Biinaa-glam" -ForegroundColor Cyan

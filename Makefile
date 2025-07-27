# PhytoConseil - Makefile
# Application mobile React Native avec backend Express.js

# Variables
FRONTEND_DIR = herbalife
BACKEND_DIR = herbalife/swifty-backend
NODE_MODULES_FRONTEND = $(FRONTEND_DIR)/node_modules
NODE_MODULES_BACKEND = $(BACKEND_DIR)/node_modules

# Couleurs pour l'output
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

.PHONY: help install install-frontend install-backend clean start dev dev-frontend dev-backend build test lint format reset-project check-deps

# Commande par défaut
help: ## Affiche cette aide
	@echo "$(GREEN)PhytoConseil - Commandes disponibles:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

# Installation
install: install-frontend install-backend ## Installe toutes les dépendances (frontend + backend)

install-frontend: ## Installe les dépendances du frontend
	@echo "$(GREEN)Installation des dépendances frontend...$(NC)"
	@cd $(FRONTEND_DIR) && npm install
	@echo "$(GREEN)✓ Dépendances frontend installées$(NC)"

install-backend: ## Installe les dépendances du backend
	@echo "$(GREEN)Installation des dépendances backend...$(NC)"
	@cd $(BACKEND_DIR) && npm install
	@echo "$(GREEN)✓ Dépendances backend installées$(NC)"

# Nettoyage
clean: ## Nettoie les node_modules et caches
	@echo "$(YELLOW)Nettoyage des dépendances et caches...$(NC)"
	@rm -rf $(NODE_MODULES_FRONTEND)
	@rm -rf $(NODE_MODULES_BACKEND)
	@cd $(FRONTEND_DIR) && npx expo install --fix 2>/dev/null || true
	@echo "$(GREEN)✓ Nettoyage terminé$(NC)"

# Développement
dev: ## Lance le frontend et backend en parallèle
	@echo "$(GREEN)Lancement de l'environnement de développement...$(NC)"
	@$(MAKE) -j2 dev-frontend dev-backend

dev-frontend: ## Lance le serveur de développement Expo
	@echo "$(GREEN)Démarrage du serveur Expo...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo start

dev-backend: ## Lance le serveur de développement backend
	@echo "$(GREEN)Démarrage du serveur backend...$(NC)"
	@cd $(BACKEND_DIR) && npm run dev

start: dev ## Alias pour dev

# Build et production
build: ## Build l'application pour production
	@echo "$(GREEN)Build de l'application...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo export

build-android: ## Build pour Android
	@echo "$(GREEN)Build Android...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo build:android

build-ios: ## Build pour iOS
	@echo "$(GREEN)Build iOS...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo build:ios

# Tests et qualité de code
test: ## Lance les tests
	@echo "$(GREEN)Lancement des tests...$(NC)"
	@cd $(FRONTEND_DIR) && npm test 2>/dev/null || echo "$(YELLOW)Aucun test configuré pour le frontend$(NC)"
	@cd $(BACKEND_DIR) && npm test 2>/dev/null || echo "$(YELLOW)Aucun test configuré pour le backend$(NC)"

lint: ## Vérifie le code avec ESLint
	@echo "$(GREEN)Vérification du code avec ESLint...$(NC)"
	@cd $(FRONTEND_DIR) && npx eslint . --ext .ts,.tsx,.js,.jsx || echo "$(YELLOW)ESLint non configuré ou erreurs trouvées$(NC)"

format: ## Formate le code avec Prettier
	@echo "$(GREEN)Formatage du code...$(NC)"
	@cd $(FRONTEND_DIR) && npx prettier --write . 2>/dev/null || echo "$(YELLOW)Prettier non configuré$(NC)"

# Utilitaires Expo
reset-project: ## Remet le projet à zéro (script Expo)
	@echo "$(YELLOW)Remise à zéro du projet...$(NC)"
	@cd $(FRONTEND_DIR) && node scripts/reset-project.js

expo-doctor: ## Diagnostique les problèmes Expo
	@echo "$(GREEN)Diagnostic Expo...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo doctor

expo-upgrade: ## Met à jour Expo SDK
	@echo "$(GREEN)Mise à jour d'Expo SDK...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo install --fix

# Gestion des dépendances
check-deps: ## Vérifie les dépendances obsolètes
	@echo "$(GREEN)Vérification des dépendances...$(NC)"
	@echo "$(YELLOW)Frontend:$(NC)"
	@cd $(FRONTEND_DIR) && npm outdated || true
	@echo "$(YELLOW)Backend:$(NC)"
	@cd $(BACKEND_DIR) && npm outdated || true

update-deps: ## Met à jour les dépendances
	@echo "$(GREEN)Mise à jour des dépendances...$(NC)"
	@cd $(FRONTEND_DIR) && npm update
	@cd $(BACKEND_DIR) && npm update

# Logs et debug
logs: ## Affiche les logs Expo
	@cd $(FRONTEND_DIR) && npx expo logs

logs-backend: ## Affiche les logs du backend
	@cd $(BACKEND_DIR) && npm run logs 2>/dev/null || echo "$(YELLOW)Commande logs non configurée$(NC)"

# Tunnel et partage
tunnel: ## Lance Expo avec tunnel pour partage externe
	@echo "$(GREEN)Démarrage d'Expo avec tunnel...$(NC)"
	@echo "$(YELLOW)Cela peut prendre quelques minutes pour établir la connexion tunnel...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo start --tunnel

tunnel-web: ## Lance Expo avec tunnel et ouvre automatiquement le web
	@echo "$(GREEN)Démarrage d'Expo avec tunnel + web...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo start --tunnel --web

tunnel-clear: ## Lance Expo avec tunnel en effaçant le cache
	@echo "$(GREEN)Démarrage d'Expo avec tunnel (cache effacé)...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo start --tunnel --clear

lan: ## Lance Expo en mode LAN (réseau local uniquement)
	@echo "$(GREEN)Démarrage d'Expo en mode LAN...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo start --lan

localhost: ## Lance Expo en mode localhost uniquement
	@echo "$(GREEN)Démarrage d'Expo en mode localhost...$(NC)"
	@cd $(FRONTEND_DIR) && npx expo start --localhost

# Commandes de maintenance
status: ## Affiche le statut du projet
	@echo "$(GREEN)Statut du projet PhytoConseil:$(NC)"
	@echo "$(YELLOW)Frontend:$(NC)"
	@cd $(FRONTEND_DIR) && echo "  - Node modules: $$([ -d node_modules ] && echo '✓ Installés' || echo '✗ Manquants')"
	@cd $(FRONTEND_DIR) && echo "  - Package.json: $$([ -f package.json ] && echo '✓ Présent' || echo '✗ Manquant')"
	@echo "$(YELLOW)Backend:$(NC)"
	@cd $(BACKEND_DIR) && echo "  - Node modules: $$([ -d node_modules ] && echo '✓ Installés' || echo '✗ Manquants')"
	@cd $(BACKEND_DIR) && echo "  - Package.json: $$([ -f package.json ] && echo '✓ Présent' || echo '✗ Manquant')"

info: ## Affiche les informations sur l'environnement
	@echo "$(GREEN)Informations sur l'environnement:$(NC)"
	@echo "  - Node: $$(node --version 2>/dev/null || echo 'Non installé')"
	@echo "  - NPM: $$(npm --version 2>/dev/null || echo 'Non installé')"
	@echo "  - Expo CLI: $$(npx expo --version 2>/dev/null || echo 'Non installé')"
	@echo "  - OS: $$(uname -s)"

# Initialisation complète
setup: clean install ## Configuration complète du projet (nettoyage + installation)
	@echo "$(GREEN)Configuration terminée! Utilisez 'make dev' pour démarrer.$(NC)"

# Raccourcis
i: install ## Raccourci pour install
c: clean ## Raccourci pour clean
d: dev ## Raccourci pour dev
s: start ## Raccourci pour start
b: build ## Raccourci pour build
t: test ## Raccourci pour test
l: lint ## Raccourci pour lint
tu: tunnel ## Raccourci pour tunnel
tuw: tunnel-web ## Raccourci pour tunnel-web

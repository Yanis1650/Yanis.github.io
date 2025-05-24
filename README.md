# 🎨 Portfolio Yanis Lepesant - Architecture Modulaire

> Portfolio personnel de Yanis Lepesant, étudiant en Master SIGAT (Systèmes d'Information Géographique et Analyse Territoriale)

## 📋 Table des matières

- [🏗️ Architecture](#️-architecture)
- [📁 Structure des fichiers](#-structure-des-fichiers)
- [🚀 Installation et utilisation](#-installation-et-utilisation)
- [🔧 Modules](#-modules)
- [🎨 Styles](#-styles)
- [📱 Responsive Design](#-responsive-design)
- [🛠️ Développement](#️-développement)
- [🔄 Migration](#-migration)

---

## 🏗️ Architecture

Le portfolio utilise une **architecture modulaire** pour une meilleure maintenabilité et organisation du code.

### Principes de conception :
- ✅ **Séparation des responsabilités** : Chaque module a une fonction spécifique
- ✅ **Code réutilisable** : Modules indépendants et facilement extensibles
- ✅ **Performance optimisée** : Chargement modulaire et animations optimisées
- ✅ **Accessibilité** : Support des standards web et navigation clavier
- ✅ **Responsive** : Adaptation automatique à tous les écrans

---

## 📁 Structure des fichiers

```
portfolio/
├── index-new.html          # 🆕 Fichier HTML principal (nouvelle version)
├── index.html              # 📄 Ancien fichier HTML (backup)
├── styles.css              # 🎨 Ancien fichier CSS monolithique (backup)
├── script.js               # ⚙️ Ancien fichier JS monolithique (backup)
├── css/                    # 🎨 Modules CSS
│   ├── main.css           # Import principal de tous les modules
│   ├── base.css           # Styles de base et typographie
│   ├── navbar.css         # Navigation et menu
│   ├── intro.css          # Section d'introduction
│   ├── buttons.css        # Boutons et liens
│   ├── icons.css          # Icônes et compétences
│   ├── projects.css       # Projets et sections de contenu
│   └── responsive.css     # Adaptations mobiles et tablettes
├── js/                     # ⚙️ Modules JavaScript
│   ├── main.js            # Gestionnaire principal de l'application
│   ├── navigation.js      # Gestion navigation et menu hamburger
│   ├── tabs.js            # Système d'onglets et sections
│   └── animations.js      # Animations et effets visuels
├── DATA/                   # 📊 Assets (images, PDF, projets)
│   ├── CARTES/            # Cartes et visualisations
│   ├── PROJETS/           # Documents de projets
│   ├── WEB/               # Projets web interactifs
│   └── COMPETENCES/       # CV et documents
└── README.md              # 📖 Cette documentation
```

---

## 🚀 Installation et utilisation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel, pour le développement)

### Utilisation
1. **Option 1 - Fichier local** :
   ```bash
   # Ouvrir directement dans le navigateur
   open index-new.html
   ```

2. **Option 2 - Serveur local** :
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js
   npx http-server
   
   # Avec PHP
   php -S localhost:8000
   ```

3. Accéder à `http://localhost:8000/index-new.html`

---

## 🔧 Modules

### 📱 NavigationModule (`js/navigation.js`)
**Responsabilité** : Gestion de la navigation et du menu responsive

**Fonctionnalités** :
- Menu hamburger pour mobile
- Adaptation automatique selon la taille d'écran
- Gestion des événements de redimensionnement

**API** :
```javascript
NavigationModule.toggleMenu()      // Bascule le menu mobile
NavigationModule.handleWindowResize() // Ajuste selon l'écran
```

### 📑 TabsModule (`js/tabs.js`)
**Responsabilité** : Système d'onglets et navigation entre sections

**Fonctionnalités** :
- Affichage/masquage des sections
- Gestion des états actifs
- Retour à l'accueil via le logo

**API** :
```javascript
TabsModule.showSection(sectionId)     // Affiche une section
TabsModule.resetTabsAndMainContent()  // Retour accueil
```

### ✨ AnimationsModule (`js/animations.js`)
**Responsabilité** : Animations et effets visuels

**Fonctionnalités** :
- Animations au scroll (IntersectionObserver)
- Effets de survol
- Animations d'apparition (fade-in)
- Performance optimisée (requestAnimationFrame)

**API** :
```javascript
AnimationsModule.fadeIn(element, delay)           // Animation fade-in
AnimationsModule.addHoverAnimation(element, type) // Effet survol
```

### 🎛️ PortfolioApp (`js/main.js`)
**Responsabilité** : Orchestration générale de l'application

**Fonctionnalités** :
- Initialisation des modules
- Gestion des erreurs globales
- Configuration centralisée

---

## 🎨 Styles

### Variables CSS globales
```css
:root {
    --primary-bg: #1b1f24;           /* Arrière-plan principal */
    --text-color: #fff;              /* Couleur du texte */
    --accent-color: #1e90ff;         /* Couleur d'accent */
    --accent-shadow: rgba(30, 144, 255, 0.8); /* Ombre accent */
    --border-radius: 15px;           /* Rayons des bordures */
    --transition-speed: 0.3s;        /* Vitesse des transitions */
    --font-family: 'Arial', sans-serif; /* Police principale */
}
```

### Modules CSS
- **`base.css`** : Reset, typographie, styles globaux
- **`navbar.css`** : Navigation, logo, menu hamburger
- **`intro.css`** : Section héro, présentation personnelle
- **`buttons.css`** : Boutons CTA, liens stylisés
- **`icons.css`** : Grille d'icônes de compétences
- **`projects.css`** : Sections projets, layout Flexbox
- **`responsive.css`** : Media queries, adaptations mobiles

---

## 📱 Responsive Design

### Breakpoints
- **Desktop** : > 768px
- **Tablette** : 481px - 768px
- **Mobile** : ≤ 480px

### Adaptations principales
- Menu hamburger sur mobile
- Images redimensionnées
- Layout en colonne sur petits écrans
- Espacement optimisé
- Texte adaptatif

---

## 🛠️ Développement

### Ajout d'un nouveau module CSS
1. Créer le fichier dans `css/`
2. Ajouter l'import dans `css/main.css` :
   ```css
   @import url('./nouveau-module.css');
   ```

### Ajout d'un nouveau module JavaScript
1. Créer le fichier dans `js/`
2. Suivre le pattern :
   ```javascript
   const NouveauModule = {
       init() {
           // Initialisation
           console.log('🆕 Nouveau module initialisé');
       }
   };
   window.NouveauModule = NouveauModule;
   ```
3. Ajouter l'enregistrement dans `js/main.js` :
   ```javascript
   if (window.NouveauModule) {
       this.registerModule('nouveau', window.NouveauModule);
   }
   ```

### Debugging
Le mode debug est activé par défaut. Pour le désactiver :
```javascript
// Dans js/main.js
config: {
    debug: false  // Désactive les logs
}
```

---

## 🔄 Migration

### De l'ancienne version vers la nouvelle

**Fichiers sauvegardés** :
- `index.html` → Ancienne version HTML
- `styles.css` → Ancien CSS monolithique  
- `script.js` → Ancien JavaScript monolithique

**Nouveau point d'entrée** :
- `index-new.html` → **Nouvelle version modulaire**

### Pour basculer définitivement :
```bash
# Sauvegarder l'ancienne version
mv index.html index-old.html

# Activer la nouvelle version
mv index-new.html index.html
```

---

## 🎯 Sections du Portfolio

1. **🗺️ Webmapping** : Cartes interactives, visualisations géographiques
2. **🗺️ Cartographie** : Analyses cartographiques, data visualization  
3. **💻 Code** : Projets de développement, scripts R/Python
4. **🎨 Design** : Créations graphiques, posters scientifiques
5. **🏢 Atelier** : Projets professionnels, rapports d'étude
6. **🏘️ Urbanisme** : Planification urbaine, diagnostics territoriaux
7. **🛰️ Télédétection** : Analyses d'images satellites, SIG

---

## 📧 Contact

**Yanis Lepesant**  
📧 lepesantya@gmail.com  
💼 [LinkedIn](https://www.linkedin.com/in/yanis-lepesant)  
🎓 Master SIGAT - Géomatique

---

**🚀 Version 2.0.0** - Architecture modulaire  
*Développé avec ❤️ pour une meilleure maintenabilité* 
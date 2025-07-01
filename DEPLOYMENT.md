# A11y Colors

> Accessible UI Color Palette Generator

[![Deploy to GitHub Pages](https://github.com/your-username/a11y-colors/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-username/a11y-colors/actions/workflows/deploy.yml)

## 🚀 Quick Setup for GitHub Pages

### Step 1: Fork/Clone Repository
```bash
git clone https://github.com/your-username/a11y-colors.git
cd a11y-colors
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Update Configuration
Edit `vite.config.js` and change the base path to your repository name:
```javascript
base: '/your-repo-name/',
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: **"GitHub Actions"**
4. Push your changes to the `main` branch

### Step 5: Access Your Live App
Your app will be available at: `https://your-username.github.io/your-repo-name/`

## 🔧 Local Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Files Structure

```
├── src/
│   ├── lib/                     # Svelte components
│   │   ├── ColorCard.svelte    # Individual color display
│   │   ├── ColorGrid.svelte    # Grid layout with categories
│   │   ├── ColorLogicExplanation.svelte  # Educational content
│   │   ├── ColorPaletteGenerator.svelte  # Main generator
│   │   ├── ControlPanel.svelte  # Controls (if any)
│   │   └── TestRunner.svelte    # Automated test UI
│   ├── utils/
│   │   ├── colorUtils.js        # Core color algorithms
│   │   └── colorUtils.test.js   # Comprehensive tests
│   ├── App.svelte               # Main app component
│   └── main.js                  # Entry point
├── .github/workflows/
│   └── deploy.yml               # Auto-deployment to GitHub Pages
├── public/
│   └── .nojekyll               # Prevent Jekyll processing
└── dist/                        # Built files (auto-generated)
```

## 🎨 Features

- **Deterministic Color Generation**: No randomness, same inputs = same outputs
- **WCAG Compliance**: Real-time AA/AAA accessibility validation
- **Educational**: Built-in explanations of color theory and saturation curves
- **Comprehensive Testing**: Automated test suite for all calculations
- **Modern UI**: Responsive design with glassmorphism effects
- **Click to Copy**: Easy hex code copying

## 🔬 Color Algorithm

The app uses a carefully crafted saturation curve:
- **Steps 1-2**: Light colors (15%, 35% saturation)
- **Steps 3-4**: Medium-light (55%, 75% saturation)  
- **Steps 5-6**: Peak saturation (85%, 90% saturation)
- **Steps 7-10**: Gradual reduction (85%, 75%, 65%, 55% saturation)

This follows design system best practices from Material Design and Tailwind CSS.

## 🚀 Deployment

The app automatically builds and deploys to GitHub Pages on every push to `main`. The GitHub Actions workflow:

1. Installs Node.js and dependencies
2. Builds the application with Vite
3. Deploys to GitHub Pages
4. Updates the live URL

## 📄 License

MIT License - feel free to use this for your own projects!

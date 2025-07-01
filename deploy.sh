#!/bin/bash

# Quick deployment script for GitHub Pages
# Run this script to deploy your a11y-colors app to GitHub Pages

echo "🚀 Building A11y Colors for GitHub Pages..."

# Build the application
npm run build

echo "✅ Build complete!"
echo ""
echo "📋 Next steps to deploy on GitHub Pages:"
echo ""
echo "1. Create a new repository on GitHub (or use existing)"
echo "2. Push this code to your repository:"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git push origin main"
echo ""
echo "3. Go to repository Settings → Pages"
echo "4. Source: Select 'GitHub Actions'"
echo "5. The app will auto-deploy on the next push!"
echo ""
echo "6. Your app will be available at:"
echo "   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"
echo ""
echo "⚡ Don't forget to update the 'base' path in vite.config.js"
echo "   to match your repository name!"

# Accessible UI Color Palette Generator

A modern web application built with Svelte and Vite that generates accessible color palettes with WCAG compliance validation. This tool uses Gaussian distribution parameters to create scientifically-based color variations while ensuring accessibility standards.

## Features

- 🎨 **Smart Color Generation**: Uses Gaussian distribution for natural color variations
- ♿ **WCAG Compliance**: Real-time contrast ratio validation (AA/AAA standards)
- 📊 **Accessibility Ratings**: Visual indicators for each color's accessibility level
- 📥 **W3C Token Export**: Download color palettes in W3C Design Token format
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎯 **Click to Copy**: Easy hex code copying with a single click

## Technical Features

- **Gaussian Parameters**: Customizable mean and standard deviation for hue, saturation, and lightness
- **Contrast Calculations**: Precise WCAG contrast ratio calculations against white and black backgrounds
- **Real-time Updates**: Live palette generation as you adjust parameters
- **Modern UI**: Beautiful gradient backgrounds and smooth animations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd a11y-colors
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Usage

1. **Adjust Parameters**: Use the control panel to modify Gaussian distribution parameters:
   - **Hue**: Controls color family (0-360°)
   - **Saturation**: Controls color intensity (0-100%)
   - **Lightness**: Controls color brightness (10-90%)

2. **Generate Palettes**: Click "Generate New Palette" or adjust sliders for real-time updates

3. **Check Accessibility**: Each color shows:
   - Contrast ratios against white and black
   - WCAG accessibility rating (AAA, AA, A, or FAIL)
   - HSL values

4. **Export Colors**: Download your palette as W3C Design Tokens format

## Development

### Project Structure
```
src/
├── lib/
│   ├── ColorPaletteGenerator.svelte  # Main component
│   ├── ControlPanel.svelte           # Parameter controls
│   ├── ColorGrid.svelte              # Color layout
│   └── ColorCard.svelte              # Individual color display
├── utils/
│   └── colorUtils.js                 # Color calculations and utilities
├── App.svelte                        # Root component
└── main.js                           # Application entry point
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Accessibility Compliance

This tool generates colors that meet various WCAG standards:

- **AAA**: Contrast ratio ≥ 7:1 (Enhanced contrast)
- **AA**: Contrast ratio ≥ 4.5:1 (Standard contrast)
- **A**: Contrast ratio ≥ 3:1 (Minimum contrast)
- **FAIL**: Below minimum standards

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Svelte](https://svelte.dev/) and [Vite](https://vitejs.dev/)
- Color science based on WCAG 2.1 guidelines
- Gaussian distribution for natural color generation

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `checkJs` in the JS template?**

It is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```

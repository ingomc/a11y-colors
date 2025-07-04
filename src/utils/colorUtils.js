// Gaussian random number generator using Box-Muller transform
export function gaussianRandom(mean = 0, stdDev = 1) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  
  const z0 = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return z0 * stdDev + mean;
}

// Convert HSL to RGB
export function hslToRgb(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Convert RGB to HEX
export function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

// Calculate relative luminance
export function relativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
export function calculateContrast(color1, color2) {
  const lum1 = relativeLuminance(color1.r, color1.g, color1.b);
  const lum2 = relativeLuminance(color2.r, color2.g, color2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

// Get accessibility rating based on contrast ratio
export function getAccessibilityRating(contrast) {
  if (contrast >= 7) return 'AAA';
  if (contrast >= 4.5) return 'AA';
  if (contrast >= 3) return 'A';
  return 'FAIL';
}

// Generate a single color with accessibility information
function generateColor(hueParams, satParams, lightParams) {
  // Generate HSL values using Gaussian distribution
  let hue = gaussianRandom(hueParams.mean, hueParams.stdDev);
  let saturation = gaussianRandom(satParams.mean, satParams.stdDev);
  let lightness = gaussianRandom(lightParams.mean, lightParams.stdDev);
  
  // Clamp values to valid ranges
  hue = ((hue % 360) + 360) % 360; // Wrap around for hue
  saturation = Math.max(0, Math.min(100, saturation));
  lightness = Math.max(10, Math.min(90, lightness));
  
  // Convert to RGB and HEX
  const rgb = hslToRgb(hue, saturation, lightness);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  
  // Calculate contrast ratios
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };
  
  const contrastWhite = calculateContrast(rgb, white);
  const contrastBlack = calculateContrast(rgb, black);
  
  // Determine best accessibility rating
  const bestContrast = Math.max(contrastWhite, contrastBlack);
  const accessibility = getAccessibilityRating(bestContrast);
  
  return {
    hex,
    rgb,
    hsl: { h: hue, s: saturation, l: lightness },
    contrastWhite,
    contrastBlack,
    accessibility,
    bestContrast
  };
}

// Generate a structured color palette with base hues and customizable saturation
export function generateColorPalette(params = {}) {
  const palette = [];
  
  // Extract optional parameters for saturation adjustment
  const saturationMultiplier = params.saturationMultiplier || 1.0; // 0.5 to 1.5
  const saturationOffset = params.saturationOffset || 0; // -20 to +20
  
  // Extract optional parameters for Gaussian hue variation
  const meanChroma = params.chroma?.mean || 0.6;
  const stdDevChroma = params.chroma?.stdDev || 0.2;
  const hueVariation = params.hueVariation || 0; // -30 to +30 degrees
  
  // Use custom colors if provided, otherwise use default extended set
  const customColors = params.customColors;
  const baseHues = customColors || getDefaultColorSet();
  
  // Define 10 lightness steps from light to dark with proper distribution
  const lightnessSteps = [95, 85, 75, 65, 55, 45, 35, 25, 15, 8];
  
  baseHues.forEach(baseHue => {
    const row = {
      name: baseHue.name,
      color: baseHue.color,
      colors: []
    };
    
    lightnessSteps.forEach((lightness, index) => {
      // Use a predictable saturation curve based on design system best practices
      // Similar to Material Design, Tailwind CSS, and other established systems
      let saturation;
      
      // Saturation curve that peaks in the middle ranges and reduces at extremes
      // This follows the principle that very light and very dark colors should be less saturated
      if (lightness >= 90) {
        // Steps 1: Very light colors (10-20% saturation)
        saturation = 15;
      } else if (lightness >= 80) {
        // Step 2: Light colors (30-40% saturation)
        saturation = 35;
      } else if (lightness >= 70) {
        // Step 3: Light-medium colors (50-60% saturation)
        saturation = 55;
      } else if (lightness >= 60) {
        // Step 4: Medium colors (70-80% saturation)
        saturation = 75;
      } else if (lightness >= 50) {
        // Step 5: Medium colors (80-90% saturation)
        saturation = 85;
      } else if (lightness >= 40) {
        // Step 6: Medium-dark colors (85-95% saturation)
        saturation = 90;
      } else if (lightness >= 30) {
        // Step 7: Dark colors (80-90% saturation)
        saturation = 85;
      } else if (lightness >= 20) {
        // Step 8: Very dark colors (70-80% saturation)
        saturation = 75;
      } else if (lightness >= 10) {
        // Step 9: Extremely dark colors (60-70% saturation)
        saturation = 65;
      } else {
        // Step 10: Nearly black (50-60% saturation)
        saturation = 55;
      }
      
      // Apply user adjustments to the base saturation curve
      // This keeps the deterministic nature while allowing customization
      let adjustedSaturation = saturation * saturationMultiplier + saturationOffset;
      
      // Apply Gaussian-influenced saturation based on chroma parameters
      if (meanChroma !== 0.6 || stdDevChroma !== 0.2) {
        // Use Gaussian distribution to modify saturation
        const chromaInfluence = gaussianRandom(meanChroma, stdDevChroma);
        adjustedSaturation *= Math.max(0.3, Math.min(1.5, chromaInfluence));
      }
      
      // Clamp to valid saturation range (0-100%)
      adjustedSaturation = Math.max(0, Math.min(100, adjustedSaturation));
      
      // Apply hue variation
      let finalHue = baseHue.hue + hueVariation;
      // Wrap hue to 0-360 range
      finalHue = ((finalHue % 360) + 360) % 360;
      
      const finalSaturation = adjustedSaturation;
      
      const rgb = hslToRgb(finalHue, finalSaturation, lightness);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      
      const white = { r: 255, g: 255, b: 255 };
      const black = { r: 0, g: 0, b: 0 };
      
      const contrastWhite = calculateContrast(rgb, white);
      const contrastBlack = calculateContrast(rgb, black);
      const bestContrast = Math.max(contrastWhite, contrastBlack);
      const accessibility = getAccessibilityRating(bestContrast);
      
      row.colors.push({
        hex,
        rgb,
        hsl: { h: finalHue, s: finalSaturation, l: lightness },
        chroma: finalSaturation / 100, // Convert back to 0-1 range for chroma
        contrastWhite,
        contrastBlack,
        accessibility,
        bestContrast,
        step: index + 1,
        expectedContrast: index + 1, // Expected contrast should increase with step
        baseSaturation: saturation, // Store the base saturation for debugging
        originalHue: baseHue.hue, // Store original hue for reference
        adjustedHue: finalHue // Store adjusted hue for debugging
      });
    });
    
    palette.push(row);
  });
  
  return palette;
}

// Get default extended color set for palette generation
export function getDefaultColorSet() {
  return [
    // Primary colors
    { name: 'Blue', hue: 220, color: 'blue', category: 'primary' },
    { name: 'Green', hue: 120, color: 'green', category: 'primary' },
    { name: 'Red', hue: 0, color: 'red', category: 'primary' },
    
    // Secondary colors
    { name: 'Orange', hue: 30, color: 'orange', category: 'secondary' },
    { name: 'Purple', hue: 270, color: 'purple', category: 'secondary' },
    { name: 'Cyan', hue: 180, color: 'cyan', category: 'secondary' },
    
    // Tertiary colors
    { name: 'Pink', hue: 330, color: 'pink', category: 'tertiary' },
    { name: 'Yellow', hue: 60, color: 'yellow', category: 'tertiary' },
    { name: 'Teal', hue: 170, color: 'teal', category: 'tertiary' },
    { name: 'Indigo', hue: 240, color: 'indigo', category: 'tertiary' },
    
    // Neutral tones
    { name: 'Slate', hue: 210, color: 'slate', category: 'neutral' },
    { name: 'Warm Gray', hue: 30, color: 'gray', category: 'neutral' }
  ];
}

// Get predefined color sets for quick selection
export function getPredefinedSets() {
  return {
    minimal: [
      { name: 'Blue', hue: 220, color: 'blue' },
      { name: 'Green', hue: 120, color: 'green' },
      { name: 'Red', hue: 0, color: 'red' },
      { name: 'Gray', hue: 210, color: 'slate' }
    ],
    vibrant: [
      { name: 'Electric Blue', hue: 200, color: 'blue' },
      { name: 'Lime Green', hue: 90, color: 'green' },
      { name: 'Hot Pink', hue: 320, color: 'pink' },
      { name: 'Bright Orange', hue: 25, color: 'orange' },
      { name: 'Purple', hue: 280, color: 'purple' }
    ],
    earthy: [
      { name: 'Forest Green', hue: 130, color: 'green' },
      { name: 'Terracotta', hue: 15, color: 'orange' },
      { name: 'Stone Blue', hue: 200, color: 'blue' },
      { name: 'Moss Green', hue: 80, color: 'green' },
      { name: 'Clay Brown', hue: 25, color: 'orange' }
    ],
    corporate: [
      { name: 'Navy Blue', hue: 220, color: 'blue' },
      { name: 'Professional Green', hue: 160, color: 'green' },
      { name: 'Charcoal', hue: 210, color: 'slate' },
      { name: 'Burgundy', hue: 350, color: 'red' }
    ]
  };
}

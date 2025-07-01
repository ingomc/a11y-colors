// Gaussian random number generator using Box-Muller transform
function gaussianRandom(mean = 0, stdDev = 1) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  
  const z0 = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return z0 * stdDev + mean;
}

// Convert HSL to RGB
function hslToRgb(h, s, l) {
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
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

// Calculate relative luminance
function relativeLuminance(r, g, b) {
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

// Generate a structured color palette with base hues and chroma variations
export function generateColorPalette(params) {
  const { chroma } = params;
  const palette = [];
  
  // Define base hues for different color families
  const baseHues = [
    { name: 'Green', hue: 120, color: 'green' },
    { name: 'Orange', hue: 30, color: 'orange' },
    { name: 'Pink', hue: 330, color: 'pink' },
    { name: 'Blue', hue: 220, color: 'blue' }
  ];
  
  // Define 10 predefined lightness steps from very light to very dark
  const predefinedLightness = [95, 90, 85, 75, 65, 55, 45, 35, 25, 15];
  const contrastTargets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  baseHues.forEach(baseHue => {
    const row = {
      name: baseHue.name,
      color: baseHue.color,
      colors: []
    };
    
    predefinedLightness.forEach((lightness, index) => {
      // Use Gaussian function to calculate chroma based on predefined lightness
      // Mean is set to 0.6 to move center of chroma curve to the right
      const chromaVariation = gaussianRandom(chroma.mean, chroma.stdDev);
      
      // Convert chroma to saturation (chroma is saturation * lightness / 100)
      // Clamp chroma between 0 and 1, then convert to saturation percentage
      const clampedChroma = Math.max(0, Math.min(1, chromaVariation));
      const saturation = lightness > 0 ? (clampedChroma * 100 * 100) / lightness : 50;
      const finalSaturation = Math.max(0, Math.min(100, saturation));
      
      const rgb = hslToRgb(baseHue.hue, finalSaturation, lightness);
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
        hsl: { h: baseHue.hue, s: finalSaturation, l: lightness },
        chroma: clampedChroma,
        contrastWhite,
        contrastBlack,
        accessibility,
        bestContrast,
        step: index + 1,
        expectedContrast: contrastTargets[index]
      });
    });
    
    palette.push(row);
  });
  
  return palette;
}

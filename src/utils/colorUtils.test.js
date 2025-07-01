// Tests for color utility functions
import { 
  calculateContrast, 
  getAccessibilityRating,
  generateColorPalette,
  gaussianRandom,
  hslToRgb,
  rgbToHex,
  relativeLuminance
} from './colorUtils.js';

// Test helper to run tests
function runTests() {
  const results = [];
  
  function test(name, testFn) {
    try {
      testFn();
      results.push({ name, status: 'PASS' });
      console.log(`✅ ${name}`);
    } catch (error) {
      results.push({ name, status: 'FAIL', error: error.message });
      console.log(`❌ ${name}: ${error.message}`);
    }
  }
  
  function assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
      throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
    }
  }
  
  function assertClose(actual, expected, tolerance = 0.01, message = '') {
    if (Math.abs(actual - expected) > tolerance) {
      throw new Error(`Expected ${expected} ± ${tolerance}, got ${actual}. ${message}`);
    }
  }
  
  // Test 1: Gaussian Random Number Generator
  test('Gaussian Random Generator produces numbers', () => {
    const value = gaussianRandom(0, 1);
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Gaussian random should return a valid number');
    }
  });
  
  // Test 2: HSL to RGB Conversion
  test('HSL to RGB: Pure Red', () => {
    const result = hslToRgb(0, 100, 50); // Pure red
    assertEqual(result.r, 255);
    assertEqual(result.g, 0);
    assertEqual(result.b, 0);
  });
  
  test('HSL to RGB: Pure Green', () => {
    const result = hslToRgb(120, 100, 50); // Pure green
    assertEqual(result.r, 0);
    assertEqual(result.g, 255);
    assertEqual(result.b, 0);
  });
  
  test('HSL to RGB: Pure Blue', () => {
    const result = hslToRgb(240, 100, 50); // Pure blue
    assertEqual(result.r, 0);
    assertEqual(result.g, 0);
    assertEqual(result.b, 255);
  });
  
  test('HSL to RGB: White', () => {
    const result = hslToRgb(0, 0, 100); // White
    assertEqual(result.r, 255);
    assertEqual(result.g, 255);
    assertEqual(result.b, 255);
  });
  
  test('HSL to RGB: Black', () => {
    const result = hslToRgb(0, 0, 0); // Black
    assertEqual(result.r, 0);
    assertEqual(result.g, 0);
    assertEqual(result.b, 0);
  });
  
  // Test 3: RGB to HEX Conversion
  test('RGB to HEX: White', () => {
    const result = rgbToHex(255, 255, 255);
    assertEqual(result, '#ffffff');
  });
  
  test('RGB to HEX: Black', () => {
    const result = rgbToHex(0, 0, 0);
    assertEqual(result, '#000000');
  });
  
  test('RGB to HEX: Red', () => {
    const result = rgbToHex(255, 0, 0);
    assertEqual(result, '#ff0000');
  });
  
  // Test 4: Relative Luminance Calculation
  test('Relative Luminance: White', () => {
    const result = relativeLuminance(255, 255, 255);
    assertClose(result, 1.0, 0.001, 'White should have luminance of 1.0');
  });
  
  test('Relative Luminance: Black', () => {
    const result = relativeLuminance(0, 0, 0);
    assertClose(result, 0.0, 0.001, 'Black should have luminance of 0.0');
  });
  
  // Test 5: Contrast Ratio Calculation
  test('Contrast Ratio: White vs Black', () => {
    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 0, g: 0, b: 0 };
    const result = calculateContrast(white, black);
    assertClose(result, 21.0, 0.1, 'White vs Black should have contrast ratio of 21:1');
  });
  
  test('Contrast Ratio: Same Color', () => {
    const color = { r: 128, g: 128, b: 128 };
    const result = calculateContrast(color, color);
    assertClose(result, 1.0, 0.001, 'Same color should have contrast ratio of 1:1');
  });
  
  // Test 6: Accessibility Rating
  test('Accessibility Rating: AAA', () => {
    const result = getAccessibilityRating(7.5);
    assertEqual(result, 'AAA');
  });
  
  test('Accessibility Rating: AA', () => {
    const result = getAccessibilityRating(5.0);
    assertEqual(result, 'AA');
  });
  
  test('Accessibility Rating: A', () => {
    const result = getAccessibilityRating(3.5);
    assertEqual(result, 'A');
  });
  
  test('Accessibility Rating: FAIL', () => {
    const result = getAccessibilityRating(2.5);
    assertEqual(result, 'FAIL');
  });
  
  // Test 7: Color Palette Structure
  test('Color Palette: Correct Structure', () => {
    const palette = generateColorPalette({ chroma: { mean: 0.6, stdDev: 0.2 } });
    
    assertEqual(palette.length, 4, 'Should have 4 color families');
    
    palette.forEach((row, index) => {
      assertEqual(row.colors.length, 10, `Row ${index} should have 10 color steps`);
      assertEqual(typeof row.name, 'string', `Row ${index} should have a name`);
      assertEqual(typeof row.color, 'string', `Row ${index} should have a color property`);
    });
  });
  
  test('Color Palette: Color Properties', () => {
    const palette = generateColorPalette({ chroma: { mean: 0.6, stdDev: 0.2 } });
    
    const firstColor = palette[0].colors[0];
    
    // Check required properties
    if (!firstColor.hex || typeof firstColor.hex !== 'string') {
      throw new Error('Color should have hex property');
    }
    if (!firstColor.rgb || typeof firstColor.rgb !== 'object') {
      throw new Error('Color should have rgb property');
    }
    if (!firstColor.hsl || typeof firstColor.hsl !== 'object') {
      throw new Error('Color should have hsl property');
    }
    if (typeof firstColor.contrastWhite !== 'number') {
      throw new Error('Color should have contrastWhite property');
    }
    if (typeof firstColor.contrastBlack !== 'number') {
      throw new Error('Color should have contrastBlack property');
    }
    if (!firstColor.accessibility || typeof firstColor.accessibility !== 'string') {
      throw new Error('Color should have accessibility property');
    }
  });
  
  // Test 8: Lightness Steps
  test('Color Palette: Lightness Steps', () => {
    const palette = generateColorPalette({ chroma: { mean: 0.6, stdDev: 0.2 } });
    const expectedLightness = [95, 85, 75, 65, 55, 45, 35, 25, 15, 8];
    
    palette[0].colors.forEach((color, index) => {
      assertEqual(color.hsl.l, expectedLightness[index], 
        `Step ${index + 1} should have lightness ${expectedLightness[index]}`);
    });
  });
  
  // Test 9: Base Hues
  test('Color Palette: Base Hues', () => {
    const palette = generateColorPalette({ chroma: { mean: 0.6, stdDev: 0.2 } });
    const expectedHues = [120, 30, 330, 220]; // Green, Orange, Pink, Blue
    const expectedNames = ['Green', 'Orange', 'Pink', 'Blue'];
    
    palette.forEach((row, index) => {
      assertEqual(row.name, expectedNames[index], `Row ${index} should be ${expectedNames[index]}`);
      row.colors.forEach(color => {
        assertEqual(color.hsl.h, expectedHues[index], 
          `${row.name} should have hue ${expectedHues[index]}`);
      });
    });
  });
  
  // Test 10: Saturation Design System Standards
  test('Color Palette: Design System Saturation Standards', () => {
    const palette = generateColorPalette({ chroma: { mean: 0.6, stdDev: 0.2 } });
    
    // Expected exact saturation values for each lightness step (no variation)
    const expectedSaturations = [
      { lightness: 95, expectedSat: 15 },   // Step 1
      { lightness: 85, expectedSat: 35 },   // Step 2
      { lightness: 75, expectedSat: 55 },   // Step 3
      { lightness: 65, expectedSat: 75 },   // Step 4
      { lightness: 55, expectedSat: 85 },   // Step 5
      { lightness: 45, expectedSat: 90 },   // Step 6
      { lightness: 35, expectedSat: 85 },   // Step 7
      { lightness: 25, expectedSat: 75 },   // Step 8
      { lightness: 15, expectedSat: 65 },   // Step 9
      { lightness: 8,  expectedSat: 55 }    // Step 10
    ];
    
    palette.forEach((row, rowIndex) => {
      row.colors.forEach((color, colorIndex) => {
        const expected = expectedSaturations[colorIndex];
        const actualSat = color.hsl.s;
        
        // Since we removed random variation, expect exact values
        assertEqual(actualSat, expected.expectedSat, 
          `Row ${rowIndex} (${row.name}), Step ${colorIndex + 1}: ` +
          `Expected saturation ${expected.expectedSat}%, got ${actualSat}%`
        );
      });
    });
  });
  
  // Test 11: Saturation follows design curve
  test('Color Palette: Saturation Curve Pattern', () => {
    const palette = generateColorPalette({ chroma: { mean: 0.6, stdDev: 0.2 } });
    
    palette.forEach((row, rowIndex) => {
      const saturations = row.colors.map(color => color.hsl.s);
      
      // Check the saturation curve pattern:
      // Should increase from step 1-6, then decrease from step 6-10
      
      // Steps 1-6: increasing saturation (with tolerance for gaussian variation)
      for (let i = 0; i < 5; i++) {
        if (saturations[i+1] < saturations[i] - 15) { // -15% tolerance
          throw new Error(
            `Row ${rowIndex}: Saturation should generally increase from step ${i+1} to ${i+2}, ` +
            `but got ${saturations[i].toFixed(1)}% → ${saturations[i+1].toFixed(1)}%`
          );
        }
      }
      
      // Steps 6-10: decreasing saturation (with tolerance)
      for (let i = 5; i < 9; i++) {
        if (saturations[i+1] > saturations[i] + 15) { // +15% tolerance
          throw new Error(
            `Row ${rowIndex}: Saturation should generally decrease from step ${i+1} to ${i+2}, ` +
            `but got ${saturations[i].toFixed(1)}% → ${saturations[i+1].toFixed(1)}%`
          );
        }
      }
    });
  });
  
  console.log('\n=== Test Results ===');
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total: ${results.length}`);
  
  return results;
}

// Export for use in browser
if (typeof window !== 'undefined') {
  window.runColorTests = runTests;
}

export { runTests };

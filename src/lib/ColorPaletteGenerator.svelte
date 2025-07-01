<script>
  import ColorGrid from './ColorGrid.svelte';
  import ControlPanel from './ControlPanel.svelte';
  import { generateColorPalette, calculateContrast, getAccessibilityRating } from '../utils/colorUtils.js';

  // Gaussian distribution parameters
  let meanChroma = 0.6; // Set to 0.6 to move center of chroma curve to the right
  let stdDevChroma = 0.2; // Standard deviation for chroma variation
  
  // Generated color palette (structured by rows and categories)
  let colors = [];
  
  // Generate initial palette
  generatePalette();
  
  function generatePalette() {
    colors = generateColorPalette({
      chroma: { mean: meanChroma, stdDev: stdDevChroma }
    });
  }
  
  function downloadColorTokens() {
    const tokens = {
      "tokens": {
        "color": {}
      }
    };
    
    colors.forEach((row, rowIndex) => {
      row.colors.forEach((color, colorIndex) => {
        const tokenName = `${row.name.toLowerCase()}-${colorIndex + 1}`;
        tokens.tokens.color[tokenName] = {
          "value": color.hex,
          "type": "color",
          "description": `${row.name} color step ${colorIndex + 1} with ${color.accessibility} accessibility rating`
        };
      });
    });
    
    const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-tokens-w3c.json';
    link.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="generator-container">
  <ControlPanel 
    bind:meanChroma
    bind:stdDevChroma
    on:generate={generatePalette}
    on:download={downloadColorTokens}
  />
  
  <ColorGrid {colors} />
  
  <div class="explanation">
    <h3>How it works</h3>
    <p>
      The generator uses a Gaussian function to calculate chroma based on a predefined lightness for each step. 
      We provide sensible defaults to mean and standard deviation, but also let you customize it to get the optimal result for you.
    </p>
    <p>
      We set mean to 0.6 as the initial value because we want to move the center of chroma in the Gaussian curve a bit to the right so that we get more chroma on the lighter half.
    </p>
  </div>
</div>

<style>
  .generator-container {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }
  
  .explanation {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #3b82f6;
  }
  
  .explanation h3 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .explanation p {
    margin: 0 0 1rem 0;
    color: #64748b;
    line-height: 1.6;
  }
  
  .explanation p:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    .generator-container {
      padding: 1rem;
      border-radius: 12px;
    }
  }
</style>

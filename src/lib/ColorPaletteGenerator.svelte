<script>
  import ColorGrid from './ColorGrid.svelte';
  import ControlPanel from './ControlPanel.svelte';
  import ColorManager from './ColorManager.svelte';
  import { generateColorPalette, getDefaultColorSet } from '../utils/colorUtils.js';

  // Original Gaussian distribution parameters (from ControlPanel)
  let meanChroma = 0.6; // Set to 0.6 to move center of chroma curve to the right
  let stdDevChroma = 0.2; // Standard deviation for chroma variation
  
  // Additional saturation adjustment parameters
  let saturationMultiplier = 1.0; // 0.5 to 1.5 - controls overall saturation intensity
  let saturationOffset = 0; // -20 to +20 - shifts the entire curve up/down
  let hueVariation = 0; // -30 to +30 - shifts all hues
  
  // Color selection
  let selectedColors = getDefaultColorSet();
  
  // Generated color palette (structured by rows and categories)
  let colors = [];
  
  // Generate initial palette
  generatePalette();
  
  function generatePalette() {
    colors = generateColorPalette({
      chroma: { mean: meanChroma, stdDev: stdDevChroma },
      saturationMultiplier,
      saturationOffset,
      hueVariation,
      customColors: selectedColors
    });
  }
  
  // Auto-regenerate when sliders change
  $: if (meanChroma !== undefined && stdDevChroma !== undefined && 
        saturationMultiplier !== undefined && saturationOffset !== undefined &&
        hueVariation !== undefined && selectedColors) {
    generatePalette();
  }
  
  function handleColorChange(event) {
    selectedColors = event.detail.colors;
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
  <div class="header-controls">
    <div class="title-section">
      <h2>Barrierefreie Farbpalette</h2>
      <p>Kombiniert deterministisches Design-System mit anpassbaren Parametern</p>
    </div>
    
    <div class="action-buttons">
      <button 
        on:click={generatePalette}
        class="generate-btn"
        aria-label="Generate new color palette"
      >
        🎨 Neue Palette generieren
      </button>
      
      <button 
        on:click={downloadColorTokens}
        class="download-btn"
        aria-label="Download color tokens in W3C format"
      >
        📥 W3C Tokens herunterladen
      </button>
    </div>
  </div>

  <!-- Color Selection Manager -->
  <ColorManager {selectedColors} on:change={handleColorChange} />

  <!-- Original Gaussian Controls -->
  <ControlPanel 
    bind:meanChroma
    bind:stdDevChroma
    on:change={generatePalette}
  />

  <!-- Extended Saturation Controls -->
  <div class="extended-controls">
    <h3>� Erweiterte Anpassungen</h3>
    <div class="controls-grid">
      <div class="control-group">
        <label>
          <span class="control-label">
            Sättigungsintensität: <strong>{saturationMultiplier.toFixed(1)}x</strong>
          </span>
          <input 
            type="range" 
            bind:value={saturationMultiplier} 
            min="0.3" 
            max="1.8" 
            step="0.1"
            class="slider"
            aria-label="Saturation intensity multiplier"
          />
          <div class="range-labels">
            <span>Weniger gesättigt</span>
            <span>Mehr gesättigt</span>
          </div>
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <span class="control-label">
            Sättigungs-Verschiebung: <strong>{saturationOffset > 0 ? '+' : ''}{saturationOffset}%</strong>
          </span>
          <input 
            type="range" 
            bind:value={saturationOffset} 
            min="-25" 
            max="25" 
            step="5"
            class="slider"
            aria-label="Saturation offset adjustment"
          />
          <div class="range-labels">
            <span>Weniger bunt</span>
            <span>Bunter</span>
          </div>
        </label>
      </div>
      
      <div class="control-group">
        <label>
          <span class="control-label">
            Farbton-Verschiebung: <strong>{hueVariation > 0 ? '+' : ''}{hueVariation}°</strong>
          </span>
          <input 
            type="range" 
            bind:value={hueVariation} 
            min="-60" 
            max="60" 
            step="5"
            class="slider"
            aria-label="Hue variation adjustment"
          />
          <div class="range-labels">
            <span>Kältere Töne</span>
            <span>Wärmere Töne</span>
          </div>
        </label>
      </div>
    </div>
  </div>
  
  <ColorGrid {colors} />
  
  <div class="algorithm-info">
    <h3>🔬 Deterministischer Algorithmus</h3>
    <p>
      Diese Farbpalette verwendet eine feste Sättigungskurve basierend auf Design-System-Standards. 
      Wählen Sie aus vorgefertigten Farbsets oder fügen Sie eigene Farben hinzu - 
      reproduzierbare und konsistente Ergebnisse für professionelle Design-Systeme.
    </p>
    <div class="feature-highlights">
      <div class="feature">
        <strong>🎨 {selectedColors.length} Farben:</strong> Erweiterte Palette mit Presets
      </div>
      <div class="feature">
        <strong>📏 Sättigungskurve:</strong> 
        {#each [15, 35, 55, 75, 85, 90, 85, 75, 65, 55] as sat, i}
          <span class="sat-value" style="background: hsl(200, {sat}%, 60%)">{sat}%</span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .generator-container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 2rem;
  }
  
  .header-controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    gap: 2rem;
  }
  
  .title-section h2 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1.75rem;
    font-weight: 700;
  }
  
  .title-section p {
    margin: 0;
    color: #64748b;
    font-size: 1rem;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    flex-shrink: 0;
  }
  
  .generate-btn, .download-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
  }
  
  .generate-btn {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
  }
  
  .generate-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  }
  
  .download-btn {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }
  
  .download-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  }
  
  .extended-controls {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .extended-controls h3 {
    margin: 0 0 0.75rem 0;
    color: #2d3748;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .control-group {
    display: flex;
    flex-direction: column;
  }
  
  .control-group label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .control-label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }
  
  .slider {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: #e5e7eb;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }
  
  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  }
  
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .range-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: -0.125rem;
  }
  
  .algorithm-info {
    margin-top: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
    border-radius: 12px;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }
  
  .algorithm-info h3 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .algorithm-info p {
    margin: 0 0 1rem 0;
    color: #4a5568;
    line-height: 1.6;
  }
  
  .feature-highlights {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .sat-value {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    .generator-container {
      padding: 1rem;
      border-radius: 12px;
    }
    
    .header-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .action-buttons {
      justify-content: stretch;
    }
    
    .generate-btn, .download-btn {
      flex: 1;
    }
    
    .controls-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

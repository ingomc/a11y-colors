<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let meanChroma;
  export let stdDevChroma;
  
  function handleGenerate() {
    dispatch('generate');
  }
  
  function handleDownload() {
    dispatch('download');
  }
</script>

<div class="control-panel">
  <div class="controls-grid">
    <div class="control-group">
      <h4>Gaussian Parameters</h4>
      <div class="input-row">
        <label>
          Mean (center): {meanChroma.toFixed(1)}
          <input 
            type="range" 
            bind:value={meanChroma} 
            min="0" 
            max="1" 
            step="0.1"
            on:input={handleGenerate}
            aria-label="Chroma mean value"
          />
        </label>
        <label>
          Standard deviation: {stdDevChroma.toFixed(1)}
          <input 
            type="range" 
            bind:value={stdDevChroma} 
            min="0.05" 
            max="0.5" 
            step="0.05"
            on:input={handleGenerate}
            aria-label="Chroma standard deviation"
          />
        </label>
      </div>
    </div>
    
    <div class="control-group">
      <h4>Display Options</h4>
      <div class="checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" checked disabled />
          Show contrast information
        </label>
        <div class="radio-group">
          <span class="radio-label">Contrast calculation method:</span>
          <label class="radio-option">
            <input type="radio" name="contrast-method" value="wcag21" checked disabled />
            WCAG 2.1
          </label>
          <label class="radio-option">
            <input type="radio" name="contrast-method" value="apca" disabled />
            APCA
          </label>
        </div>
      </div>
    </div>
  </div>
  
  <div class="action-buttons">
    <button 
      on:click={handleGenerate}
      class="generate-btn"
      aria-label="Generate new color palette"
    >
      🎨 Generate New Palette
    </button>
    
    <button 
      on:click={handleDownload}
      class="download-btn"
      aria-label="Download color tokens in W3C format"
    >
      📥 Download Color Tokens (W3C Format)
    </button>
  </div>
</div>

<style>
  .control-panel {
    margin-bottom: 2rem;
  }
  
  .controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .control-group {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
  }
  
  .control-group h4 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .input-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  label {
    display: block;
    color: #475569;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  input[type="range"] {
    width: 100%;
    margin-top: 0.5rem;
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 3px;
    background: #e2e8f0;
    outline: none;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }
  
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .radio-label {
    font-size: 0.875rem;
    color: #475569;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
  }
  
  input[type="checkbox"],
  input[type="radio"] {
    width: auto;
    margin: 0;
  }
  
  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
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
  
  @media (max-width: 768px) {
    .controls-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .action-buttons {
      flex-direction: column;
    }
    
    button {
      width: 100%;
    }
  }
</style>

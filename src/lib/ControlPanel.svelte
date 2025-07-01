<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let meanChroma;
  export let stdDevChroma;
  
  function handleChange() {
    dispatch('change');
  }
</script>

<div class="control-panel">
  <div class="control-group">
    <h4>Gaussian Parameters</h4>
    <div class="input-grid">
      <label>
        Mean: {meanChroma.toFixed(1)}
        <input 
          type="range" 
          bind:value={meanChroma} 
          min="0" 
          max="1" 
          step="0.1"
          on:input={handleChange}
          aria-label="Chroma mean value"
        />
      </label>
      <label>
        Std Dev: {stdDevChroma.toFixed(1)}
        <input 
          type="range" 
          bind:value={stdDevChroma} 
          min="0.05" 
          max="0.5" 
          step="0.05"
          on:input={handleChange}
          aria-label="Chroma standard deviation"
        />
      </label>
    </div>
  </div>
</div>

<style>
  .control-panel {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .control-group {
    background: #f8fafc;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }
  
  .control-group h4 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  .input-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  
  label {
    display: block;
    color: #475569;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.125rem;
  }
  
  input[type="range"] {
    width: 100%;
    margin-top: 0.125rem;
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    border-radius: 2px;
    background: #e2e8f0;
    outline: none;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    .input-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
    
    .control-panel {
      padding: 0.75rem;
    }
    
    .control-group {
      padding: 0.75rem;
    }
  }
</style>

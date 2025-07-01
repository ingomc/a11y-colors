<script>
  import { createEventDispatcher } from 'svelte';
  import { getDefaultColorSet, getPredefinedSets } from '../utils/colorUtils.js';
  
  const dispatch = createEventDispatcher();
  
  export let selectedColors = getDefaultColorSet();
  
  let showColorPicker = false;
  let newColorName = '';
  let newColorHue = 180;
  let selectedPreset = 'default';
  
  const presets = {
    default: getDefaultColorSet(),
    ...getPredefinedSets()
  };
  
  function applyPreset() {
    if (presets[selectedPreset]) {
      selectedColors = [...presets[selectedPreset]];
      dispatch('change', { colors: selectedColors });
    }
  }
  
  function addCustomColor() {
    if (newColorName.trim()) {
      const newColor = {
        name: newColorName.trim(),
        hue: newColorHue,
        color: getColorName(newColorHue),
        category: 'custom'
      };
      selectedColors = [...selectedColors, newColor];
      dispatch('change', { colors: selectedColors });
      
      // Reset form
      newColorName = '';
      newColorHue = 180;
      showColorPicker = false;
    }
  }
  
  function removeColor(index) {
    selectedColors = selectedColors.filter((_, i) => i !== index);
    dispatch('change', { colors: selectedColors });
  }
  
  function getColorName(hue) {
    if (hue < 15 || hue >= 345) return 'red';
    if (hue < 45) return 'orange';
    if (hue < 75) return 'yellow';
    if (hue < 165) return 'green';
    if (hue < 195) return 'cyan';
    if (hue < 255) return 'blue';
    if (hue < 285) return 'purple';
    if (hue < 315) return 'pink';
    return 'red';
  }
  
  function getPreviewColor(hue) {
    return `hsl(${hue}, 70%, 50%)`;
  }
</script>

<div class="color-manager">
  <div class="manager-header">
    <h3>🎨 Farbauswahl</h3>
    <div class="preset-controls">
      <select bind:value={selectedPreset} on:change={applyPreset}>
        <option value="default">Standard (12 Farben)</option>
        <option value="minimal">Minimal (4 Farben)</option>
        <option value="vibrant">Lebendig (5 Farben)</option>
        <option value="earthy">Natürlich (5 Farben)</option>
        <option value="corporate">Corporate (4 Farben)</option>
      </select>
      <button 
        on:click={() => showColorPicker = !showColorPicker}
        class="add-color-btn"
        aria-label="Add custom color"
      >
        ➕ Eigene Farbe
      </button>
    </div>
  </div>

  {#if showColorPicker}
    <div class="color-picker">
      <div class="picker-inputs">
        <input 
          type="text" 
          bind:value={newColorName} 
          placeholder="Farbname (z.B. 'Mint')"
          class="color-name-input"
        />
        <div class="hue-picker">
          <input 
            type="range" 
            bind:value={newColorHue} 
            min="0" 
            max="360" 
            step="5"
            class="hue-slider"
            style="background: linear-gradient(to right, 
              hsl(0, 70%, 50%), hsl(60, 70%, 50%), hsl(120, 70%, 50%), 
              hsl(180, 70%, 50%), hsl(240, 70%, 50%), hsl(300, 70%, 50%), hsl(360, 70%, 50%))"
          />
          <div class="hue-preview" style="background: {getPreviewColor(newColorHue)}">
            {newColorHue}°
          </div>
        </div>
      </div>
      <div class="picker-actions">
        <button on:click={addCustomColor} class="add-btn">Hinzufügen</button>
        <button on:click={() => showColorPicker = false} class="cancel-btn">Abbrechen</button>
      </div>
    </div>
  {/if}

  <div class="selected-colors">
    <h4>Ausgewählte Farben ({selectedColors.length})</h4>
    <div class="colors-grid">
      {#each selectedColors as color, index}
        <div class="color-item">
          <div 
            class="color-preview" 
            style="background: {getPreviewColor(color.hue)}"
            title="{color.name} ({color.hue}°)"
          ></div>
          <span class="color-name">{color.name}</span>
          {#if color.category === 'custom'}
            <button 
              on:click={() => removeColor(index)}
              class="remove-btn"
              aria-label="Remove {color.name}"
            >
              ✕
            </button>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .color-manager {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .manager-header h3 {
    margin: 0;
    color: #1e293b;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .preset-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  select {
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    font-size: 0.8rem;
    background: white;
  }
  
  .add-color-btn {
    padding: 0.25rem 0.75rem;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .add-color-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
  }
  
  .color-picker {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #e2e8f0;
  }
  
  .picker-inputs {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }
  
  .color-name-input {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.9rem;
  }
  
  .hue-picker {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .hue-slider {
    flex: 1;
    height: 8px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
  }
  
  .hue-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 2px solid #374151;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .hue-preview {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .picker-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .add-btn, .cancel-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .add-btn {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
  }
  
  .cancel-btn {
    background: #e5e7eb;
    color: #374151;
  }
  
  .add-btn:hover, .cancel-btn:hover {
    transform: translateY(-1px);
  }
  
  .selected-colors h4 {
    margin: 0 0 0.75rem 0;
    color: #374151;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  .colors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.5rem;
  }
  
  .color-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: white;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    position: relative;
  }
  
  .color-preview {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }
  
  .color-name {
    font-size: 0.8rem;
    font-weight: 500;
    color: #374151;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .remove-btn {
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }
  
  .remove-btn:hover {
    background: #dc2626;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    .manager-header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .preset-controls {
      justify-content: space-between;
    }
    
    .picker-inputs {
      gap: 0.5rem;
    }
    
    .hue-picker {
      flex-direction: column;
      align-items: stretch;
    }
    
    .colors-grid {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
  }
</style>

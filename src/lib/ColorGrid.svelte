<script>
  import ColorCard from './ColorCard.svelte';
  
  export let colors = [];
</script>

<div class="color-palette">
  <!-- Header with category labels -->
  <div class="palette-header">
    <div class="hue-label"></div>
    <div class="step-number">1</div>
    <div class="step-number">2</div>
    <div class="step-number">3</div>
    <div class="step-number">4</div>
    <div class="step-number">5</div>
    <div class="step-number">6</div>
    <div class="step-number">7</div>
    <div class="step-number">8</div>
    <div class="step-number">9</div>
    <div class="step-number">10</div>
  </div>
  
  <!-- Category labels row -->
  <div class="category-labels">
    <div class="hue-label"></div>
    <div class="category-label surface-label">surface (3-5)</div>
    <div class="category-label border-label">border (6-8)</div>
    <div class="category-label text-label">text (9-10)</div>
  </div>
  
  <!-- Color rows -->
  {#each colors as row}
    <div class="color-row">
      <div class="row-label">
        <span class="hue-name">{row.name}</span>
      </div>
      {#each row.colors as color, index}
        <ColorCard {color} step={index + 1} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .color-palette {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .palette-header {
    display: grid;
    grid-template-columns: 100px repeat(10, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    align-items: center;
  }
  
  .step-number {
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
    padding: 0.25rem;
  }
  
  .category-labels {
    display: grid;
    grid-template-columns: 100px 1fr 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
    align-items: center;
  }
  
  .hue-label {
    /* Empty space above row labels */
    background: transparent;
  }
  
  .category-label {
    text-align: center;
    padding: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .surface-label {
    /* Covers columns 1-3 */
  }
  
  .border-label {
    /* Covers columns 4-6 */
  }
  
  .text-label {
    /* Covers columns 7-10 */
  }
  
  .color-row {
    display: grid;
    grid-template-columns: 100px repeat(10, 1fr);
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    align-items: start;
  }
  
  .row-label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 120px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }
  
  .hue-name {
    font-weight: 700;
    color: #1e293b;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .color-palette {
      padding: 0.75rem;
    }
    
    .palette-header,
    .color-row {
      grid-template-columns: 80px 1fr;
      gap: 0.75rem;
    }
    
    .palette-header {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .category-header {
      display: none; /* Hide on mobile, show as row headers instead */
    }
    
    .color-row {
      display: block;
      margin-bottom: 2rem;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 1rem;
    }
    
    .row-label {
      margin-bottom: 1rem;
      min-height: 60px;
    }
    
    .category-group {
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: #f8fafc;
      border-radius: 8px;
    }
    
    .category-group::before {
      content: attr(class);
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    .surface-group::before {
      content: "Surface (3-5)";
    }
    
    .border-group::before {
      content: "Border (6-8)";
    }
    
    .text-group::before {
      content: "Text (9-10)";
    }
    
    .category-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 0.5rem;
    }
    
    .hue-name {
      font-size: 0.75rem;
    }
  }
</style>

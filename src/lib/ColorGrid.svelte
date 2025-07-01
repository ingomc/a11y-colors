<script>
  import ColorCard from './ColorCard.svelte';
  
  export let colors = [];
</script>

<div class="color-palette">
  <!-- Header with step numbers -->
  <div class="palette-header">
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
  
  <!-- Category labels row aligned with columns -->
  <div class="category-labels">
    <div class="category-label surface-label">surface (3-5)</div>
    <div class="category-label border-label">border (6-8)</div>
    <div class="category-label text-label">text (9-10)</div>
  </div>
  
  <!-- Color rows -->
  {#each colors as row, rowIndex}
    {#if rowIndex > 0}
      <div class="row-title">{row.name}</div>
    {:else}
      <div class="row-title first-row">{row.name}</div>
    {/if}
    <div class="color-row">
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
    grid-template-columns: repeat(10, 1fr);
    gap: 0.75rem;
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
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
    align-items: center;
    padding: 0 0.375rem; /* Align with grid padding */
  }
  
  .category-label {
    text-align: center;
    padding: 0.375rem 0.75rem;
    font-size: 0.6875rem;
    font-weight: 600;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    white-space: nowrap;
  }
  
  .surface-label {
    flex: 3; /* 3 columns wide (3-5) */
    margin-left: calc(20% + 0.375rem); /* Skip first 2 columns */
  }
  
  .border-label {
    flex: 3; /* 3 columns wide (6-8) */
  }
  
  .text-label {
    flex: 2; /* 2 columns wide (9-10) */
  }
  
  .row-title {
    font-weight: 700;
    color: #1e293b;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 1.5rem 0 0.75rem 0;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .row-title.first-row {
    margin-top: 0;
  }
  
  .color-row {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    align-items: start;
  }
  
  @media (max-width: 768px) {
    .color-palette {
      padding: 0.5rem;
    }
    
    .palette-header {
      grid-template-columns: repeat(10, 1fr);
      gap: 0.375rem;
    }
    
    .category-labels {
      gap: 0.375rem;
      margin-bottom: 0.75rem;
      padding: 0 0.1875rem;
    }
    
    .category-label {
      font-size: 0.625rem;
      padding: 0.25rem 0.5rem;
    }
    
    .surface-label {
      margin-left: calc(20% + 0.1875rem);
    }
    
    .color-row {
      grid-template-columns: repeat(10, 1fr);
      gap: 0.375rem;
      margin-bottom: 1.25rem;
    }
    
    .row-title {
      font-size: 0.875rem;
      margin: 1rem 0 0.5rem 0;
    }
    
    .step-number {
      font-size: 0.625rem;
    }
  }
  
  @media (max-width: 480px) {
    .palette-header {
      grid-template-columns: repeat(5, 1fr);
    }
    
    .category-labels {
      display: none; /* Hide category labels on very small screens */
    }
    
    .color-row {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>

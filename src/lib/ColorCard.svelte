<script>
  export let color;
  export let step;
  
  // Calculate contrast against white and black
  const whiteContrast = color.contrastWhite || 1;
  const blackContrast = color.contrastBlack || 1;
  
  // Determine text color based on better contrast
  const textColor = whiteContrast > blackContrast ? '#ffffff' : '#000000';
  
  // Get accessibility badge info
  function getAccessibilityBadge(rating) {
    switch (rating) {
      case 'AAA':
        return { text: 'AAA', class: 'aaa', color: '#10b981' };
      case 'AA':
        return { text: 'AA', class: 'aa', color: '#3b82f6' };
      case 'A':
        return { text: 'A', class: 'a', color: '#f59e0b' };
      default:
        return { text: 'FAIL', class: 'fail', color: '#ef4444' };
    }
  }
  
  const badge = getAccessibilityBadge(color.accessibility);
  
  function copyToClipboard() {
    navigator.clipboard.writeText(color.hex);
  }
</script>

<div 
  class="color-card"
  style="background-color: {color.hex}; color: {textColor};"
  role="button"
  tabindex="0"
  on:click={copyToClipboard}
  on:keydown={(e) => e.key === 'Enter' && copyToClipboard()}
  aria-label="Color {color.hex}, click to copy"
>
  <div class="color-info">
    <div class="step-number">#{step}</div>
    <div class="accessibility-badge" style="background-color: {badge.color};">
      {badge.text}
    </div>
  </div>
  
  <div class="color-values">
    <div class="hex-value">{color.hex}</div>
  </div>
  
  <div class="contrast-info">
    <div class="contrast-row">
      <span class="contrast-label">#1:</span>
      <span class="contrast-value">{whiteContrast.toFixed(1)}</span>
    </div>
    <div class="contrast-row">
      <span class="contrast-label">#2:</span>
      <span class="contrast-value">{blackContrast.toFixed(1)}</span>
    </div>
    <div class="contrast-row">
      <span class="contrast-label">#3:</span>
      <span class="contrast-value">{Math.max(whiteContrast, blackContrast).toFixed(1)}</span>
    </div>
    <div class="contrast-row">
      <span class="contrast-label">#4:</span>
      <span class="contrast-value">{Math.round(color.hsl.l)}%</span>
    </div>
    <div class="contrast-row">
      <span class="contrast-label">#5:</span>
      <span class="contrast-value">{color.expectedContrast} ({Math.max(whiteContrast, blackContrast).toFixed(1)})</span>
    </div>
  </div>
</div>

<style>
  .color-card {
    width: 100%;
    min-height: 120px;
    padding: 0.5rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  
  .color-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .color-card:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  .color-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }
  
  .step-number {
    font-size: 0.75rem;
    font-weight: 700;
    opacity: 0.9;
  }
  
  .accessibility-badge {
    font-size: 0.625rem;
    font-weight: 700;
    padding: 0.2rem 0.4rem;
    border-radius: 8px;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  .color-values {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 0.5rem 0;
  }
  
  .hex-value {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    font-family: 'Monaco', 'Menlo', monospace;
  }
  
  .contrast-info {
    margin-top: 0.5rem;
  }
  
  .contrast-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.625rem;
    opacity: 0.9;
    margin-bottom: 0.125rem;
    font-family: 'Monaco', 'Menlo', monospace;
  }
  
  .contrast-label {
    font-weight: 600;
  }
  
  .contrast-value {
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    .color-card {
      min-height: 100px;
      padding: 0.5rem;
    }
    
    .hex-value {
      font-size: 0.75rem;
    }
    
    .contrast-row {
      font-size: 0.5rem;
    }
  }
</style>

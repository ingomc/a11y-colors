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
    min-height: 140px;
    padding: 0.75rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  
  .color-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  .color-card:focus {
    outline: 3px solid #3b82f6;
    outline-offset: 2px;
  }
  
  .color-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }
  
  .step-number {
    font-size: 0.875rem;
    font-weight: 800;
    opacity: 0.95;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .accessibility-badge {
    font-size: 0.6875rem;
    font-weight: 800;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    font-family: 'SF Mono', 'Monaco', 'Menlo', monospace;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.5px;
  }
  
  .contrast-info {
    margin-top: 0.75rem;
    background: rgba(0, 0, 0, 0.05);
    padding: 0.5rem;
    border-radius: 6px;
    backdrop-filter: blur(4px);
  }
  
  .contrast-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.6875rem;
    opacity: 0.95;
    margin-bottom: 0.1875rem;
    font-family: 'SF Mono', 'Monaco', 'Menlo', monospace;
  }
  
  .contrast-row:last-child {
    margin-bottom: 0;
  }
  
  .contrast-label {
    font-weight: 600;
  }
  
  .contrast-value {
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    .color-card {
      min-height: 120px;
      padding: 0.625rem;
    }
    
    .hex-value {
      font-size: 0.875rem;
    }
    
    .contrast-row {
      font-size: 0.625rem;
    }
    
    .step-number {
      font-size: 0.75rem;
    }
    
    .accessibility-badge {
      font-size: 0.625rem;
      padding: 0.1875rem 0.375rem;
    }
  }
</style>

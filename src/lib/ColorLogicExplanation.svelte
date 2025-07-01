<script>
  let isExpanded = false;
  
  function toggleExpansion() {
    isExpanded = !isExpanded;
  }
</script>

<section class="color-logic-explanation">
  <button 
    class="explanation-header" 
    on:click={toggleExpansion}
    aria-expanded={isExpanded}
    aria-controls="explanation-content"
  >
    <h2>
      <span class="icon" class:rotated={isExpanded}>▶</span>
      Farblogik & Design-System
    </h2>
    <span class="subtitle">Wie unsere barrierefreie Farbpalette funktioniert</span>
  </button>
  
  {#if isExpanded}
    <div id="explanation-content" class="explanation-content">
      <div class="explanation-grid">
        <div class="section">
          <h3>🎨 Sättigungskurve</h3>
          <p>Unsere Farbpalette verwendet eine durchdachte Sättigungskurve für optimale Wahrnehmung:</p>
          <div class="saturation-curve">
            <div class="curve-values">
              {#each [15, 35, 55, 75, 85, 90, 85, 75, 65, 55] as saturation, index}
                <div class="curve-point" style="--saturation: {saturation}%">
                  <span class="step">Stufe {index + 1}</span>
                  <span class="value">{saturation}%</span>
                </div>
              {/each}
            </div>
          </div>
          <p class="note">
            Die Kurve steigt zu mittleren Tönen an (max. 90% bei Stufe 6) und fällt zu den Extremen ab. 
            Dies sorgt für lebendige Mittel- und sanfte Rand-Töne.
          </p>
        </div>

        <div class="section">
          <h3>📊 Lightness-Verteilung</h3>
          <p>10 gleichmäßig verteilte Helligkeitsstufen von 5% bis 95%:</p>
          <div class="lightness-scale">
            {#each Array(10) as _, index}
              {@const lightness = 5 + (index * 10)}
              <div class="lightness-step {lightness > 50 ? 'light' : 'dark'}" style="--lightness: {lightness}%">
                {lightness}%
              </div>
            {/each}
          </div>
        </div>

        <div class="section">
          <h3>🎯 Kategorien & Verwendung</h3>
          <div class="categories">
            <div class="category">
              <strong>Surface (Stufen 3-5)</strong>
              <p>Hintergründe und Container-Elemente</p>
            </div>
            <div class="category">
              <strong>Border (Stufen 6-8)</strong>
              <p>Rahmen, Trennlinien und Akzente</p>
            </div>
            <div class="category">
              <strong>Text (Stufen 9-10)</strong>
              <p>Texte mit hohem Kontrast</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>♿ WCAG-Konformität</h3>
          <p>Automatische Berechnung der Kontrastverhältnisse:</p>
          <ul>
            <li><strong>AA:</strong> Mindestens 4.5:1 für normalen Text</li>
            <li><strong>AAA:</strong> Mindestens 7:1 für höchste Barrierefreiheit</li>
            <li><strong>Large Text:</strong> Reduzierte Anforderungen (3:1 AA, 4.5:1 AAA)</li>
          </ul>
        </div>
      </div>
      
      <div class="algorithm-info">
        <h3>🔬 Deterministischer Algorithmus</h3>
        <p>
          Alle Farbberechnungen sind vollständig deterministisch und reproduzierbar. 
          Keine Zufallswerte – gleiche Eingaben ergeben immer identische Paletten.
          Dies gewährleistet Konsistenz in Design-Systemen und vereinfacht das Testen.
        </p>
      </div>
    </div>
  {/if}
</section>

<style>
  .color-logic-explanation {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
    margin-top: 2rem;
  }

  .explanation-header {
    width: 100%;
    background: none;
    border: none;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .explanation-header:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .explanation-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .icon {
    transition: transform 0.2s ease;
    font-size: 0.8em;
    color: #667eea;
  }

  .icon.rotated {
    transform: rotate(90deg);
  }

  .explanation-header .subtitle {
    font-size: 0.9rem;
    color: #718096;
    margin: 0;
  }

  .explanation-content {
    padding: 0 1.5rem 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .explanation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .section h3 {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
  }

  .section p {
    margin: 0 0 0.75rem;
    color: #4a5568;
    line-height: 1.5;
  }

  .saturation-curve {
    margin: 1rem 0;
  }

  .curve-values {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
  }

  .curve-point {
    background: linear-gradient(135deg, hsl(240, var(--saturation), 70%), hsl(240, var(--saturation), 50%));
    border-radius: 8px;
    padding: 0.5rem;
    text-align: center;
    color: white;
    font-size: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .curve-point .step {
    display: block;
    font-weight: 500;
    opacity: 0.9;
  }

  .curve-point .value {
    display: block;
    font-weight: 700;
    font-size: 0.8rem;
  }

  .lightness-scale {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 2px;
    margin: 1rem 0;
    border-radius: 6px;
    overflow: hidden;
  }

  .lightness-step {
    background: hsl(0, 0%, var(--lightness));
    padding: 0.5rem 0.25rem;
    text-align: center;
    font-size: 0.7rem;
    font-weight: 600;
  }
  
  .lightness-step:global(.dark) {
    color: white;
  }
  
  .lightness-step:global(.light) {
    color: black;
  }

  .categories {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .category {
    padding: 0.75rem;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  .category strong {
    color: #2d3748;
    display: block;
    margin-bottom: 0.25rem;
  }

  .category p {
    margin: 0;
    font-size: 0.9rem;
    color: #4a5568;
  }

  .section ul {
    margin: 0.5rem 0;
    padding-left: 1.25rem;
    color: #4a5568;
  }

  .section ul li {
    margin-bottom: 0.25rem;
    line-height: 1.4;
  }

  .note {
    font-size: 0.9rem;
    color: #718096;
    font-style: italic;
    margin-top: 0.5rem !important;
  }

  .algorithm-info {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid rgba(102, 126, 234, 0.2);
  }

  .algorithm-info h3 {
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
  }

  .algorithm-info p {
    margin: 0;
    color: #4a5568;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .explanation-grid {
      grid-template-columns: 1fr;
    }
    
    .curve-values {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .lightness-scale {
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>

<script>
  import ColorPaletteGenerator from './lib/ColorPaletteGenerator.svelte'
  import ColorLogicExplanation from './lib/ColorLogicExplanation.svelte'
  import TestRunner from './lib/TestRunner.svelte'
</script>

<main>
  <h1>Accessible UI Color Palette</h1>
  <p class="subtitle">Generate accessible color palettes with WCAG compliance</p>
  
  <ColorPaletteGenerator />
  
  <ColorLogicExplanation />
  
  <TestRunner />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
  }

  h1 {
    color: white;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.9);
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    main {
      padding: 1rem;
    }
    
    h1 {
      font-size: 2rem;
    }
  }
</style>

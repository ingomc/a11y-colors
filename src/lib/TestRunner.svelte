<script>
  import { runTests } from '../utils/colorUtils.test.js';
  import { onMount } from 'svelte';

  let testResults = [];
  let isRunning = false;
  let isExpanded = false;

  onMount(() => {
    runColorTests();
  });

  function runColorTests() {
    isRunning = true;
    try {
      testResults = runTests();
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      isRunning = false;
    }
  }

  function toggleExpansion() {
    isExpanded = !isExpanded;
  }

  $: passedTests = testResults.filter(r => r.status === 'PASS').length;
  $: failedTests = testResults.filter(r => r.status === 'FAIL').length;
</script>

<div class="test-runner">
  <button 
    class="test-header" 
    on:click={toggleExpansion}
    aria-expanded={isExpanded}
    aria-controls="test-content"
  >
    <h2>
      <span class="icon" class:rotated={isExpanded}>▶</span>
      Automatisierte Tests
      {#if testResults.length > 0}
        <span class="test-badge {failedTests > 0 ? 'failed' : 'passed'}">
          {passedTests}/{testResults.length}
        </span>
      {/if}
    </h2>
    <span class="subtitle">Validierung aller Farbberechnungsfunktionen</span>
  </button>
  
  {#if isExpanded}
    <div id="test-content" class="test-content">
      <div class="test-controls">
        <button on:click={runColorTests} disabled={isRunning}>
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>
        
        {#if testResults.length > 0}
          <div class="test-summary">
            <span class="passed">✅ Passed: {passedTests}</span>
            <span class="failed">❌ Failed: {failedTests}</span>
            <span class="total">📊 Total: {testResults.length}</span>
          </div>
        {/if}
      </div>

      {#if testResults.length > 0}
        <div class="test-results">
          {#each testResults as result}
            <div class="test-result" class:pass={result.status === 'PASS'} class:fail={result.status === 'FAIL'}>
              <span class="status-icon">
                {result.status === 'PASS' ? '✅' : '❌'}
              </span>
              <span class="test-name">{result.name}</span>
              {#if result.error}
                <span class="error-message">{result.error}</span>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .test-runner {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
    margin-top: 1rem;
  }

  .test-header {
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

  .test-header:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .test-header h2 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .icon {
    transition: transform 0.2s ease;
    font-size: 0.8em;
    color: #3b82f6;
  }

  .icon.rotated {
    transform: rotate(90deg);
  }

  .test-badge {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-weight: 700;
    margin-left: auto;
  }

  .test-badge.passed {
    background: rgba(34, 197, 94, 0.1);
    color: #059669;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .test-badge.failed {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .test-header .subtitle {
    font-size: 0.9rem;
    color: #718096;
    margin: 0;
  }

  .test-content {
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

  .test-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.875rem;
    max-width: 200px;
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .test-summary {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .test-summary span {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.875rem;
  }

  .passed {
    background: #dcfce7;
    color: #166534;
  }

  .failed {
    background: #fef2f2;
    color: #dc2626;
  }

  .total {
    background: #f1f5f9;
    color: #475569;
  }

  .test-results {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .test-result {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 6px;
    font-size: 0.875rem;
  }

  .test-result.pass {
    background: #f0fdf4;
    border-left: 4px solid #22c55e;
  }

  .test-result.fail {
    background: #fef2f2;
    border-left: 4px solid #ef4444;
  }

  .status-icon {
    font-size: 1rem;
  }

  .test-name {
    font-weight: 600;
    flex-grow: 1;
  }

  .error-message {
    color: #dc2626;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.75rem;
    background: rgba(239, 68, 68, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .test-content {
      padding: 0 1rem 1rem;
    }

    .test-summary {
      flex-direction: column;
      align-items: stretch;
    }

    .test-summary span {
      text-align: center;
    }
  }
</style>

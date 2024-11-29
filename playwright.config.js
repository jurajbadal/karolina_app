module.exports = {
    testDir: './',
    timeout: 30000,
    retries: 0,
    
    // Screenshot configuration
    use: {
      // Capture screenshot on test failure
      screenshot: 'only-on-failure',
      
      // Optional: Define screenshot storage location
      screenshotPath: './test-results/screenshots',
      
      // Optional: Additional screenshot options
      trace: 'on-first-retry'
    },
  
    reporter: [
      ['html', { open: 'never' }],
      ['list']
    ],
  };
  
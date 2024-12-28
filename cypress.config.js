const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1024,
  watchForFileChanges: false,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

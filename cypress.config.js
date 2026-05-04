const { defineConfig } = require('cypress')
allowCypressEnv = false
module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,

    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: false,
      json: true,
      charts: true
    },

    setupNodeEvents(on, config) {}
  },
})
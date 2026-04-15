
module.exports = {
  allowCypressEnv: false,

  e2e: {
    //to don't executes the tests by its own
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};

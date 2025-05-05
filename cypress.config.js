// @ts-nocheck
const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  // Keep defaultCommandTimeout as small as
  // possible and implement longer timeouts
  // to test commands directly:
  // cy.get('.locator', { timeout: 10000 })
  // or by changing test (it) timeout:
  // Cypress.config('defaultCommandTimeout', 10000);
  defaultCommandTimeout: 5000,
  video: true,
  screenshotOnRunFailure: false,
  //includeShadowDom: true,
  chromeWebSecurity: false,
  retries: 0,
  viewportWidth: 1920,
  viewportHeight: 1280,
  // projectId can be used to enable Cypress Cloud
  // https://www.cypress.io/cloud
  projectId: "i4mcqn",
  reporter: "cypress-mochawesome-reporter",

  e2e: {
    setupNodeEvents(on, config) {
      // Enhanced terminal logging library. It will print
      // HTTP response codes, but also internal API calls,
      // their JSON responses before the page is rendered
      // https://www.npmjs.com/package/cypress-terminal-report
      require('cypress-terminal-report/src/installLogsPrinter')(on);
      // add more human readable logging formats
      // JSON/JUnit is good for programmatical processing of
      // test logs
      // HTML is good to be stored as artifacts in
      // CI/CD
      // https://www.npmjs.com/package/cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      
      return {
        // Pattern to match tests
        // Use test.spec.test.js for local test files,
        // before commiting new test files
        specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
        // I prefer to use custom parameter for baseUrl to be more
        // easier to be used from .env or github actions pipelines
        // But lets initialize this anyway to match custom env variable
        // BASE_URL
        baseUrl: process.env.BASE_URL,
        env: {
          // This can be set in .env file locally or
          // from Github Actions by setting CYPRESS_BASE_URL
          base_url: process.env.BASE_URL,
          // Just a placeholder for different environments
          // could be used for example to select
          // english or german version of Amazon
          env: process.env.ENV,
          // Placeholder for languages
          lang: process.env.LANG,
          // Record key
          RECORD_KEY: process.env.RECORD_KEY
        },
      };
    },
  }
});
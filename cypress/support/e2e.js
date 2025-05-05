// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands.js'
// add more human readable logging formats
// JSON/JUnit is good for programmatical processing of
// test logs
// HTML is good to be stored as artifacts in
// CI/CD
import 'cypress-mochawesome-reporter/register';
// This is good to be here to support xpath in some
// rare cases
require('cypress-xpath')
// Enhanced terminal logging library. It will print
// HTTP response codes, but also internal API calls,
// their JSON responses before the page is rendered
afterEach(() => {
  cy.wait(50, {log: false}).then(() => cy.addTestContext(Cypress.TerminalReport.getLogs('txt')))
})
require('cypress-terminal-report/src/installLogsCollector')();

// This is needed to ignore uncaught exceptions to
// cause tests to fail
// Comment this out, if you want tests to also fail
// in coding errors, that does not directly effect
// to page rendering
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
    return false
})
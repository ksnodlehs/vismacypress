# amsivcypress

# Home Assignment for Senior Test Automation Engineer Position

We invite you to complete a pre-exercise focused on test automation. The task involves implementing a home assignment and publishing the source code in a public GIT repository. Please ensure that the test assessment is uploaded to the GIT repository by Tuesday, May 6th.

*Assignment Details:*

Develop automated web browser tests using any programming language and any test automation framework you are familiar with for amazon.com with the following requirements:

Search for "Nikon" and sort the results from highest to lowest price.
Select the eighth product and click on it for more details.
In the product details, verify (using assert) that the product title includes the text "Nikon D3X."

*Bonus Points:*

* Utilize Playwright test framework.
* Implement the webpage opening step such that the URL is a configurable parameter.

# To install framework and run test

* Clone the repository
* In project root execute:
  * *npm install*
  * *cp .env.example .env*
    * Add RECORD_KEY or export it as CYPRES_RECORD_KEY before \ running *npm run cy:e2e:record*
  * *npm run cy:e2e*
* To record run to cypress cloud:
  * export CYPRESS_RECORD_KEY="\<record key\>"
  * npm run cy:e2e:record
* See html report in:
  * cypress/reports/html/
* See cloud report in:
  * https://cloud.cypress.io/projects/i4mcqn/runs/1/overview?roarHideRunsWithDiffGroupsAndTags=1
* Code is explained in the code and configuration files

## Files and folders
* package.json
  * npm packages
  * npm execution scripts
* cypress.config.js
  * cypress configuration
  * fetched environment variables
* jsconfig.js
  * JS configuration for cypress JS project
* .gitignore
  * what files/folders are ignored in git add and push
* .env.example
  * example .env file that can be set for local execution
  * on local execution, copy .env.example to .env
  * this file is generated in CI/CD github actions task \
    based on project variables and secrets
* cypress/e2e/visma/*.spec.js
  * Testcases
* fixtures/
  * Testdata folder, like data.json etc
* support/command.js
  * Add global cypress functions here
* support/e2e.js
  * import/require/configure additional plugins here
* support/libs/
  * Collection of libraries to be used in tests
* reports/
  * html reports of local execution
* videos/
  * store videos, if in *cypress.config.js* video: true
* .github/workflows/main.yaml
  * placeholder for github actions pipeline to run tests

## Observations
* 8th result of *Nikon* search does not contain D3X
* TODO: add CI/CD pipeline .github/workflows/main.yml \
  Placeholder: 
  ```
    name: Cypress Tests
    on: [push]
    jobs:
      cypress-run:
        runs-on: ubuntu-latest
        # Runs tests in parallel with matrix strategy https://docs.cypress.io/guides/guides/parallelization
        # https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs
        # Also see warning here https://github.com/cypress-io/github-action#parallel
        strategy:
          fail-fast: false # https://github.com/cypress-io/github-action/issues/48
          matrix:
            containers: [1, 2] # Uses 2 parallel instances
        steps:
          - name: Checkout
            uses: actions/checkout@v4
          - name: Cypress run
            # Uses the official Cypress GitHub action https://github.com/cypress-io/github-action
            uses: cypress-io/github-action@v6
            with:
              # Starts web server for E2E tests - replace with your own server invocation
              # https://docs.cypress.io/guides/continuous-integration/introduction#Boot-your-server
              start: npm run cy:e2e:record
              wait-on: 'http://localhost:3000' # Waits for above
              # Records to Cypress Cloud 
              # https://docs.cypress.io/guides/cloud/projects#Set-up-a-project-to-record
              record: true
              parallel: true # Runs test in parallel using settings above
            env:
              # For recording and parallelization to work you must set your CYPRESS_RECORD_KEY
              # in GitHub repo → Settings → Secrets → Actions
              CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
              # Creating a token https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
              # GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ```
* amazon.com produces internal code error
  ```["SyntaxError: Unexpected token 'h', \"healthy\" is not valid JSON"],"t":3871},
                    {
                      "m": "ARA:RegisterTriggerResponseError:SEARCH. Error receiving response from ARAServiceUnexpected token 'h', \"healthy\" is not valid JSON",
                      "name": "SyntaxError",
                      "csm": "v ...
  ```
    * This is ignored be setting below in *support/e2e.js*:
        ```
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
        return false
        })
        ```

// Disable ts-check for now as visual code 
// wants to enforce typescript checks, causing file to
// be labelled as invalid
// @ts-nocheck
/// <reference types="Cypress" />
import { commonLibrary, commonlibrary } from '../../support/libs/common_library';

describe('Browse to amazon.com and make and validate search', 
  {
    retries: {
      runMode: 0,
      openMode: 0,
    },
  }, () => {
    
    beforeEach('Before each fixture...', () => {
        cy.log("We are in before each, here we can have setup of each test")
        // Lets call example common library function here:
        commonLibrary.example_function("Example parameter from beforeEach")
        cy.log("Opening: " + Cypress.env('base_url'))
        // Lets open web page
        cy.visit(Cypress.env('base_url'))

        // Lets get rid of annoying location selector
        // banner by pressing dismiss
        cy.get('input[data-action-type="DISMISS"]').click()

    });
    afterEach('After each fixture...', () => {
      cy.log("We are in after each, here we can have clean up after each test")
    });

    it('Positive: Browse to amazon.com, search Nikon, sort by highest price, select 8th, validate FTZ II', () => {

      // TODO: We could move below to commonLibrary if
      // wanted. Leaving these here for demo purposes
      //
      // Find id=twotabsearchtextbox and type Nikon
      cy.get('input[id="twotabsearchtextbox"]').type('Nikon')
      // Find id=nav-search-submit-button and click search 
      cy.get('input[id="nav-search-submit-button"]').click()

      // Expand the dropdown list, lets not wait for Amazon animations
      // to be loaded
      // This is not however used later as we directly call
      // sort anchors, but could be used to check the css of
      // sort menu items
      cy.get('span[id="a-autoid-0-announce"]').click({waitForAnimations: false})

      // Lets sort search results by keyword:
      // Exact matches:
      // * Featured
      // * Price: Low to High
      // * Price: High to Low
      // * Avg. Customer Review
      // * Newest Arrivals
      // * Best Sellers
      //
      // Function directly calls for sort anchors based on their
      // human readable name.
      // Here we could implement also language specific calls,
      // by creating fixtures/languages_<language>.json
      // then checking the cypress env Cypress.env('lang')
      commonLibrary.sort_search_items_by_keyword("Price: High to Low")
      // Lets get an array of all test results and then we within/wrap
      // 8th hit (as arrays are 0-based, 8th element is 7, but this is
      // taken care of in commonLibrary )
      // within/wrap will create a cypress object from 8th element
      //
      commonLibrary.select_nth_result_and_open_product_details(8)
      // From product details page, check the title locator:
      // id="productTitle"
      // Assert if string is not found
      cy.get('#productTitle').should('contain', 'FTZ II')
    })

    it('Negative: Browse to amazon.com, search Nikon, sort by highest price, select 8th, validate D3X', () => {
      // Find id=twotabsearchtextbox and type Nikon
      cy.get('input[id="twotabsearchtextbox"]').type('Nikon')
      // Find id=nav-search-submit-button and click search 
      cy.get('input[id="nav-search-submit-button"]').click()

      cy.get('span[id="a-autoid-0-announce"]').click({waitForAnimations: false})
      commonLibrary.sort_search_items_by_keyword("Price: High to Low")
      commonLibrary.select_nth_result_and_open_product_details(8)
      cy.get('#productTitle').should('contain', 'D3X')
    })    

  })
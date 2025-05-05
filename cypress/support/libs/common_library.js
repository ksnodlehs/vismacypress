
// Here we could import some generic POM locators
// import commonPOM from "../../../fixtures/pom/menu/common_POM.json"

// Add here some generic reusable functions
export class CommonLibrary {
    example_function(example_parameter="") {
        // Add some useful function here
        cy.log('CommonLibrary --> example_function --> example_parameter: ' + example_parameter);
    }
    /**
     * Sort Amazon search by keyword
     * keyword can be exact or partial match.
     * In partial match, we click always
     * the first match. So if you use
     * "Price" as keyword, "Price: Low to High"
     * is clicked
     * 
     * Exact matches:
     * * Featured
     * * Price: Low to High
     * * Price: High to Low
     * * Avg. Customer Review
     * * Newest Arrivals
     * * Best Sellers
     * @param {string} sort_string
     * @return {void} Nothing
     */
    sort_search_items_by_keyword(sort_string="Price: High to Low'") {
        cy.log('CommonLibrary --> sort_search_items_by_name --> sort_string ' + sort_string);
        // TODO: Add check that partial match only returns one
        // one clickable element.
        //
        // Sort by sort string
        // if string is not found, cy.get automatically asserts
        cy.get('.a-dropdown-link').contains(sort_string).click()
    }
    /**
     * Lets get an array of all test results and then we within/wrap
     * Nth hit (arrays are 0-based).
     * 
     * within/wrap will create a cypress object from Nth element.
     * Lets open the selected result for product details
     * @param {integer} nth_result
     * @return {object} nth_result product details page
     */
    select_nth_result_and_open_product_details(nth_result) {
        const array_result = nth_result - 1
        cy.log('CommonLibrary --> select_nth_result --> nth_result ' + nth_result);
        cy.log('nth array index: ' + array_result)
        cy.log('nth search result: ' + nth_result)
        // Lets get an array of all test results and then we within/wrap
        // 8th hit (as arrays are 0-based, 8th element is 7 )
        // within/wrap will create a cypress object from 8th element.
        // Lets open the selected result for product details
        cy.get('div[role="listitem"]').eq(array_result).within(($listitem) => {
            cy.wrap($listitem)
              .get('.a-link-normal.s-line-clamp-2.s-link-style.a-text-normal')
              .click();
        });
    }
}
  
export const commonLibrary = new CommonLibrary();
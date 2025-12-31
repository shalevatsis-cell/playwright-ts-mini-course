import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

/**
 * INVENTORY PAGE CLASS - Demonstrates INHERITANCE and METHOD DESIGN
 * 
 * This class handles product catalog operations and demonstrates:
 * 1. INHERITANCE: Extends BasePage for common functionality
 * 2. ENCAPSULATION: Private locators hide DOM complexity
 * 3. METHOD OVERLOADING: Multiple ways to accomplish same task
 * 4. BUSINESS LOGIC: Methods named after business operations
 */
export default class InventoryPage extends BasePage {
  
  // PRIVATE FIELDS - Encapsulation of page elements
  private itemDescriptionElement: Locator; // Product container elements
  private shoppingCartElement: Locator;    // Cart badge element

  /**
   * CONSTRUCTOR - Inheritance and initialization
   * Calls parent constructor and sets up page-specific locators
   */
  constructor(protected page: Page) {
    super(page); // INHERITANCE: Initialize parent class
    
    // ENCAPSULATION: Initialize private locators for this page
    this.itemDescriptionElement = this.page.locator('[class="inventory_item_description"]');
    this.shoppingCartElement = this.page.locator('.shopping_cart_badge');
  }

  /**
   * PRODUCT SELECTION - Business logic method
   * 
   * @param expectedProductTitle - Name of product to add to cart
   * 
   * This method demonstrates:
   * - ENCAPSULATION: Complex DOM traversal hidden behind simple method name
   * - BUSINESS LOGIC: Method name reflects user action, not technical implementation
   * - CHAINING: Uses Playwright's filter() and locator() chaining
   */
  public async chooseProductByTitle(expectedProductTitle: string)  {
    // Find product container with matching title, then click its button
    // This is a more concise approach using Playwright's filtering
    await this.itemDescriptionElement
      .filter({ hasText: expectedProductTitle })
      .locator('button')
      .click();
  }

  /**
   * ALTERNATIVE IMPLEMENTATION - Commented out for educational purposes
   * 
   * This shows a different approach using iteration:
   * - Demonstrates LOOPS and CONDITIONAL LOGIC
   * - More verbose but potentially more readable
   * - Shows how same business requirement can be implemented differently
   * 
   * POLYMORPHISM concept: Same method name, different implementation
   */
/*
   protected async chooseProductByTitle(expectedProductTitle: string)  {
    // Get all product elements and iterate through them
    for (let product of await this.itemDescriptionElement.all()) {
      const currentProductTitle = await product.locator('.inventory_item_name').innerText();
      if (currentProductTitle === expectedProductTitle) {
        await product.locator('button').click();
        break; // Exit loop once product is found and clicked
      }
    }
  }
*/

  /**
   * CART VALIDATION - Verifies items added to cart
   * 
   * @param expectedNumberOfItems - Expected count as string
   * 
   * Demonstrates:
   * - INHERITANCE: Uses validateElementText() from BasePage
   * - BUSINESS VALIDATION: Confirms user action was successful
   * - ENCAPSULATION: Uses private shoppingCartElement
   */
  public async validateProductIsAddedToCart(expectedNumberOfItems: string) {
    // INHERITANCE: Using parent class method
    await this.validateElementText(this.shoppingCartElement, expectedNumberOfItems);
  }

  /**
   * NAVIGATION - Proceeds to cart page
   * 
   * Demonstrates:
   * - INHERITANCE: Uses clickElement() from BasePage
   * - BUSINESS WORKFLOW: Method name reflects user journey
   * - ENCAPSULATION: Uses private locator
   */
  public async goToCart() {
    // INHERITANCE: Using protected method from BasePage
    await this.clickElement(this.shoppingCartElement);
  }
}

/**
 * DESIGN PATTERNS DEMONSTRATED:
 * 
 * 1. PAGE OBJECT MODEL:
 *    - Encapsulates page-specific logic
 *    - Provides clean interface for tests
 * 
 * 2. INHERITANCE:
 *    - Reuses common functionality from BasePage
 *    - Extends base capabilities with page-specific methods
 * 
 * 3. ENCAPSULATION:
 *    - Private locators hide DOM complexity
 *    - Public methods expose business operations
 * 
 * 4. SINGLE RESPONSIBILITY:
 *    - Class only handles inventory page operations
 *    - Each method has one clear purpose
 * 
 * 5. BUSINESS-DRIVEN DESIGN:
 *    - Method names reflect user actions (chooseProduct, goToCart)
 *    - Abstracts technical details behind business terminology
 */
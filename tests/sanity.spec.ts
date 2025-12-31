// IMPORTS: Demonstrating Modular Design and Separation of Concerns
// Each import represents a different layer of abstraction in our test architecture
import LoginPage from '../pages/LoginPage';           // Page Object Model (POM) - Login functionality
import InventoryPage from '../pages/InventoryPage';   // POM - Product catalog functionality  
import CartPage from '../pages/CartPage';             // POM - Shopping cart functionality
import ApplicationURL from '../helpers/applicationURL'; // Helper utility - URL constants
import { test, expect } from '@playwright/test';      // Playwright testing framework

/**
 * SANITY TEST - End-to-End User Journey
 * 
 * This test demonstrates several key programming concepts:
 * 
 * 1. OBJECT-ORIENTED PROGRAMMING (OOP):
 *    - Each page class (LoginPage, InventoryPage, CartPage) is an object that encapsulates
 *      the behavior and properties of that specific page
 *    - Objects hide internal complexity and expose simple methods for interaction
 * 
 * 2. ENCAPSULATION:
 *    - Page objects encapsulate DOM selectors, actions, and validations
 *    - Internal implementation details are hidden from the test
 *    - Changes to page structure only require updates in the page class, not the test
 * 
 * 3. ABSTRACTION:
 *    - High-level test reads like business requirements
 *    - Complex Playwright operations are abstracted into meaningful method names
 *    - Test focuses on WHAT to do, not HOW to do it
 * 
 * 4. SEPARATION OF CONCERNS:
 *    - Test logic is separate from page interaction logic
 *    - URL management is handled by a dedicated helper
 *    - Each class has a single responsibility
 */
test('sanity test', async ({ page }) => {
  // INSTANTIATION: Creating objects from classes (OOP Concept)
  // Each object gets the Playwright 'page' instance to interact with the browser
  const loginPage = new LoginPage(page);       // Object for login operations
  const inventoryPage = new InventoryPage(page); // Object for product catalog operations
  const cartPage = new CartPage(page);         // Object for cart operations

  // STEP 1: Authentication
  // Encapsulated login logic - we don't need to know username/password details
  await loginPage.loginToApplication();

  // STEP 2: Inventory Page Validation
  // Using helper constant for URL - demonstrates good practice of avoiding magic strings
  await inventoryPage.validatePageURL(ApplicationURL.inventoryURL);
  await inventoryPage.validateTitle('Products');
  
  // STEP 3: Product Selection
  // Demonstrating method reuse - same method called multiple times with different parameters
  // This shows how encapsulation allows for flexible, reusable code
  await inventoryPage.chooseProductByTitle('Sauce Labs Backpack');
  await inventoryPage.chooseProductByTitle('Sauce Labs Bike Light');
  await inventoryPage.chooseProductByTitle('Sauce Labs Bolt T-Shirt');
  await inventoryPage.chooseProductByTitle('Sauce Labs Fleece Jacket');

  // STEP 4: Cart Validation
  // Validating business logic - 4 products should be in cart
  await inventoryPage.validateProductIsAddedToCart('4');
  await inventoryPage.goToCart();

  // STEP 5: Cart Page Operations
  // Again using encapsulated methods for validation and navigation
  await cartPage.validatePageURL(ApplicationURL.cartURL);
  await cartPage.validateTitle('Your Cart');
  await cartPage.validateCartItemCount(4);
  await cartPage.proceedToCheckout();

  // STEP 6: Checkout Process
  // NOTE: This section breaks the Page Object Model pattern
  // These direct page interactions should ideally be encapsulated in a CheckoutPage class
  // This demonstrates the difference between well-structured and less-structured code
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('123456');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(5).click();
  await page.goto('https://saucelabs.com/');

  // IMPROVEMENT OPPORTUNITY:
  // The checkout section above should be refactored into a CheckoutPage class
  // Example of what it could look like:
  // const checkoutPage = new CheckoutPage(page);
  // await checkoutPage.fillPersonalInfo('John', 'Doe', '123456');
  // await checkoutPage.completeOrder();
  // await checkoutPage.returnToProducts();
});

/**
 * KEY OOP CONCEPTS DEMONSTRATED:
 * 
 * 1. CLASSES & OBJECTS:
 *    - LoginPage, InventoryPage, CartPage are classes
 *    - loginPage, inventoryPage, cartPage are objects (instances of classes)
 * 
 * 2. ENCAPSULATION:
 *    - Internal page logic is hidden inside page classes
 *    - Public methods provide clean interface for test interactions
 * 
 * 3. ABSTRACTION:
 *    - Complex DOM operations are abstracted into simple method calls
 *    - Test reads like business requirements, not technical implementation
 * 
 * 4. MODULARITY:
 *    - Code is organized into logical modules (pages, helpers, tests)
 *    - Each module has a specific responsibility
 * 
 * 5. REUSABILITY:
 *    - Page objects can be reused across multiple tests
 *    - Methods like chooseProductByTitle() can be called multiple times
 * 
 * INHERITANCE NOTE:
 * While not explicitly shown in this test, the page classes likely inherit from a base
 * page class that provides common functionality like URL validation and title checking.
 * This would demonstrate inheritance - another key OOP concept.
 */
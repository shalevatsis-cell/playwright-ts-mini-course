import { Locator, Page, expect, test } from '@playwright/test';
import BasePage from './BasePage';

/**
 * CART PAGE CLASS - Demonstrates INHERITANCE and VALIDATION PATTERNS
 * 
 * This class handles shopping cart operations and demonstrates:
 * 1. INHERITANCE: Extends BasePage for common functionality
 * 2. ENCAPSULATION: Private locators hide DOM complexity
 * 3. VALIDATION LOGIC: Business rule validation methods
 * 4. TEST INTEGRATION: Methods designed for test assertions
 */
export default class CartPage extends BasePage {
    
    // PRIVATE FIELDS - Encapsulation of page elements
    private cartItems: Locator;      // All cart item elements
    private checkoutButton: Locator; // Checkout button element

    /**
     * CONSTRUCTOR - Inheritance and initialization
     * 
     * Demonstrates:
     * - INHERITANCE: Calls super() to initialize parent class
     * - ENCAPSULATION: Initializes private locators
     * - DEPENDENCY INJECTION: Receives Page object from test
     */
    constructor(protected page: Page) {
        super(page); // INHERITANCE: Initialize BasePage
        
        // ENCAPSULATION: Initialize private locators for cart-specific elements
        this.cartItems = this.page.locator('.cart_item');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
    }

    /**
     * CART ITEM COUNT VALIDATION - Business logic validation
     * 
     * @param expectedCount - Expected number of items in cart
     * 
     * This method demonstrates:
     * - BUSINESS VALIDATION: Verifies cart contains expected number of items
     * - TEST INTEGRATION: Uses test.step() for better reporting
     * - ENCAPSULATION: Uses private cartItems locator
     * - ASSERTION LOGIC: Direct expect() call for count validation
     * 
     * Note: This method uses direct expect() instead of inheriting validation
     * because it needs to count elements, not validate text content
     */
    public async validateCartItemCount(expectedCount: number) {
        await test.step(`Validating cart item count is ${expectedCount}`, async () => {
            // Get actual count of cart items
            const count = await this.cartItems.count();
            
            // Assert that actual count matches expected count
            expect(count).toBe(expectedCount);
        });
    }

    /**
     * CHECKOUT NAVIGATION - Proceeds to checkout process
     * 
     * Demonstrates:
     * - INHERITANCE: Uses clickElement() method from BasePage
     * - ENCAPSULATION: Uses private checkoutButton locator
     * - BUSINESS WORKFLOW: Method name reflects user action
     * - SINGLE RESPONSIBILITY: Method has one clear purpose
     */
    public async proceedToCheckout() {
        // INHERITANCE: Using protected method from BasePage
        await this.clickElement(this.checkoutButton);
    }
}

/**
 * KEY OOP CONCEPTS DEMONSTRATED:
 * 
 * 1. INHERITANCE:
 *    - Extends BasePage to inherit common functionality
 *    - Reuses clickElement() method from parent class
 *    - Gets access to protected 'page' property
 * 
 * 2. ENCAPSULATION:
 *    - Private locators hide DOM implementation details
 *    - Public methods provide clean interface for tests
 *    - Internal complexity hidden behind simple method names
 * 
 * 3. SINGLE RESPONSIBILITY:
 *    - Class only handles cart-related operations
 *    - Each method has one specific purpose
 *    - Clear separation from other page concerns
 * 
 * 4. COMPOSITION:
 *    - Uses Playwright's Locator objects as building blocks
 *    - Combines simple operations into complex workflows
 * 
 * 5. TESTABILITY:
 *    - Methods designed specifically for test validation
 *    - Clear assertions with meaningful error messages
 *    - Integration with Playwright's test reporting
 */

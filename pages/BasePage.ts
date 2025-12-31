import { Page, expect, test, Locator } from "@playwright/test";

/**
 * BASE PAGE CLASS - Demonstrates INHERITANCE and ABSTRACTION
 * 
 * This abstract class serves as the foundation for all page objects.
 * Key OOP concepts demonstrated:
 * 
 * 1. INHERITANCE: All page classes inherit from this base
 * 2. ABSTRACTION: Abstract class defines common interface
 * 3. ENCAPSULATION: Protected/private members control access
 * 4. POLYMORPHISM: Child classes can override methods
 */
export default abstract class BasePage {

    /**
     * CONSTRUCTOR - Object Initialization with Dependency Injection
     * @param page - Playwright Page instance (protected = accessible to child classes)
     */
    constructor(protected page: Page) {
        // Constructor handles dependency injection of Page object
    }
    
    /**
     * NAVIGATION - Encapsulates page navigation logic
     * @param url - Target URL
     */
    public async navigateTo(url: string) {
        await this.page.goto(url);
    }

    /**
     * URL VALIDATION - Verifies current page URL with test reporting
     * @param expectedURL - Expected URL to validate
     */
    public async validatePageURL(expectedURL: string) {  
        await test.step(`Validating that a correct value of URL is ${expectedURL}`, async () => {
            await expect(this.page).toHaveURL(expectedURL);
        });
    }

    /**
     * ELEMENT TEXT VALIDATION - Protected utility method
     * @param element - Locator for element to validate
     * @param expectedText - Expected text content
     * 
     * PROTECTED: Only this class and children can access this method
     */
    protected async validateElementText(element: Locator, expectedText: string) {
        await test.step(`Validating that element has text: ${expectedText}`, async () => {
            await expect(element).toContainText(expectedText);
        });
    }

    /**
     * PAGE TITLE VALIDATION - Validates HTML title tag
     * @param expectedTitle - Expected browser title
     */
    public async validatePageTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    /**
     * PAGE HEADING VALIDATION - Validates page heading element
     * @param title - Expected heading text
     * 
     * METHOD COMPOSITION: Uses validateElementText() internally
     */
    public async validateTitle(title: string) {
        await this.validateElementText(this.page.locator('.title'), title);
    }

    /**
     * ELEMENT CLICK - Protected click action with logging
     * @param element - Element to click
     * 
     * ENCAPSULATION: Wraps Playwright click with test reporting
     */
    protected async clickElement(element: Locator) {
        await test.step(`Clicking on '${element}' element`, async () => {
            await element.click();
        });
    }
}

/**
 * BENEFITS OF BASE CLASS DESIGN:
 * - CODE REUSE: Common functionality written once
 * - CONSISTENCY: All pages have same basic capabilities
 * - MAINTAINABILITY: Changes made in one place
 * - ABSTRACTION: Hides Playwright complexity from tests
 */

import { Locator, Page, test } from "@playwright/test";
import ApplicationURL from "../helpers/applicationURL";
import { ErrorMessages } from "../helpers/errorMessages";
import BasePage from "./BasePage";

/**
 * LOGIN PAGE CLASS - Demonstrates INHERITANCE and ENCAPSULATION
 * 
 * Key OOP concepts:
 * 1. INHERITANCE: Extends BasePage, inherits common functionality
 * 2. ENCAPSULATION: Private fields hide DOM selectors
 * 3. SINGLE RESPONSIBILITY: Only handles login operations
 */
export default class LoginPage extends BasePage {

    // PRIVATE FIELDS - Encapsulation in action
    private userNameField: Locator;  // Username input
    private passwordField: Locator;  // Password input
    private loginButton: Locator;    // Login button
    private errorMessage: Locator;   // Error display

    /**
     * CONSTRUCTOR - Demonstrates INHERITANCE
     * Calls super(page) and initializes private locators
     */
    constructor(protected page: Page) {
        super(page); // INHERITANCE: Call parent constructor
        
        // ENCAPSULATION: Initialize private locators
        this.userNameField = this.page.locator('[data-test="username"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
        this.errorMessage = this.page.locator('[data-test="error"]');
    }

    /**
     * LOGIN METHOD - Main login functionality
     * 
     * @param username - Defaults to environment variable
     * @param password - Defaults to environment variable  
     * @param url - Defaults to base URL
     * 
     * Demonstrates:
     * - DEFAULT PARAMETERS: Flexible method signature
     * - INHERITANCE: Uses parent methods (validatePageURL, clickElement)
     * - ENCAPSULATION: Complex logic wrapped in simple method
     */
    public async loginToApplication(
        username = process.env.standardUser as string, 
        password: string = process.env.correctPassword as string, 
        url: string = ApplicationURL.baseURL
    ) {
        await this.page.goto(url);
        await this.validatePageURL(url); // INHERITANCE: Parent method
        await this.userNameField.fill(username);
        await this.passwordField.fill(password);
        await this.clickElement(this.loginButton); // INHERITANCE: Parent method
    }

    /**
     * ERROR VALIDATION - Validates login error messages
     * 
     * @param errorMessage - Expected error from ErrorMessages enum
     * 
     * Demonstrates:
     * - TYPE SAFETY: Uses enum instead of strings
     * - INHERITANCE: Uses validateElementText from parent
     */
    public async validateErrorMessage(errorMessage: ErrorMessages) {
        await test.step(`Validating that error message is: ${errorMessage.valueOf()}`, async () => {
            await this.validateElementText(this.errorMessage, errorMessage.valueOf());
        });
    }
}

/**
 * OOP BENEFITS:
 * - CODE REUSE: Inherits common functionality
 * - ENCAPSULATION: Private locators hide implementation
 * - MAINTAINABILITY: Changes isolated to this class
 * - TESTABILITY: Clear, focused methods
 */

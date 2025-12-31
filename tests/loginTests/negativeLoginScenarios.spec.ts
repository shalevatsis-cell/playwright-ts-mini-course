import {test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import { ErrorMessages } from "../../helpers/errorMessages";
import ApplicationURL from "../../helpers/applicationURL";

/**
 * NEGATIVE LOGIN SCENARIOS - Demonstrates TEST ORGANIZATION and ERROR HANDLING
 * 
 * This test suite demonstrates several important testing concepts:
 * 
 * 1. TEST ORGANIZATION:
 *    - test.describe() groups related tests together
 *    - Logical grouping improves test maintainability
 *    - Clear test structure and hierarchy
 * 
 * 2. TEST SETUP:
 *    - beforeEach() runs before each test
 *    - Ensures clean state for each test
 *    - Demonstrates DEPENDENCY INJECTION pattern
 * 
 * 3. NEGATIVE TESTING:
 *    - Tests error conditions and edge cases
 *    - Validates application handles failures gracefully
 *    - Ensures proper error messages are displayed
 * 
 * 4. PAGE OBJECT MODEL:
 *    - Uses LoginPage class for interactions
 *    - Demonstrates ENCAPSULATION and ABSTRACTION
 *    - Clean separation between test logic and page logic
 */
test.describe("Negative login Scenarios", () => {
  
    // VARIABLE DECLARATION - Will hold LoginPage instance
    let loginPage: LoginPage;
    
    /**
     * SETUP METHOD - Runs before each test
     * 
     * Demonstrates:
     * - TEST LIFECYCLE: beforeEach hook
     * - OBJECT INSTANTIATION: Creating LoginPage object
     * - DEPENDENCY INJECTION: Passing page object to constructor
     */
    test.beforeEach(async ({ page }) => {
       // OBJECT CREATION: Instantiate LoginPage with Playwright page
       loginPage = new LoginPage(page);
    });

    /**
     * LOCKED OUT USER TEST - Tests account lockout scenario
     * 
     * This test demonstrates:
     * - NEGATIVE TESTING: Testing failure scenario
     * - ENVIRONMENT VARIABLES: Using process.env for test data
     * - ERROR VALIDATION: Checking correct error message
     * - URL VALIDATION: Ensuring user stays on login page
     */
    test("Locked out user", async () => {
        // ATTEMPT LOGIN: Try to login with locked out user
        // Uses environment variable for username (secure test data management)
        await loginPage.loginToApplication(process.env.lockedOutUser);
        
        // ERROR VALIDATION: Verify correct error message is displayed
        // Uses enum for type safety and consistency
        await loginPage.validateErrorMessage(ErrorMessages.lockedOutUser);
        
        // URL VALIDATION: Ensure user remains on login page (login failed)
        await loginPage.validatePageURL(ApplicationURL.baseURL);
    });

    /**
     * INCORRECT USERNAME TEST - Tests invalid credentials scenario
     * 
     * This test demonstrates:
     * - BOUNDARY TESTING: Testing with invalid input
     * - HARDCODED TEST DATA: Using literal string for test case
     * - ERROR MESSAGE VALIDATION: Checking specific error response
     */
    test("Incorrect username", async () => {
        // ATTEMPT LOGIN: Try to login with invalid username
        // Uses hardcoded invalid username for this specific test
        await loginPage.loginToApplication("useruser");
        
        // ERROR VALIDATION: Verify appropriate error message
        // Different error message for invalid credentials vs locked account
        await loginPage.validateErrorMessage(ErrorMessages.incorrectUsername);
    });
});

/**
 * KEY TESTING CONCEPTS DEMONSTRATED:
 * 
 * 1. TEST ORGANIZATION:
 *    - Logical grouping with describe blocks
 *    - Clear test names describing scenarios
 *    - Consistent test structure
 * 
 * 2. NEGATIVE TESTING:
 *    - Testing error conditions
 *    - Validating error handling
 *    - Ensuring graceful failure
 * 
 * 3. DATA MANAGEMENT:
 *    - Environment variables for sensitive data
 *    - Enums for consistent error messages
 *    - Constants for URLs
 * 
 * 4. OBJECT-ORIENTED TESTING:
 *    - Page Object Model pattern
 *    - Clean separation of concerns
 *    - Reusable test components
 * 
 * 5. ASSERTION PATTERNS:
 *    - Multiple validations per test
 *    - Both positive and negative assertions
 *    - Clear validation messages
 */
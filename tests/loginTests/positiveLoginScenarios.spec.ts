import {test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import ApplicationURL from "../../helpers/applicationURL";
import InventoryPage from "../../pages/InventoryPage";
import PageTitles from "../../helpers/pageTitles";

/**
 * POSITIVE LOGIN SCENARIOS - Demonstrates SUCCESSFUL TEST CASES and DATA-DRIVEN TESTING
 * 
 * This test suite demonstrates:
 * 
 * 1. POSITIVE TESTING:
 *    - Tests successful login scenarios
 *    - Validates expected happy path behavior
 *    - Confirms application works as designed
 * 
 * 2. DATA-DRIVEN TESTING:
 *    - Multiple test cases with different user types
 *    - Same test logic, different input data
 *    - Environment variables for test data management
 * 
 * 3. USER PERSONA TESTING:
 *    - Different user types (standard, problem, performance)
 *    - Tests various user scenarios
 *    - Validates system behavior for different user profiles
 * 
 * Note: File should be renamed to .spec.ts for Playwright to recognize it as a test file
 */
test.describe("Positive login Scenarios", () => { // Note: Description doesn't match negative scenarios
  
    // VARIABLE DECLARATION - LoginPage instance for all tests
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    /**
     * SETUP METHOD - Test initialization
     * 
     * Demonstrates:
     * - TEST LIFECYCLE: beforeEach hook ensures clean state
     * - OBJECT INSTANTIATION: Creating fresh LoginPage for each test
     * - DEPENDENCY INJECTION: Playwright page object injection
     */
    test.beforeEach(async ({ page }) => {
       // OBJECT CREATION: New LoginPage instance for each test
       loginPage = new LoginPage(page);
       inventoryPage = new InventoryPage(page);
    });

    test.afterEach(async ({ page }) => {
        await inventoryPage.validateTitle(PageTitles.inventoryPage);
    });

    /**
     * STANDARD USER TEST - Tests normal user login
     * 
     * Demonstrates:
     * - ENVIRONMENT VARIABLES: Secure credential management
     * - SUCCESSFUL LOGIN: Positive test case
     * - URL VALIDATION: Confirms navigation to inventory page
     * - PAGE OBJECT MODEL: Clean test code using encapsulated methods
     */
    test("Standard user", async () => {
        // LOGIN ATTEMPT: Use standard user credentials from environment
        await loginPage.loginToApplication(process.env.standardUser);
        
        // SUCCESS VALIDATION: Verify user is redirected to inventory page
        // This confirms login was successful
        await inventoryPage.validatePageURL(ApplicationURL.inventoryURL);
    });

    /**
     * PROBLEM USER TEST - Tests user with known issues
     * 
     * This user type might have:
     * - Image loading issues
     * - Broken functionality
     * - Used for testing error handling in application
     */
    test("Problem user", async () => {
        // LOGIN WITH PROBLEM USER: Tests system with problematic user account
        await loginPage.loginToApplication(process.env.problemUser);
        
        // SUCCESS VALIDATION: Even problem users should be able to login
        // Problems typically manifest in other parts of the application
        await loginPage.validatePageURL(ApplicationURL.inventoryURL);
    });

    /**
     * PERFORMANCE GLITCH USER TEST - Tests user with performance issues
     * 
     * This user type simulates:
     * - Slow loading times
     * - Performance bottlenecks
     * - Used for performance testing scenarios
     */
    test("Performance glitch user", async () => {
        // LOGIN WITH PERFORMANCE USER: Tests system under performance constraints
        await loginPage.loginToApplication(process.env.performanceGlitchUser);
        
        // SUCCESS VALIDATION: Login should succeed despite performance issues
        // Performance problems typically affect page load times, not login success
        await inventoryPage.validatePageURL(ApplicationURL.inventoryURL);
    });
});

/**
 * KEY TESTING CONCEPTS DEMONSTRATED:
 * 
 * 1. POSITIVE TESTING:
 *    - Validates expected successful behavior
 *    - Confirms happy path functionality
 *    - Tests normal user workflows
 * 
 * 2. DATA-DRIVEN APPROACH:
 *    - Same test logic with different data sets
 *    - Environment variables for flexible test data
 *    - Multiple user personas for comprehensive coverage
 * 
 * 3. TEST ORGANIZATION:
 *    - Logical grouping of related positive scenarios
 *    - Consistent test structure and naming
 *    - Clear separation from negative test cases
 * 
 * 4. VALIDATION STRATEGY:
 *    - URL validation confirms successful login
 *    - Simple but effective success criteria
 *    - Focus on key business outcome (successful authentication)
 * 
 * 5. MAINTAINABILITY:
 *    - Environment variables allow easy credential updates
 *    - Page Object Model keeps tests clean and readable
 *    - Consistent pattern across all test cases
 * 
 * IMPROVEMENT OPPORTUNITIES:
 * - File should be renamed to positiveLoginScenarios.spec.ts
 * - Test description should match actual test type (positive vs negative)
 * - Could add more specific validations beyond URL checking
 */
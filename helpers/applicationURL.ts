/**
 * APPLICATION URL HELPER CLASS - Demonstrates STATIC METHODS and CONSTANTS
 * 
 * This utility class demonstrates several important programming concepts:
 * 
 * 1. STATIC MEMBERS:
 *    - All properties are static (belong to class, not instances)
 *    - Can be accessed without creating objects: ApplicationURL.baseURL
 *    - Memory efficient - only one copy exists
 * 
 * 2. READONLY PROPERTIES:
 *    - Values cannot be changed after initialization
 *    - Prevents accidental modification of URLs
 *    - Compile-time safety
 * 
 * 3. CONSTANTS PATTERN:
 *    - Centralized location for all application URLs
 *    - Avoids "magic strings" scattered throughout code
 *    - Easy to maintain and update
 * 
 * 4. STRING COMPOSITION:
 *    - Other URLs built from base URL
 *    - Single source of truth for domain
 *    - Easy to change environments (dev/staging/prod)
 */
export default class ApplicationURL {
    
    // BASE URL - Foundation for all other URLs
    public static readonly baseURL = 'https://www.saucedemo.com/';
    
    // COMPOSED URLs - Built from base URL for consistency
    public static readonly inventoryURL = ApplicationURL.baseURL + 'inventory.html';
    public static readonly cartURL = ApplicationURL.baseURL + 'cart.html';
}

/**
 * USAGE EXAMPLES:
 * 
 * // Access without creating instance (static)
 * await page.goto(ApplicationURL.baseURL);
 * await expect(page).toHaveURL(ApplicationURL.inventoryURL);
 * 
 * // Cannot modify (readonly)
 * ApplicationURL.baseURL = 'different-url'; // ❌ Compile error
 * 
 * BENEFITS:
 * - MAINTAINABILITY: Change URLs in one place
 * - CONSISTENCY: Same URLs used everywhere
 * - TYPE SAFETY: Compile-time checking
 * - READABILITY: Clear, descriptive names
 */

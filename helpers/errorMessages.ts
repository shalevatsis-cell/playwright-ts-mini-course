/**
 * ERROR MESSAGES ENUM - Demonstrates ENUMS and TYPE SAFETY
 * 
 * This enum demonstrates several important programming concepts:
 * 
 * 1. ENUMERATION:
 *    - Defines a set of named constants
 *    - Provides type safety for error message handling
 *    - Prevents typos in error message strings
 * 
 * 2. TYPE SAFETY:
 *    - Compiler ensures only valid error messages are used
 *    - IntelliSense provides autocomplete for available options
 *    - Prevents runtime errors from incorrect strings
 * 
 * 3. MAINTAINABILITY:
 *    - Centralized location for all error messages
 *    - Easy to update messages without searching entire codebase
 *    - Consistent error message format
 * 
 * 4. READABILITY:
 *    - Descriptive names make code self-documenting
 *    - Clear intent when used in validation methods
 */
export enum ErrorMessages {
    // Locked out user error - when user account is disabled
    lockedOutUser = "Epic sadface: Sorry, this user has been locked out.",
    
    // Invalid credentials error - when username/password don't match
    incorrectUsername = "Epic sadface: Username and password do not match any user in this service"
}

/**
 * USAGE EXAMPLES:
 * 
 * // Type-safe usage in validation
 * await loginPage.validateErrorMessage(ErrorMessages.lockedOutUser);
 * 
 * // Get string value
 * const message = ErrorMessages.lockedOutUser.valueOf();
 * 
 * // Cannot use invalid values
 * await loginPage.validateErrorMessage("wrong message"); // ❌ Compile error
 * 
 * BENEFITS:
 * - TYPE SAFETY: Compile-time validation
 * - MAINTAINABILITY: Single source of truth
 * - CONSISTENCY: Same messages used everywhere
 * - INTELLISENSE: IDE autocomplete support
 * - REFACTORING: Easy to rename/update messages
 */

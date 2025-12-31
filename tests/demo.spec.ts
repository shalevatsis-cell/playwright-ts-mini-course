import ApplicationURL from "../helpers/applicationURL";
import UserCredentials from "../helpers/userCredentials";
import LoginPage from "../pages/LoginPage"; 
import InventoryPage from "../pages/InventoryPage";
import { test } from "@playwright/test";
import { ErrorMessages } from "../helpers/errorMessages";


test('demo test 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication();
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.validatePageURL(ApplicationURL.inventoryURL);
    await inventoryPage.validateTitle('Products');
});

test('demo test 2', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(UserCredentials.lockedOutUser);
    await loginPage.validateErrorMessage(ErrorMessages.lockedOutUser);
});

test('demo test 3', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(UserCredentials.problemUser);
});

test('demo test 4', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(UserCredentials.performanceGlitchUser);
});
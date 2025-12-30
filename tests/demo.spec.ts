import ApplicationURL from "../helpers/applicationURL";
import UserCredentials from "../helpers/userCredentials";
import LoginPage from "../pages/LoginPage"; 
import { test } from "@playwright/test";


test('demo test 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication();
});

test('demo test 2', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(UserCredentials.lockedOutUser);
});

test('demo test 3', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(UserCredentials.problemUser);
});

test('demo test 4', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(UserCredentials.performanceGlitchUser);
});
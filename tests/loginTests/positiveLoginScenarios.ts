import {test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import ApplicationURL from "../../helpers/applicationURL";

test.describe("Negative login Scenarios", () => {
  
    let loginPage: LoginPage;
    
    test.beforeEach(async ({ page }) => {
       loginPage = new LoginPage(page);
    });

    test("Standard user", async () => {
        await loginPage.loginToApplication(process.env.standardUser);
        await loginPage.validatePageURL(ApplicationURL.inventoryURL);
    });

    test("Problem user", async () => {
        await loginPage.loginToApplication(process.env.problemUser);
        await loginPage.validatePageURL(ApplicationURL.inventoryURL);
    });

    test("Performance glitch user", async () => {
        await loginPage.loginToApplication(process.env.performanceGlitchUser);
        await loginPage.validatePageURL(ApplicationURL.inventoryURL);
    });
});
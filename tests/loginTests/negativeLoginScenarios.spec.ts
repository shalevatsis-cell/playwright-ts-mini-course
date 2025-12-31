import {test} from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import UserCredentials from "../../helpers/userCredentials";
import { ErrorMessages } from "../../helpers/errorMessages";
import ApplicationURL from "../../helpers/applicationURL";

test.describe("Negative login Scenarios", () => {
  
    let loginPage: LoginPage;
    
    test.beforeEach(async ({ page }) => {
       loginPage = new LoginPage(page);
    });

    test("Locked out user", async () => {
        await loginPage.loginToApplication(UserCredentials.lockedOutUser);
        await loginPage.validateErrorMessage(ErrorMessages.lockedOutUser);
        await loginPage.validatePageURL(ApplicationURL.baseURL);
    });

    test("Incorrect username", async () => {
        await loginPage.loginToApplication("useruser");
        await loginPage.validateErrorMessage(ErrorMessages.incorrectUsername);
    });
});
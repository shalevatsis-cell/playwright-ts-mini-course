import { Locator, Page, expect } from "@playwright/test";
import ApplicationURL from "../helpers/applicationURL";
import UserCredentials from "../helpers/userCredentials";

export default class LoginPage {
    
    userNameField: Locator;
    passwordField: Locator;
    loginButton: Locator;

    constructor(protected page: Page) {
        this.userNameField = this.page.locator('[data-test="username"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
    }

    public async loginToApplication(username: string = UserCredentials.standardUser, password: string = UserCredentials.correctPassword, url: string = ApplicationURL.baseURL) {
        await this.page.goto(url);
        await this.validatePageURL(url);
        await this.userNameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        if (username !== UserCredentials.lockedOutUser) {
            await this.page.waitForURL('**/inventory.html');
        }
    }

    public async validatePageURL(expectedURL: string) {
        await expect(this.page).toHaveURL(expectedURL, {timeout: 5000});
    }
}

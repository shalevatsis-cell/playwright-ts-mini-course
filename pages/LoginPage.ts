import { Locator, Page, test } from "@playwright/test";
import ApplicationURL from "../helpers/applicationURL";
import { ErrorMessages } from "../helpers/errorMessages";
import BasePage from "./BasePage";

export default class LoginPage extends BasePage {

    private userNameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    private errorMessage: Locator;

    constructor(protected page: Page) {
        super(page);
        this.userNameField = this.page.locator('[data-test="username"]');
        this.passwordField = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
        this.errorMessage = this.page.locator('[data-test="error"]');
    }

    public async loginToApplication(username = process.env.standardUser as string, password: string = process.env.correctPassword as string, url: string = ApplicationURL.baseURL) {
        await this.page.goto(url);
        await this.validatePageURL(url);
        await this.userNameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    public async validateErrorMessage(errorMessage: ErrorMessages) {
        await test.step(`Validating that error message is: ${errorMessage.valueOf()}`, async () => {
            await this.validateElementText(this.errorMessage, errorMessage.valueOf());
        });
    }
}

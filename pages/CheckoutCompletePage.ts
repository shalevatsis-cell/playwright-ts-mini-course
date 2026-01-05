import BasePage from "./BasePage";
import { Locator, Page } from "@playwright/test";

export default class CheckoutCompletePage extends BasePage {
    // Page elements and methods for checkout complete
    private backHomeButton: Locator;
    private thankYouMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.backHomeButton = page.locator('button[data-test="back-to-products"]');
        this.thankYouMessage = page.locator('h2[data-test="complete-header"]');
    }

    public async goBackToHome() {
        await this.clickElement(this.backHomeButton);
    }

    public async validateThankYouMessage(expectedMessage: string) {
        await this.validateElementText(this.thankYouMessage, expectedMessage);
    }
}

import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CheckoutStepOnePage extends BasePage {
    // Page elements and methods for checkout step one
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private zipCodeInput: Locator;
    private continueButton: Locator;

    constructor(protected page: Page) {
        super(page);
        this.firstNameInput = this.page.locator('[data-test="firstName"]');
        this.lastNameInput = this.page.locator('[data-test="lastName"]');
        this.zipCodeInput = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
    }

    public async enterShippingInformation(firstName: string, lastName: string, zipCode: string) {
        await this.fillInput(this.firstNameInput, firstName);
        await this.fillInput(this.lastNameInput, lastName);
        await this.fillInput(this.zipCodeInput, zipCode);
    }

    public async goToCheckoutStepTwo() {
        await this.clickElement(this.continueButton);
    }
}

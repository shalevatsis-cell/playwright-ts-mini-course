import { Locator, Page, expect, test } from '@playwright/test';
import BasePage from './BasePage';

export default class CheckOutStepTwoPage extends BasePage {
    // Page elements and methods for checkout step two
    private finishButton: Locator;
    private itemTotal: Locator;

    constructor(page: Page) {
        super(page);
        this.finishButton = page.locator('button[data-test="finish"]');
        this.itemTotal = page.locator('div.summary_subtotal_label');
    }

    public async validateItemTotal(expectedTotal: string) {
        await test.step(`Validating item total is ${expectedTotal}`, async () => {
            const itemTotal = await this.itemTotal.textContent();
            expect(itemTotal).toContain(expectedTotal);
        });
    }

    public async finishCheckout() {
        await this.clickElement(this.finishButton);
    }

    

}

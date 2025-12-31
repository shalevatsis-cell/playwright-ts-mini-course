import { Locator, Page, expect, test } from '@playwright/test';
import BasePage from './BasePage';

export default class CartPage extends BasePage {
    private cartItems: Locator;
    private checkoutButton: Locator;

    constructor(protected page: Page) {
        super(page);
        this.cartItems = this.page.locator('.cart_item');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
    }

    public async validateCartItemCount(expectedCount: number) {
        await test.step(`Validating cart item count is ${expectedCount}`, async () => {
            const count = await this.cartItems.count();
            expect(count).toBe(expectedCount);
        });
    }

    public async proceedToCheckout() {
        await this.clickElement(this.checkoutButton);
    }
}

import { Page, expect, test, Locator } from "@playwright/test";

export default abstract class BasePage {

    constructor(protected page: Page) {

    }
    
    public async navigateTo(url: string) {
        await this.page.goto(url);
    }

    public async validatePageURL(expectedURL: string) {  
        await test.step(`Validating that a correct value of URL is ${expectedURL}`, async () => {
            await expect(this.page).toHaveURL(expectedURL);
        });
    }

    protected async validateElementText(element: Locator, expectedText: string) {
        await test.step(`Validating that element has text: ${expectedText}`, async () => {
            await expect(element).toContainText(expectedText);
        });
    }

    public async validatePageTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    public async validateTitle(title: string) {
        await this.validateElementText(this.page.locator('.title'), title);
    }

    protected async clickElement(element: Locator) {
        await test.step(`Clicking on '${element}' element`, async () => {
            await element.click();
        });
    }
}

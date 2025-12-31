import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class InventoryPage extends BasePage {
  // Page elements
  private itemDescriptionElement: Locator;
  private shoppingCartElement: Locator;

  constructor(protected page: Page) {
    super(page);
    this.itemDescriptionElement = this.page.locator('[class="inventory_item_description"]');
    this.shoppingCartElement = this.page.locator('.shopping_cart_badge');
  }

  public async chooseProductByTitle(expectedProductTitle: string)  {
    await this.itemDescriptionElement.filter({ hasText: expectedProductTitle }).locator('button').click();
  }

/*
   protected async chooseProductByTitle(expectedProductTitle: string)  {
    for (let product of await this.itemDescriptionElement.all()) {
      const currentProductTitle = await product.locator('.inventory_item_name').innerText();
      if (currentProductTitle === expectedProductTitle) {
        await product.locator('button').click();
        break;
      }
    }
  }
*/

  public async validateProductIsAddedToCart(expectedNumberOfItems: string) {
    await this.validateElementText(this.shoppingCartElement, expectedNumberOfItems);
  }


  public async goToCart() {
    await this.clickElement(this.shoppingCartElement);
  }

}
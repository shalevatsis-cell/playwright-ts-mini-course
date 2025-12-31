import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import ApplicationURL from '../helpers/applicationURL';
import { test, expect } from '@playwright/test';

test('sanity test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.loginToApplication();

  await inventoryPage.validatePageURL(ApplicationURL.inventoryURL);
  await inventoryPage.validateTitle('Products');
  
  await inventoryPage.chooseProductByTitle('Sauce Labs Backpack');
  await inventoryPage.chooseProductByTitle('Sauce Labs Bike Light');
  await inventoryPage.chooseProductByTitle('Sauce Labs Bolt T-Shirt');
  await inventoryPage.chooseProductByTitle('Sauce Labs Fleece Jacket');

  await inventoryPage.validateProductIsAddedToCart('4');
  await inventoryPage.goToCart();

  await cartPage.validatePageURL(ApplicationURL.cartURL);
  await cartPage.validateTitle('Your Cart');
  await cartPage.validateCartItemCount(4);
  await cartPage.proceedToCheckout();

  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('123456');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(5).click();
  await page.goto('https://saucelabs.com/');

});
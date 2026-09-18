

import { expect, test } from 'playwright/test';
import { InventoryPage } from '../../pageObjects/InventoryPage';
import { CartPage } from '../../pageObjects/CartPage';

let inventoryPage: InventoryPage;
let cartPage: CartPage;
test.describe('Cart Flow', () => {
    test.use({
        storageState: 'src/test/cart/storageState.json',
    })

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await inventoryPage.addProduct("Sauce Labs Backpack");
        await inventoryPage.addProduct("Sauce Labs Bike Light");
        await inventoryPage.openShoppingCart();
    });

    test('CART_01 - Verify if the cart page is displayed correctly', async ({ page }) => {
        await expect(cartPage.cartTitle).toBeVisible();
        await expect(cartPage.cartItem).toBeVisible();
    })

    test('CART_02 - Verify if the product is added to the cart', async ({ page }) => {
        await cartPage.getProductsCount().then(count => {
            expect(count).toBe(2);
        })
    })

    test('CART_03 - Verify if the product is removed from the cart', async ({ page }) => {
        await cartPage.removeProduct();
        await cartPage.getProductsCount().then(count => {
            expect(count).toBe(1);
        })
    })

    test('CART_04 - Verify if the continue shopping button is working correctly', async ({ page }) => {
        await cartPage.continueShopping();
        await expect(inventoryPage.inventoryContainer).toBeVisible();
    })

    test('CART_05 - Verify if the checkout button is working correctly', async ({ page }) => {
        await cartPage.checkout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    })

    test('CART_06 - Verify if the cart page is refreshed the number of products dont change', async ({ page }) => {
        await cartPage.getProductsCount().then((countBeforeRefresh: any) => {
            expect(countBeforeRefresh).toBe(2);
        })
        await cartPage.refresh();
        await cartPage.getProductsCount().then((countAfterRefresh: any) => {
            expect(countAfterRefresh).toBe(2);
        })
    })

    test('CART_07 - Verify if the Back Navigation button is working correctly', async ({ page }) => {
        await page.goBack();
        await expect(inventoryPage.inventoryContainer).toBeVisible();
    })
}) 



    
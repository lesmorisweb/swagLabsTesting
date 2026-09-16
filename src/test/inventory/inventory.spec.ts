import { expect, test } from "playwright/test";
import { InventoryPage, SortOptions } from "../../pageObjects/InventoryPage";



test.describe("Inventory Flow", () => {
    test.use({
        storageState: 'src/test/inventory/storageState.json',
    })

    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        await page.goto('https://www.saucedemo.com/inventory.html');
    });

    test('IN_01 - Verify if the inventory page is displayed correctly', async ({ page }) => {
        await expect(inventoryPage.inventoryTitle).toBeVisible();
        await expect(inventoryPage.inventoryContainer).toBeVisible();
    })

    test('IN_02 - Verify if the Add Product button is working correctly', async ({ page }) => {
        await inventoryPage.addBackpack();
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    })

    test('IN_03 - Verify if the Remove Product button is working correctly', async ({ page }) => {
        await inventoryPage.addBackpack();
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
        await inventoryPage.removeBackpack();
        await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    })

    test('IN_04 - Verify if the product details page is displayed correctly', async ({ page }) => {
        await inventoryPage.selectProductByName('Sauce Labs Backpack');
        const productDetailsContainer = await inventoryPage.getProductDetailsContainer();
        await expect(productDetailsContainer).toBeVisible();
    })

    test('IN_05 - Verify if the product sorting by A - Z is working correctly', async ({ page }) => {
        await inventoryPage.sortProducts(SortOptions.az);
        const productNames = await inventoryPage.productNames.allInnerTexts();
        expect(productNames).toEqual([...productNames].sort());
    })

    test('IN_06 - Verify if the product sorting by Z - A is working correctly', async ({ page }) => {
        await inventoryPage.sortProducts(SortOptions.za);
        const productNames = await inventoryPage.productNames.allInnerTexts();
        expect(productNames).toEqual([...productNames].sort().reverse());
    })

    test('IN_07 - Verify if the product sorting by Price Low to High is working correctly', async ({ page }) => {
        await inventoryPage.sortProducts(SortOptions.lohi);
        const productPrices = await inventoryPage.productPrices.allInnerTexts();
        const productPricesNumbers = productPrices.map(price => parseFloat(price.replace('$', '')));
        expect(productPricesNumbers).toEqual([...productPricesNumbers].sort((a, b) => a - b));
    })

    test('IN_08 - Verify if the product sorting by Price High to Low is working correctly', async ({ page }) => {
        await inventoryPage.sortProducts(SortOptions.hilo);
        const productPrices = await inventoryPage.productPrices.allInnerTexts();
        const productPricesNumbers = productPrices.map(price => parseFloat(price.replace('$', '')));
        expect(productPricesNumbers).toEqual([...productPricesNumbers].sort((a, b) => b - a));
    })

    test('IN_09 - Verify the Open Shopping Cart button is working correctly', async ({ page }) => {
        await inventoryPage.openShoppingCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    })

    test('IN_10 - Verify the Logout button is working correctly', async ({ page }) => {
        await inventoryPage.burgerMenu.click();
        await inventoryPage.logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    })
})
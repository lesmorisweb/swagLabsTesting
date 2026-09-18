import { Locator, Page } from "playwright/test";



export class CartPage {

    readonly page: Page;
    readonly cartTitle: Locator;
    readonly cartItem: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productQuantity: Locator;
    readonly removeButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartTitle = page.locator('[data-test="title"]');
        this.cartItem = page.locator('[data-test="inventory-item"]');
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.productQuantity = page.locator('[data-test="item-quantity"]');
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async removeProduct() {
        await this.removeButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async refresh() {
        await this.page.reload();
    }

    async getProductsCount() {

        return this.cartItem.count();
    }
}

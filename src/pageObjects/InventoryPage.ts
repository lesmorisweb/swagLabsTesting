import { Locator, Page } from "playwright";


export class InventoryPage {

    readonly page: Page;

    readonly inventoryTitle: Locator;
    readonly inventoryContainer: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly sortDropdown: Locator;
    readonly backpackAddButton: Locator;
    readonly backpackRemoveButton: Locator;
    readonly backpackTitle: Locator;
    readonly productTitle: Locator;
    readonly burgerMenu: Locator;
    readonly logoutButton: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {

        this.page = page;
        this.inventoryTitle = page.locator('[data-test="title"]');
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.backpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.backpackTitle = page.locator('[data-test="item-4-title-link"]');
        this.productTitle = page.locator('[data-test="inventory-item-name"]');
        this.burgerMenu = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
        this.productPrices = page.locator('[data-test="inventory-item-price"]');

    }

    async addBackpack() {
        await this.backpackAddButton.click();
    }

    async removeBackpack() {
        await this.backpackRemoveButton.click();
    }

    async openBackpack() {
        await this.backpackTitle.click();
    }

    async sortProducts(value: string) {
        await this.sortDropdown.selectOption(value);
    }

    async openShoppingCart() {
        await this.shoppingCartLink.click();
    }

    async logout() {
        await this.burgerMenu.click();
        await this.logoutButton.click();
    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allInnerTexts();
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrices.allInnerTexts();
        return prices.map(price =>
            Number(price.replace('$', ''))
        );
    }

}

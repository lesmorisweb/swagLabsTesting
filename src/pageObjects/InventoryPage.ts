import { Locator, Page } from "playwright";

export enum SortOptions {
    "az" = "az",
    "za" = "za",
    "lohi" = "lohi",
    "hilo" = "hilo"
}

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
        this.productTitle = page.locator('.inventory_item_label a');
        this.burgerMenu = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.productNames = page.locator('.inventory_item_label a');
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

    async sortProducts(value: SortOptions) {
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

    async getProductByName(productName: string) {
        const productLocator = this.page.locator(`.inventory_item_label a[aria-label*="${productName}"]`);
        return productLocator;
    }

    async selectProductByName(productName: string) {
        const productLocator = await this.getProductByName(productName);
        await productLocator.click();
    }

    async getProductDetailsContainer(){
        return this.page.locator('.div.inventory_item_container');
        
    }

}

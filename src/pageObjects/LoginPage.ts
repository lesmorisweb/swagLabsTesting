import { Locator, Page } from "playwright";

export class LoginPage {

    readonly page: Page; 

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.usernameInput = page.locator('input[data-test="username"]');
        this.passwordInput = page.locator('input[data-test="password"]');
        this.loginButton = page.locator('input[data-test="login-button"]');
        this.errorMessage = page.locator('div[class="error-message-container error"]');

    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessageText(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }

    async refreshPage() {
        await this.page.reload();
    }
}
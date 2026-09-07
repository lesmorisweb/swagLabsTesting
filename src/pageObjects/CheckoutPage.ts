import { Locator, Page } from "playwright/test";


export class CheckoutPage {

    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;
    readonly overviewTitle: Locator;
    readonly paymentInformation: Locator;
    readonly shippingInformation: Locator;
    readonly total: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly completeMessage: Locator;
    readonly backHomeButton: Locator;
    readonly generatePDFButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.overviewTitle = page.locator('[data-test="title"]');
        this.paymentInformation = page.locator('[data-test="payment-info-value"]');
        this.shippingInformation = page.locator('[data-test="shipping-info-value"]');
        this.total = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeMessage = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
        this.generatePDFButton = page.locator('#generate-pdf');
    }

    async fillInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continue() {
        await this.continueButton.click();
    }

    async continueCheckout() {
        await this.continue();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    async cancelCheckout() {
        await this.cancel();
    }

    async finish() {
        await this.finishButton.click();
    }

    async finishCheckout() {
        await this.finish();
    }

    async backHome() {
        await this.backHomeButton.click();
    }

    async generatePDF() {
        await this.generatePDFButton.click();
    }

    async generatePDFOrder() {
        await this.generatePDF();
    }

    async getErrorMessage() {
        return this.errorMessage;
    }

    async completeCheckoutInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.fillInformation(
            firstName,
            lastName,
            postalCode
        );
        await this.continue();
    }
    async completeCheckout(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.completeCheckoutInformation(
            firstName,
            lastName,
            postalCode
        );
    }
}

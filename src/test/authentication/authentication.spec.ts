import { expect, test } from "playwright/test";
import { LoginPage } from "../../pageObjects/LoginPage";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goTo();
});

test('AU_01 - Verify a successful login', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.inventoryTitle).toBeVisible();
   
});

test('AU_02 - Verify an unsuccessful login with invalid username', async () => {
    await loginPage.login('invalidUsername', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('AU_03 - Verify an unsuccessful login with invalid password', async () => {
    await loginPage.login('standard_user', 'invalidPassword');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('AU_04 - Verify an unsuccessful login with locked out user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('AU_05 - Verify the logout functionality', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.inventoryTitle).toBeVisible();
    await loginPage.burgerMenu.click();
    await loginPage.logoutButton.click();
    await expect(loginPage.usernameInput).toBeVisible();
});

test('AU_06 - Verify the page refresh functionality', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.inventoryTitle).toBeVisible();
    await loginPage.refreshPage();
    await expect(loginPage.inventoryTitle).toBeVisible();
});

test('AU_07 - Verify the back button after logout', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.inventoryTitle).toBeVisible();
    await loginPage.logout();
    await page.goBack();
    await expect(loginPage.usernameInput).toBeVisible();
});

test('AU_08 - Verify direct access to the inventory page by URL', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(loginPage.usernameInput).toBeVisible();
});



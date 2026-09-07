import { test as setup } from "playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";

setup('autenticate as standard user', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await page.context().storageState({ path: 'auth/standard_user.json' });

});

setup('autenticate as problem user', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('problem_user', 'secret_sauce');

    await page.context().storageState({ path: 'auth/problem_user.json' });

});

setup('autenticate as performance glitch user', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('performance_glitch_user', 'secret_sauce');

    await page.context().storageState({ path: 'auth/performance_glitch_user.json' });

});

setup('autenticate as error user', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('error_user', 'secret_sauce');

    await page.context().storageState({ path: 'auth/error_user.json' });

});

setup('autenticate as visual user', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('visual_user', 'secret_sauce');

    await page.context().storageState({ path: 'auth/visual_user.json' });

});


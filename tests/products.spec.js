const { test, expect } = require('@playwright/test');

test('Products page is displayed after login', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');

    await page.locator('[data-test="password"]').fill('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('.title')).toHaveText('Products');
    
});


test('Verify products are displayed', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    const products = page.locator('.inventory_item');

    await expect(products).toHaveCount(6);

});


test('Sauce Labs Backpack is displayed', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

});

test('Sauce Labs Backpack price is displayed', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

await expect(
    page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' })
        .locator('.inventory_item_price')
).toHaveText('$29.99');

});


test('User can open product details', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.getByText('Sauce Labs Backpack').click();
    
    await expect(page).toHaveURL(/inventory-item/);
    await expect(page.locator('.inventory_details_name'))
        .toHaveText('Sauce Labs Backpack');

});
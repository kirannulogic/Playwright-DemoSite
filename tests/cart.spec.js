const { test, expect } = require('@playwright/test');

test('User can add backpack to cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page
        .locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' })
        .getByRole('button', { name: 'Add to cart' })
        .click();

    await expect(page.locator('.shopping_cart_badge'))
        .toHaveText('1');

});

test('User can add 2 items to cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page
        .locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' })
        .getByRole('button', { name: 'Add to cart' })
        .click();

    await page
        .locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bike Light' })
        .getByRole('button', { name: 'Add to cart' })
        .click();

    await expect(page.locator('.shopping_cart_badge'))
        .toHaveText('2');

});


test('User can view cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page
        .locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' })
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // await page.getByRole('link', { name: /shopping cart/i }).click();
    await page.getByRole('button', { name: /Cart/ }).click();

    await expect(page.locator('.title'))
        .toHaveText('Your Cart');

    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

});


test('User can remove item from cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page
        .locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' })
        .getByRole('button', { name: 'Add to cart' })
        .click();

    // await page.getByRole('link', { name: /shopping cart/i }).click();
    await page.getByRole('button', { name: /Cart/ }).click();

    await expect(page.locator('.title'))
        .toHaveText('Your Cart');

    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

    await page.getByRole('button', { name: 'Remove' }).click();

    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toHaveCount(0);
})
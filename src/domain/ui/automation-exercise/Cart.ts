import { By, PageElement } from '@serenity-js/web';

export const Cart = {
    cartMenu: () => PageElement.located(By.css('ul.nav li a[href="/view_cart"]'))
        .describedAs('cart menu item'),

    firstItemDescription: () => PageElement.located(By.css('#cart_info_table tbody tr:first-child .cart_description h4 a'))
        .describedAs('first item description in cart'),

    checkoutButton: () => PageElement.located(By.css('.check_out'))
        .describedAs('proceed to checkout button')
};

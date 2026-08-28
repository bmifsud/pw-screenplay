import { By, PageElement } from '@serenity-js/web';

export const ProductList = {
    firstProductPrice: () => PageElement.located(By.css('.features_items .col-sm-4:first-child .productinfo h2'))
        .describedAs('price of the first product'),

    firstProductAddToCartButton: () => PageElement.located(By.css('.features_items .col-sm-4:first-child .productinfo .add-to-cart'))
        .describedAs('add to cart button of the first product'),

    continueShoppingButton: () => PageElement.located(By.css('.modal-content .btn-success'))
        .describedAs('continue shopping button in modal')
};

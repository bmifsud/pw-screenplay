import { By, PageElement, PageElements } from '@serenity-js/web';

export const ProductList = {
    firstProductPrice: () => PageElement.located(By.css('.features_items .col-sm-4:first-child .productinfo h2'))
        .describedAs('price of the first product'),

    firstProductAddToCartButton: () => PageElements.located(By.css('a.add-to-cart[data-product-id="1"]')).first()
        .describedAs('add to cart button of the first product'),

    continueShoppingButton: () => PageElement.located(By.css('.modal-content .btn-success'))
        .describedAs('continue shopping button in modal')
};

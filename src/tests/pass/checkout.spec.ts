import '../setup';

import { Ensure, equals, isPresent } from '@serenity-js/assertions';
import { actorCalled } from '@serenity-js/core';
import { Wait } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { test } from '@serenity-js/playwright-test';
import { CallAnApi } from '@serenity-js/rest';
import { LastResponse } from '@serenity-js/rest';
import { Click, isVisible } from '@serenity-js/web';

import { BookingApi } from '../../domain/api/restful-booker/BookingApi';
import { Cart } from '../../domain/ui/automation-exercise/Cart';
import { Navigation } from '../../domain/ui/automation-exercise/Navigation';
import { ProductList } from '../../domain/ui/automation-exercise/ProductList';

test.describe('Happy Path: Checkout and API Validations', () => {

    test('E2E UI Checkout - Add to cart', async ({ page, context, browser }) => {
        const alice = actorCalled('Alice').whoCan(BrowseTheWebWithPlaywright.using(browser));

        await alice.attemptsTo(
            Navigation.toHomePage(),
            Wait.until(ProductList.firstProductAddToCartButton(), isPresent()),
            Click.on(ProductList.firstProductAddToCartButton()),
            Wait.until(ProductList.continueShoppingButton(), isVisible()),
            Click.on(ProductList.continueShoppingButton()),
            Click.on(Cart.cartMenu()),
            Ensure.that(Cart.firstItemDescription(), isPresent())
        );
    });

    test('API Validation - Create and retrieve booking', async () => {
        const alice = actorCalled('Alice').whoCan(CallAnApi.at('https://restful-booker.herokuapp.com'));

        const payload = {
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2018-01-01',
                checkout: '2019-01-01'
            },
            additionalneeds: 'Breakfast'
        };

        await alice.attemptsTo(
            BookingApi.createBooking(payload),
            Ensure.that(LastResponse.status(), equals(200))
        );
    });
});

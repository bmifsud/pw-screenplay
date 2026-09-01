import '../setup';

import { Ensure, equals } from '@serenity-js/assertions';
import { actorCalled } from '@serenity-js/core';
import { configure } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { test } from '@serenity-js/playwright-test';
import { CallAnApi } from '@serenity-js/rest';
import { LastResponse } from '@serenity-js/rest';
import { By, Click,Navigate, PageElement } from '@serenity-js/web';

import { BookingApi } from '../../domain/api/restful-booker/BookingApi';
import { JiraReporter } from '../JiraReporter';

// Configure Jira Reporter for failure suite
configure({
    crew: [
        new JiraReporter('https://your-jira-instance.atlassian.net')
    ]
});

test.describe('Negative Path: Demonstrating Framework Resilience and Error Handling', () => {

    test.describe.configure({ timeout: 15000 });
    test('Intentional UI Failure - Missing Element', async ({ browser }) => {
        const bob = actorCalled('Bob').whoCan(BrowseTheWebWithPlaywright.using(browser));

        await bob.attemptsTo(
            Navigate.to('https://automationexercise.com/'),
            // This element doesn't exist, which will intentionally fail the test
            Click.on(PageElement.located(By.id('non-existent-element-for-demo')).describedAs('non-existent element'))
        );
    });

    test('API Validation - Intentional 404', async () => {
        const bob = actorCalled('Bob').whoCan(CallAnApi.at('https://restful-booker.herokuapp.com'));

        await bob.attemptsTo(
            BookingApi.getNonExistentBooking(),
            Ensure.that(LastResponse.status(), equals(404))
        );
    });

    test('API Validation - Intentional 500', async () => {
        const bob = actorCalled('Bob').whoCan(CallAnApi.at('https://restful-booker.herokuapp.com'));

        await bob.attemptsTo(
            BookingApi.triggerServerError(),
            Ensure.that(LastResponse.status(), equals(500))
        );
    });
});

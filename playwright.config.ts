import { defineConfig, devices } from '@playwright/test';
import type { SerenityFixtures, SerenityWorkerFixtures } from '@serenity-js/playwright-test';
import * as dotenv from 'dotenv';

dotenv.config();

const testDirectory = process.env.TEST_SUITE === 'pass' ? './src/tests/pass' :
    (process.env.TEST_SUITE === 'fail' ? './src/tests/fail' :
        './src/tests');

export default defineConfig<SerenityFixtures, SerenityWorkerFixtures>({
    testDirectory,
    timeout: 30_000,
    expect: {
        timeout: 5000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['line'],
        ['html', { open: 'never', outputFolder: './reports/playwright' }],
        ['@serenity-js/playwright-test', {
            crew: [
                '@serenity-js/console-reporter',
                ['@serenity-js/html-reporter', {
                    specDirectory: './src/tests',
                }],
            ],
        }],
    ],
    use: {
        headless: true,
        defaultActorName: 'Alice',
        crew: [
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' }],
        ],
        actionTimeout: 0,
        trace: 'on-first-retry',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        }
    ],
});

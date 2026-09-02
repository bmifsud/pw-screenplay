import { Task } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';

export const Navigation = {
    toHomePage: () => Task.where(`#actor navigates to Automation Exercise home page`,
        Navigate.to('https://automationexercise.com/')
    ),
};

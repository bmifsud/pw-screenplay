import { By, PageElement } from '@serenity-js/web';

export const DynamicIdsPage = {
    dynamicIdButton: () => PageElement.located(By.xpath('//button[contains(text(), "Button with Dynamic ID")]'))
        .describedAs('button with dynamic ID')
};

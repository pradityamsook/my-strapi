/**
 *  article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi}) => ({
    async find(ctx: any) {
        const minPrice: number = 0.00;

        const articles = await strapi.service("api::article.article").findArticleWithProductPriceGreaterThan(minPrice);

        console.log('controller find >> articles: ', articles);

        return articles;
    }
}));

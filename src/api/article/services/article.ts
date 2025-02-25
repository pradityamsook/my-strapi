/**
 * article service.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::article.article', ({ strapi }) => ({
    async findArticleWithProductPriceGreaterThan(minPrice: number): Promise<any> {
        const articles = await strapi.documents('api::article.article').findMany({
            populate: {
                // product: true,
                // author: true,
                // category: true
            }, 
            // filters: {
            //     updatedAt: {
            //         $lt: "2025-02-25T00:00:00.000Z"
            //     }
            // }
        });

        console.log('service findArticleWithProductPriceGreaterThan >> articles: ', articles);

        return articles;
    },
}));
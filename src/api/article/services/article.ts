/**
 * article service.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::article.article', ({ strapi }) => ({
    async findArticleWithProductPriceGreaterThan(minPrice: number = 0): Promise<any> {
        const articles = await strapi.documents('api::article.article').findMany({
            populate: {
                products: {
                    filters: {
                        price: {
                            $gt: minPrice
                        }
                    }
                }
            }
        })

        strapi.log.log('articles', articles);

        // const filteredArticles = articles.filter((article: any) => {
        //     return article.relatedProducts.some((product: any) => product.price > minPrice);
        // }

        return articles;
    },
}));
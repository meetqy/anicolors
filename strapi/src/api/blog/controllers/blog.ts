/**
 * blog controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::blog.blog", ({ strapi }) => ({
  async incViews(ctx) {
    const { documentId } = ctx.params;

    const knex = strapi.db.connection("blogs");

    return knex.where("document_id", documentId).increment("views", 1);
  },
}));

/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::category.category", ({ strapi }) => ({
  async incViews(ctx) {
    const { documentId } = ctx.params;

    const knex = strapi.db.connection("categories");

    return knex.where("document_id", documentId).increment("views", 1);
  },
}));

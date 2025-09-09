/**
 * color controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::color.color", ({ strapi }) => ({
  async incViews(ctx) {
    const { documentId } = ctx.params;

    const knex = strapi.db.connection("colors");

    return knex.where("document_id", documentId).increment("views", 1);
  },
}));

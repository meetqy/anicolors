/**
 * tool controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::tool.tool", ({ strapi }) => ({
  async incViews(ctx) {
    const { documentId } = ctx.params;

    const knex = strapi.db.connection("tools");

    return knex.where("document_id", documentId).increment("views", 1);
  },
}));

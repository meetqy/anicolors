/**
 * palette controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::palette.palette", ({ strapi }) => ({
  async toggleLike(ctx) {
    const { documentId } = ctx.params;

    const palette = await strapi.db.query("api::palette.palette").findOne({
      where: { documentId },
    });

    if (!palette) {
      return ctx.notFound("Palette not found");
    }

    const result = await strapi.db.query("api::palette.palette").update({
      where: { documentId },
      data: {
        likes: palette.likes + 1,
      },
    });

    return result;
  },
}));

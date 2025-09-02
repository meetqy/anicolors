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

  async randomList(ctx) {
    const query = ctx.query as { pageSize: string };
    const pageSize = Number(query.pageSize || 10);

    const count = await strapi.db.query("api::palette.palette").count({
      where: {
        publishedAt: { $notNull: true },
      },
    });

    const allPages = Math.ceil(count / pageSize);

    const offset = Math.floor(Math.random() * allPages);

    const palettes = await strapi.db.query("api::palette.palette").findMany({
      offset: offset * pageSize,
      limit: pageSize,
      populate: {
        image: true,
      },
    });

    return {
      nodes: palettes.map((e) => {
        e.image = e.image && {
          url: e.image.url,
        };

        delete e.extend;

        return {
          ...e,
        };
      }),
      pageInfo: {
        total: count,
      },
    };
  },
}));

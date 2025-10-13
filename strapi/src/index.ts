import type { Core } from "@strapi/strapi";
import colornames from "./colornames.json";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.server.use(async (ctx, next) => {
      if (ctx.req?.socket) {
        (ctx.req.socket as any).encrypted = true;
      }
      await next();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if ((await strapi.db.query("api::color.color").count()) > 0) {
      return;
    }
    colornames.map((e) => {
      {
        strapi.db.query("api::color.color").create({
          data: { name: e.name },
        });
      }
    });
  },
};

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::topic.topic", ({ strapi }) => ({
  async toggleLike(ctx) {
    // action can be "like" or "unlike"
    const { id, action = "like" } = ctx.params;

    const topic = await strapi.db.query("api::topic.topic").findOne({
      where: { id },
    });

    if (!topic) {
      return ctx.notFound("Topic not found");
    }

    // Update the like count based on the action

    await strapi.db.query("api::topic.topic").update({
      where: { id },
      data: { like: action === "like" ? topic.like + 1 : Math.max(topic.like - 1, 0) },
    });

    ctx.body = topic;
  },
}));

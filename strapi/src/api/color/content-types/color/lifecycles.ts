import slugify from "slugify";

export default {
  async afterFindMany(event) {
    const { result } = event;

    // views 为空时，更新为 0
    result
      .filter((item) => item.views === null || item.slug === null)
      .forEach((item) => {
        strapi.db.query("api::color.color").update({
          where: { id: item.id },
          data: {
            views: item.views || 0,
            slug: slugify(item.name, {
              lower: true,
              strict: true,
            }),
          },
        });
      });
  },
};

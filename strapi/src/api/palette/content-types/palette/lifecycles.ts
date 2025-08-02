const syncCategory = async (event) => {
  const categoryExtend = event.params.data.categoryExtend;
  const categoryId = categoryExtend?.connect?.[0]?.id;
  if (categoryId) {
    const category = await strapi.db.query("api::category.category").findOne({
      where: { id: categoryId },
    });
    event.params.data.category = category.name;
  }
};

const connectColorName = async (event) => {
  const { data, where } = event.params;
  if (!where.id) return;

  let { points } = data;
  if (!points) return;
  if (typeof points === "string") {
    points = JSON.parse(points);
  }

  const palette = await strapi.db.query("api::palette.palette").findOne({
    where: { id: where.id },
    populate: { colors: true },
  });

  if (!palette) return;
  if (palette.colors.length > 0) return;

  const names = points.map((item) => item.name);
  const colorList = await strapi.db.query("api::color.color").findMany({
    where: { name: { $in: names } },
  });

  event.params.data.colors = {
    connect: colorList.map((item) => item.id),
  };
};

export default {
  async beforeCreate(event) {
    await Promise.all([connectColorName(event), syncCategory(event)]);
  },

  async beforeUpdate(event) {
    await Promise.all([connectColorName(event), syncCategory(event)]);
  },
};

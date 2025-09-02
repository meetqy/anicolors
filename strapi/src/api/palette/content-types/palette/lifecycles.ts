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

const updateColorName = async (points, id) => {
  if (!points) return;

  const names = points.map((item) => item.name);
  const colorList = await strapi.db.query("api::color.color").findMany({
    where: { name: { $in: names } },
  });

  strapi.db.query("api::palette.palette").update({
    where: { id },
    data: {
      colors: {
        connect: colorList.map((item) => item.id),
      },
    },
  });
};

// 如果没有 ColorName 关联
// 可以通过 Unpublish 然后 Publish 来触发更新
export default {
  async beforeCreate(event) {
    await Promise.all([connectColorName(event), syncCategory(event)]);
  },

  async afterFindOne(event) {
    const { result } = event;
    if (result.points) {
      await strapi.db.connection("palettes").where("id", result.id).increment("views", 1);
    }
  },

  async beforeUpdate(event) {
    await Promise.all([connectColorName(event), syncCategory(event)]);
  },

  async afterFindMany(event) {
    const { result, params } = event;

    if (params.limit > 0) {
      // 如果没有关联颜色
      result.forEach((item) => {
        if (!item.colors || item.colors.count === 0) {
          updateColorName(item.points, item.id);
        }
      });
    }
  },
};

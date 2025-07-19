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

export default {
  async beforeCreate(event) {
    await syncCategory(event);
  },

  async beforeUpdate(event) {
    await syncCategory(event);
  },
};

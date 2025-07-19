const syncCategory = async (event) => {
  const { connect } = event.params.data.categoryExtend;
  const categoryId = connect?.[0]?.id;

  if (!categoryId) {
    return;
  }

  const category = await strapi.db.query("api::category.category").findOne({
    where: { id: categoryId },
  });
  event.params.data.category = category.name;
};

export default {
  async beforeCreate(event) {
    await syncCategory(event);
  },

  async beforeUpdate(event) {
    await syncCategory(event);
  },
};

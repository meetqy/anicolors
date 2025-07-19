export default {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    console.log("beforeCreate", event.params);

    // event.params.data.category =

    // let's do a 20% discount everytime
    // event.params.data.price = event.params.data.price * 0.8;
  },

  async beforeUpdate(event) {
    const { connect } = event.params.data.categoryExtend;
    const categoryId = connect[0].id;

    if (!categoryId) {
      return;
    }

    const category = await strapi.db.query("api::category.category").findOne({
      where: { id: categoryId },
    });
    event.params.data.category = category.name;
  },
};

export default {
  async afterFindOne(event) {
    const { result, params } = event;

    strapi.db.query("api::category.category").update({
      where: { documentId: params.where.documentId },
      data: {
        views: (result.views || 0) + 1,
      },
    });
  },
};

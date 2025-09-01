export default {
  async afterFindOne(event) {
    const { result, params } = event;
    if (!result) return;

    strapi.db.query("api::tool.tool").update({
      where: { documentId: params.where.documentId },
      data: {
        views: (result.views || 0) + 1,
      },
    });
  },
};

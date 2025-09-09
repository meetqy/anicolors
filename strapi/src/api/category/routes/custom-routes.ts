export default {
  routes: [
    {
      method: "GET",
      path: "/categories/:documentId/incViews",
      handler: "api::category.category.incViews",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};

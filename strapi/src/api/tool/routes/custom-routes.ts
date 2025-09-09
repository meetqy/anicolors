export default {
  routes: [
    {
      method: "GET",
      path: "/tools/:documentId/incViews",
      handler: "api::tool.tool.incViews",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};

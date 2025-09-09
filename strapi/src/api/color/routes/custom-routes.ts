export default {
  routes: [
    {
      method: "GET",
      path: "/colors/:documentId/incViews",
      handler: "api::color.color.incViews",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};

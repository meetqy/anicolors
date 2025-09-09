export default {
  routes: [
    {
      method: "GET",
      path: "/blogs/:documentId/incViews",
      handler: "api::blog.blog.incViews",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};

export default {
  routes: [
    {
      method: "POST",
      path: "/palettes/:documentId/toggleLike",
      handler: "api::palette.palette.toggleLike",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/palettes/:documentId/incViews",
      handler: "api::palette.palette.incViews",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/palettes/randomList",
      handler: "api::palette.palette.randomList",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};

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
  ],
};

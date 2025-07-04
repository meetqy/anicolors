export default {
  routes: [
    {
      method: "PUT",
      path: "/topic/:id/toggle-like", // Custom path
      handler: "topic.toggleLike", // Maps to the toggleLike method in the controller
      config: {
        auth: false, // Make this endpoint accessible without authentication
        policies: [], // You can add policies here if needed
      },
    },
  ],
};

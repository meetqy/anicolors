export default ({ env }) => [
  "strapi::logger",
  "strapi::errors",
  env("NODE_ENV") === "production"
    ? {
        name: "strapi::security",
        config: {
          contentSecurityPolicy: {
            useDefaults: true,
            directives: {
              "connect-src": ["'self'", "https:"],
              "img-src": ["'self'", "data:", "blob:", "market-assets.strapi.io", env("CF_PUBLIC_ACCESS_URL") ? env("CF_PUBLIC_ACCESS_URL").replace(/^https?:\/\//, "") : ""],
              "media-src": ["'self'", "data:", "blob:", "market-assets.strapi.io", env("CF_PUBLIC_ACCESS_URL") ? env("CF_PUBLIC_ACCESS_URL").replace(/^https?:\/\//, "") : ""],
              upgradeInsecureRequests: null,
            },
          },
        },
      }
    : "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

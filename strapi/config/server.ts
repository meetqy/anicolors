export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  url: env("PUBLIC_URL", "http://localhost:1337"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
    sessions: {
      secure: true,
    },
  },
  proxy: { koa: true },
});

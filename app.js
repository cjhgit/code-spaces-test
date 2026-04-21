const Koa = require("koa");
const Router = require("@koa/router");

function createApp() {
  const app = new Koa();
  const router = new Router();

  router.get("/", (ctx) => {
    ctx.body = "dev container test project";
  });

  router.get("/hello", (ctx) => {
    ctx.body = { message: "hello" };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
  return app;
}

module.exports = { createApp };


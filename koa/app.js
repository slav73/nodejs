const Koa = require("koa");
const app = new Koa();
const static = require("koa-static");
const fs = require("fs");
const session = require("koa-session");
const config = require("./config/config.json");

const Pug = require("koa-pug");
const pug = new Pug({
  viewPath: "./views",
  pretty: false,
  basedir: "./views",
  noCache: true,
  app: app // equals to pug.use(app) and app.use(pug.middleware)
});

app.use(static("./public"));
const router = require("./routes");

app
  .use(session(config.session, app))
  .use(router.routes())
  .use(router.allowedMethods());

const errorHandler = require("./libs/error");

app.use(errorHandler);
app.on("error", (err, ctx) => {
  ctx.render("error", {
    status: ctx.response.status,
    error: ctx.response.message
  });
});

app.listen(3000, () => {
  if (!fs.existsSync(config.upload)) {
    fs.mkdirSync(config.upload);
  }
});

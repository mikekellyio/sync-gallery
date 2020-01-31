const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/api",
    proxy({
      target: "http://localhost:8999",
      changeOrigin: true
      //ws: true
    })
  );
  app.use(
    "/api/ws",
    proxy({
      target: "http://localhost:8999",
      changeOrigin: true,
      ws: true
    })
  );
};

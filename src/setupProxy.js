const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'http://10.40.24.140:8080',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api/": "/",
      },
      logLevel: "debug",
    })
  );
};

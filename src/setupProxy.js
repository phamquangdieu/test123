const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'https://gateway-dev.dhomes.com.vn',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api/": "/",
      },
      logLevel: "debug",
    })
  );
};

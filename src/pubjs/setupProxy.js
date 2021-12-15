// package.json   "proxy": "http://localhost",

const {
  createProxyMiddleware
} = require('http-proxy-middleware'); //跨域
module.exports = function(app) {
  app.use(
    '/main',
    createProxyMiddleware({
      // target: 'http://8.142.172.39:80',
      target: 'http://localhost:80',
      changeOrigin: true,
      pathRewrite: {
        '^/main': '' // 这样处理后，最终得到的接口路径为： http://localhost:8080/xxx
      }
    })
  );
};
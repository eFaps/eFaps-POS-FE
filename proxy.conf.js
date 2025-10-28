var defaultTarget = "http://localhost:8080";

var proxyConf = (proxy, options) => {
  proxy.on("error", (err, _req, _res) => {
    console.log("proxy error", err);
  });
  proxy.on("proxyReq", (proxyReq, req, _res) => {
    const headers = proxyReq.getHeaders();
    //console.log(_options);
    console.log(
      req.method,
      req.url,
      " -> ",
      `${options.target}${proxyReq.path}`,
    );
  });
  proxy.on("proxyRes", (proxyRes, req, _res) => {
    console.log(
      req.method,
      "Target Response",
      proxyRes.statusCode,
      ":",
      req.url,
    );
  });
}

PROXY_CONF = [
  {
    context: ["/api/**"],
    target: defaultTarget,
    secure: false,
    logLevel: 'debug',
    configure: proxyConf
  },
  {
    context: ["/socket/*"],
    target: defaultTarget,
    secure: false,
    logLevel: 'debug',
    configure: proxyConf
  },
   {
    context: ["/extensions/*"],
    target: "http://localhost:4201/",
    secure: false,
    logLevel: 'debug',
    configure: proxyConf,
    pathRewrite: {
      ".*": "main.js"
    },
  }
];

module.exports = PROXY_CONF;    
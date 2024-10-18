var defaultTarget = "http://localhost:8080";

var proxyConf = (proxy, _options) => {
  proxy.on("error", (err, _req, _res) => {
    console.log("proxy error", err);
  });
  proxy.on("proxyReq", (proxyReq, req, _res) => {
    const headers = proxyReq.getHeaders();
    //console.log(headers);
    console.log(
      req.method,
      req.url,
      " -> ",
      `${defaultTarget}${proxyReq.path}`,
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
  }
];

module.exports = PROXY_CONF;    
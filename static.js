const express = require("express");
const serveStatic = require("serve-static");
const helmet = require('helmet');
const path = require("path");
const app = express();
app.use(helmet());
app.disable('x-powered-by');
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
app.use("/", serveStatic(path.join(__dirname, "/dist")));
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
  console.log(`app corriendo en el puerto: ${app.get("port")}`);
});

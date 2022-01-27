const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();
app.use("/", serveStatic(path.join(__dirname, "/dist")));
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () => {
  console.log(`app corriendo en el puerto: ${app.get("port")}`);
});

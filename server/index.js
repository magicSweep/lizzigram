const express = require("express");
const path = require("path");
const { makeCspHeader } = require("./csp");

const app = express();
const port = 8080;

const staticFolder = path.join(__dirname, "..", "dist");
//const indexHtml = path.join(__dirname, "..", "dist", "index.html");

const cspHeader = makeCspHeader();

app.use((req, res, next) => {
  res.append("x-xss-protection", "1; mode=block");
  res.append(
    "strict-transport-security",
    "max-age=31536000; includeSubDomains"
  );
  res.append("X-Frame-Options", "DENY");
  res.append("X-Content-Type-Options", "nosniff");
  res.append(
    "Feature-Policy",
    "geolocation 'none' ; camera 'none'; payment 'none'; sync-xhr 'none';"
  );
  res.append("Content-Security-Policy-Report-Only", cspHeader[1]);

  next();
});

app.use(express.static(staticFolder));

/* app.get("/", (req, res) => {
  res.status(200).send();
}); */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

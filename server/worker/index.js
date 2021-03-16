const express = require("express");
const path = require("path");
const cors = require("cors");
const wait = require("waait");

const app = express();
const port = 3009;

//const fs = require("fs");

//const indexHtml = path.join(__dirname, "..", "dist", "index.html");

// CORS
app.use(
  cors({
    origin: [
      "http://192.168.1.82:8080",
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "https://lizzygram.netlify.app",
    ],
    methods: "POST,OPTIONS",
  })
);

app.use((req, res, next) => {
  // CONTENT SECURITY HEADERS
  //res.append("x-xss-protection", "1; mode=block");

  next();
});

/* export const herokuPingUrl = `${expressUrl}/sleep_q23we4rt5`;

export const addPhotoUrl = `${expressUrl}/add-photo`;
export const editPhotoUrl = `${expressUrl}/edit-photo`;
// download/:photoId
export const downloadPhotoUrl = `${expressUrl}/download`; */

app.get("/sleep_q23we4rt5", (req, res, next) => {
  const date = new Date();
  res.status(200).send("Not Authorized...");
});

app.post("/add-photo", async (req, res, next) => {
  console.log("add-photo");
  await wait(3000);
  res.status(200).json({
    status: "success",
    data: {},
  });

  /*  res.status(200).json({
    status: "error",
    data: {
      error: message,
    },
  }); */
});

app.post("/edit-photo", async (req, res, next) => {
  console.log("edit-photo");
  await wait(3000);
  res.status(200).json({
    status: "success",
    data: {},
  });
});

app.get("/download", function (req, res, next) {
  res.end("Not implemented");
});

/* app.get("/", (req, res) => {
  res.status(200).send();
}); */

app.use((err, req, res, next) => {
  console.log(`[GLOBAL_ERROR_HANDLER] ${err.message}`);

  const json = {
    status: "error",
    data: {
      error: err.message,
    },
  };

  res.status(200).json(json).end();

  return app;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

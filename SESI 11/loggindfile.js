const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const logFile = path.join(__dirname, "access.log");

// Middleware logging ke file
const logger = (req, res, next) => {
  const time = new Date().toISOString();
  const log = `${time} ${req.method} ${req.url}`;

  fs.appendFile(logFile, log, (err) => {
    if (err) console.error("Gagal menulis log:", err);
  });

  next();
};

app.use(logger);

app.get("/", (req, res) => {
  res.send("Log middleware menulis ke access.log");
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));

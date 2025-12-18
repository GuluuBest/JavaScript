const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Halo, dunia dari Express.js!");
});

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});

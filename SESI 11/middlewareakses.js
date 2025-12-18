const express = require("express");
const app = express();

// Middleware pembatasan akses
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== "SECRET123") {
    return res.status(403).json({
      message: "Akses ditolak! API Key salah atau tidak ada.",
    });
  }

  next();
};

app.get("/dashboard", apiKeyMiddleware, (req, res) => {
  res.send("Selamat datang di Dashboard!");
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));

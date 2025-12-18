const express = require("express");
const app = express();

// Middleware 1
const mw1 = (req, res, next) => {
  console.log("Middleware 1 dijalankan");
  next(); // lanjut ke middleware berikutnya
};

// Middleware 2
const mw2 = (req, res, next) => {
  console.log("Middleware 2 dijalankan");
  next(); // lanjut ke middleware berikutnya
};

// Middleware 3
const mw3 = (req, res, next) => {
  console.log("Middleware 3 dijalankan");
  next(); // lanjut ke route handler
};

app.get("/", mw1, mw2, mw3, (req, res) => {
  res.send("Sukses! Semua middleware sudah dijalankan.");
});

app.get("/daftar", (req, res) => {
  res.send(`<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Halaman Utama</title></head>
  <body>
    <h1>Sukses! Semua middleware sudah dijalankan.</h1>
    <button id="euy">Pencet meh Ganteng</button>
    <script>
      document.getElementById('euy').addEventListener('click', () => {
        // pindah ke /daftar saat tombol diklik
        window.location.href = '/daftar';
      });
    </script>
  </body>
</html>`);
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));

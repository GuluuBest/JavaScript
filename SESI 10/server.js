const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// =======================
// KONEKSI DATABASE
// =======================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pbp10",
});

db.connect((err) => {
  if (err) {
    console.error("Gagal konek ke database:", err);
    return;
  }
  console.log("Database connected.");
});

// =======================
// ENDPOINT BUKU
// =======================

// GET semua buku / cari buku
app.get("/buku", (req, res) => {
  const { judul } = req.query;

  if (!judul) {
    db.query("SELECT * FROM buku", (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  } else {
    db.query(
      "SELECT * FROM buku WHERE judul LIKE ?",
      [`%${judul}%`],
      (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
      }
    );
  }
});

// POST tambah buku
app.post("/buku", (req, res) => {
  const { judul, stok } = req.body;

  if (!judul || stok == null) {
    return res.status(400).json({ message: "Judul dan stok wajib diisi" });
  }

  db.query(
    "INSERT INTO buku (judul, stok) VALUES (?, ?)",
    [judul, stok],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "Buku berhasil ditambahkan",
        data: { id: result.insertId, judul, stok },
      });
    }
  );
});

// PUT update stok
app.put("/buku/:id", (req, res) => {
  const { stok } = req.body;
  const { id } = req.params;

  db.query("UPDATE buku SET stok = ? WHERE id = ?", [stok, id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({
      message: "Stok buku berhasil diperbarui",
      data: { id, stok },
    });
  });
});

// =======================
// ENDPOINT PESANAN
// =======================

// JOIN PESANAN + BUKU
app.get("/pesanan", (req, res) => {
  const sql = `
    SELECT 
      pesanan.id,
      pesanan.bukuid,
      pesanan.jumlah,
      pesanan.status,
      buku.judul AS judul_buku,
      buku.stok AS stok_buku
    FROM pesanan
    LEFT JOIN buku ON buku.id = pesanan.bukuid
    ORDER BY pesanan.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    console.log("HASIL JOIN:", results);

    res.json(results);
  });
});

// POST buat pesanan
app.post("/pesanan", (req, res) => {
  const { bukuid, jumlah } = req.body;

  if (!bukuid || !jumlah) {
    return res.status(400).json({ message: "Buku ID dan jumlah wajib diisi" });
  }

  const status = "pending";

  db.query(
    "INSERT INTO pesanan (bukuid, jumlah, status) VALUES (?, ?, ?)",
    [bukuid, jumlah, status],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "Pesanan dibuat (pending)",
        data: {
          id: result.insertId,
          bukuid,
          jumlah,
          status,
        },
      });
    }
  );
});

// PUT konfirmasi pesanan
app.put("/pesanan/:id/konfirmasi", (req, res) => {
  const { id } = req.params;

  db.query("UPDATE pesanan SET status='confirmed' WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({
      message: "Pesanan berhasil dikonfirmasi",
      id,
    });
  });
});

// =======================
// SERVER HARUS PALING BAWAH
// =======================
app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});

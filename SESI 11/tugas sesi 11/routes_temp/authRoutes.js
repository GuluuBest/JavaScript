const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// SIMPAN USER DI MEMORY
const users = [];

/**
 * REGISTER
 * POST /register
 */
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  // cek email sudah ada
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email sudah terdaftar" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.json({ message: "Register berhasil" });
});

/**
 * LOGIN
 * POST /login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "User tidak ditemukan" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Password salah" });
  }

  // GENERATE TOKEN
  const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;

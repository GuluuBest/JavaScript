function buatKoneksi(config) {
  const { host, port, user, password } = config;
  console.log(`Menghubungkan ke ${user}@${host}:${port}`);
}

buatKoneksi({
  host: "Localhost",
  port: 3306,
  user: "admin",
  password: "rahasia",
});

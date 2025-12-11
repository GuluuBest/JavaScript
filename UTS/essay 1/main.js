// File: main.js

import { kategoriNilai, hitungRataRata } from "./nilai.js";

const mahasiswa = [
  { nama: "Andi", nilai: 90 },
  { nama: "Budi", nilai: 75 },
  { nama: "Citra", nilai: 60 },
  { nama: "Dinda", nilai: 40 },
];

console.log("=== Data Nilai Mahasiswa ===");

for (const mhs of mahasiswa) {
  const kategori = kategoriNilai(mhs.nilai);
  console.log(`${mhs.nama} - Nilai: ${mhs.nilai} - Kategori: ${kategori}`);
}

const semuaNilai = mahasiswa.map((mhs) => mhs.nilai);
const rataRata = hitungRataRata(semuaNilai);

console.log(`Rata-rata Kelas = ${rataRata}`);

let matematika = 85;
let english = 90;
let ipa = 78;

let nilairatarata = (matematika + english + ipa) / 3;

console.log(`Nilai rata rata siswa: ${nilairatarata}`);
console.log(`Tipe data dari Nilai rata rata: ${typeof nilairatarata}`);

let statuskelulusan;
if (nilairatarata >= 80) {
  statuskelulusan = "Lulus";
} else {
  statuskelulusan = "Tidak Lulus";
}

console.log(`Status kelulusan siswa: ${statuskelulusan}`);

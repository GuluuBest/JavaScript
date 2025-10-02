const readline = require("readline");

function hitungTotalBayar(totalBelanja) {
  let diskon = 0;
  let keteranganDiskon = "Tidak ada diskon";

  if (totalBelanja > 1000000) {
    diskon = 0.15;
    keteranganDiskon = "Diskon 15%";
  } else if (totalBelanja > 500000) {
    diskon = 0.1;
    keteranganDiskon = "Diskon 10%";
  }

  const jumlahDiskon = totalBelanja * diskon;
  const hargaAkhir = totalBelanja - jumlahDiskon;

  return {
    totalBelanja: totalBelanja,
    keterangan: keteranganDiskon,
    jumlahDiskon: jumlahDiskon,
    totalBayar: hargaAkhir,
  };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan total belanja Anda: Rp", (inputBelanja) => {
  const totalBelanja = parseFloat(inputBelanja);

  if (isNaN(totalBelanja)) {
    console.log("Input tidak valid. Harap masukkan angka yang benar.");
  } else {
    const transaksi = hitungTotalBayar(totalBelanja);

    console.log(`Total Belanja : Rp${transaksi.totalBelanja}`);
    console.log(`Keterangan    : ${transaksi.keterangan}`);
    console.log(`Potongan Harga: Rp${transaksi.jumlahDiskon}`);
    console.log(`Total Bayar   : Rp${transaksi.totalBayar}`);
  }

  rl.close();
});

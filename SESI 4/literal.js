function buatPemain(nama, skor) {
  return {
    nama,
    skor,
    tambahSkor(poin) {
      this.skor += poin;
    },
  };
}

const pemain1 = buatPemain("Ridho", 50);
pemain1.tambahSkor(10);
console.log(pemain1.skor);

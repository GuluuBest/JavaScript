const karyawan = {
  namaLengkap: "Alex Chandra",
  jabatan: "Web Developer",
  aktif: true,
  tahunBergabung: 2022,

  sapa: function () {
    return "Halo Saya " + this.namaLengkap + ", " + this.jabatan + ".";
  },

  masaKerja(tahunSekarang) {
    return tahunSekarang - this.tahunBergabung;
  },
};

const { namaLengkap, jabatan } = karyawan;
console.log(namaLengkap);
console.log(jabatan);

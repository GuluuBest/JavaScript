const mobil = {
  merek: "Honda",
  tahun: 2020,
};

mobil.tahun = 2024;
console.log(mobil.tahun);

let kunciMerek = "merek";
mobil[kunciMerek] = "Toyota";
console.log(mobil.merek);

const userProfile = {
  firstname: "Ridho",
  lastname: "Ramadhan",
  age: 21,
  email: "ridho@gmail.com",
  isActive: true,

  getFullName: function () {
    return this.firstname + " " + this.lastname;
  },

  great() {
    return "Halo, saya " + this.getFullName() + ".";
  },
};

console.log("Nama Lengkap:", userProfile.getFullName());
console.log("Usia:", userProfile.age);
console.log("Status Aktif:", userProfile["isActive"]);
console.log(userProfile.great());

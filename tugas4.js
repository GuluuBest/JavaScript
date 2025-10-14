const film = {
  judul: "Interstellar",
  tahunRilis: 2024,
  sutradara: "Christopher Nolan",
  genre: ["Sci-Fi", "Adventure", "Drama"],

  tampilkanDetail: function () {
    const daftarGenre = this.genre.join(", ");
    return `${this.judul} (${this.tahunRilis}) ${this.sutradara} Genre: ${daftarGenre}`;
  },
};

console.log("Sutradara:", film.sutradara);
console.log("Genre ke 2:", film.genre[1]);
console.log("Detail Film:", film.tampilkanDetail());

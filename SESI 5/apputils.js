import { formatRupiah, capitalize } from "./utils.js";

const harga = 150000;
const namaProduk = "laptop asus";

console.log(`Harga: ${formatRupiah(harga)}`);
console.log(`Nama Produk: ${capitalize(namaProduk)}`);

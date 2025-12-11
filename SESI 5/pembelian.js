import { hitungDiskon, hitungPajak } from "./calculator.js";

const hargaAwal = 1000;

const hargaSetelahDiskon = hitungDiskon(hargaAwal, 10);
console.log(`harga setelah diskon 10%: ${hargaSetelahDiskon}`);

const hargaAkhir = hitungPajak(hargaSetelahDiskon, 5);
console.log(`harga setelah pajak 5%: ${hargaAkhir}`);

hitungDiskon("SEribu", 10);

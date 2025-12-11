function sanitizeInput(value) {
  if (typeof value !== "number") {
    throw new Error("input harus berupa angka!.");
  }
  return value;
}

export function hitungDiskon(harga, persenDiskon) {
  try {
    const h = sanitizeInput(harga);
    const p = sanitizeInput(persenDiskon);
    return h - (h * p) / 100;
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

export function hitungPajak(harga, persenPajak) {
  const h = sanitizeInput(harga);
  const p = sanitizeInput(persenPajak);
  return h + (h * p) / 100;
}

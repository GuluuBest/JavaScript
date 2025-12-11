const API = "http://localhost:3000";

function showError(msg) {
  console.error(msg);
  document.getElementById("listBuku").innerText = "Error: " + msg;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerHTML = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

async function loadBuku() {
  const listEl = document.getElementById("listBuku");
  listEl.innerText = "Loading...";

  try {
    const res = await fetch(API + "/buku");
    if (!res.ok) throw new Error("Gagal ambil data: " + res.status);
    const data = await res.json();

    tampilkanBuku(data);
  } catch (err) {
    showError(err.message || err);
  }
}

function tampilkanBuku(data) {
  let html = "";

  data.forEach((b) => {
    html += `
      <div class="book">
        <b>${b.judul}</b><br>
        Stok: <span id="stok-${b.id}">${b.stok}</span><br>

        <input type="number" id="update-${b.id}" placeholder="Stok baru" style="width:80px;">
        <button onclick="updateStok(${b.id})">Update</button>
      </div>
    `;
  });

  document.getElementById("listBuku").innerHTML = html || "Belum ada buku.";
}

function updateStok(id) {
  const stokBaru = document.getElementById("update-" + id).value;

  if (stokBaru === "") {
    return showToast("Isi stok baru dulu anjing");
  }

  fetch(API + "/buku/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stok: Number(stokBaru) }),
  })
    .then((res) => res.json())
    .then((res) => {
      showToast(res.message);
      loadBuku();
    });
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function tambahBuku() {
  const judulEl = document.getElementById("judul");
  const stokEl = document.getElementById("stok");
  const judul = judulEl.value.trim();
  const stok = Number(stokEl.value);

  if (!judul) {
    showToast("Isi judul dulu.");
    return;
  }
  if (!Number.isFinite(stok) || stok < 0) {
    showToast("Isi stok valid (>=0).");
    return;
  }

  try {
    const res = await fetch(API + "/buku", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, stok }),
    });

    const payload = await res.json();

    if (!res.ok) {
      showToast("Gagal: " + (payload.message || JSON.stringify(payload)));
      console.error("POST /buku error:", payload);
      return;
    }

    showToast(payload.message || "Buku ditambahkan");
    judulEl.value = "";
    stokEl.value = "";

    await loadBuku();
  } catch (err) {
    showError(err.message || err);
    showToast("Terjadi kesalahan saat menambahkan buku. Cek console/server.");
  }
}

async function cariBuku() {
  const q = document.getElementById("cari").value.trim();

  if (!q) {
    await loadBuku();
    return;
  }

  try {
    const res = await fetch(API + "/buku?judul=" + encodeURIComponent(q));
    if (!res.ok) throw new Error("Gagal cari: " + res.status);
    const data = await res.json();
    tampilkanBuku(data);
  } catch (err) {
    showError(err.message || err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadBuku();
  const inputCari = document.getElementById("cari");
  if (inputCari) {
    inputCari.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        cariBuku();
      }
    });
  }

  const btnSearch = document.getElementById("btnSearch");
  if (btnSearch) btnSearch.addEventListener("click", cariBuku);
});

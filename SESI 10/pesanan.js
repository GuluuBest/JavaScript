const API = "http://localhost:3000";

// ==== TOAST ====
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerHTML = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ==============================
// BUAT PESANAN (status pending)
// ==============================
function buatPesanan() {
  const bukuid = document.getElementById("buku_id").value.trim();
  const jumlah = document.getElementById("jumlah").value.trim();

  console.log("DEBUG bukuid:", bukuid);
  console.log("DEBUG jumlah:", jumlah);

  if (bukuid === "" || jumlah === "") {
    showToast("ID buku dan jumlah wajib diisi");
    return;
  }

  fetch(API + "/pesanan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bukuid: Number(bukuid),
      jumlah: Number(jumlah),
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      showToast(res.message);
      loadPesanan();
    });
}

// ==============================
// LOAD PESANAN
// ==============================
function loadPesanan() {
  fetch(API + "/pesanan")
    .then((res) => res.json())
    .then((data) => {
      let html = "";

      data.forEach((p) => {
        html += `
        <div class="pesanan">
          <b>ID Pesanan: ${p.id}</b><br>
          ID Buku: ${p.bukuid}<br>
          Judul Buku: <b>${p.judul_buku ?? "-"}</b><br>
          Stok Buku: ${p.stok_buku ?? "-"}<br>
          Jumlah Dipesan: ${p.jumlah}<br>
          Status: <span class="${p.status}">${p.status}</span><br>

          ${
            p.status === "pending"
              ? `<button onclick="konfirmasi(${p.id})">Konfirmasi</button>`
              : ""
          }
        </div>
        `;
      });

      document.getElementById("listPesanan").innerHTML =
        html || "Belum ada pesanan.";
    });
}

// ==============================
// KONFIRMASI PESANAN
// ==============================
function konfirmasi(id) {
  fetch(API + `/pesanan/${id}/konfirmasi`, {
    method: "PUT",
  })
    .then((res) => res.json())
    .then((res) => {
      showToast(res.message);
      loadPesanan();
    });
}

loadPesanan();

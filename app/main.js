// KantongKeluarga — semua hitungan jalan di browser, tanpa jaringan.
// Data contoh dari data.js; nilai yang diubah pengguna disimpan di localStorage.
(function () {
  "use strict";
  var D = window.KANTONG_DATA;
  var KUNCI = "kantongkeluarga-v1";

  function rp(n) {
    n = Math.round(Number(n) || 0);
    return "Rp" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function $(id) { return document.getElementById(id); }
  function val(id) { var e = $(id); return e ? (Number(e.value) || 0) : 0; }

  // ---- State kategori ----
  var state = {};
  D.kategori.forEach(function (k) { state[k.id] = k.nilai; });

  function totalBelanja() {
    var t = 0;
    D.kategori.forEach(function (k) { t += state[k.id] || 0; });
    return t;
  }
  function totalGrup(g) {
    var t = 0;
    D.kategori.forEach(function (k) { if (k.grup === g) t += state[k.id] || 0; });
    return t;
  }

  // ---- Render 12 kategori ----
  var list = $("kategoriList");
  D.kategori.forEach(function (k) {
    var div = document.createElement("div");
    div.className = "kat";
    div.innerHTML =
      '<div class="kat-head"><span></span><output></output></div>' +
      '<input type="range" min="0" max="' + k.maks + '" step="10000" value="' + k.nilai + '" aria-label="' + k.nama + '">' +
      '<div class="kat-sub"></div>';
    div.querySelector("span").textContent = k.nama;
    div.querySelector(".kat-sub").textContent = k.ket;
    var slider = div.querySelector("input");
    var out = div.querySelector("output");
    slider.addEventListener("input", function () {
      state[k.id] = Number(slider.value);
      out.textContent = rp(state[k.id]);
      hitung();
    });
    div._slider = slider; div._out = out;
    div.dataset.id = k.id;
    list.appendChild(div);
  });

  function syncKategori() {
    Array.prototype.forEach.call(list.children, function (div) {
      var id = div.dataset.id;
      div._slider.value = state[id];
      div._out.textContent = rp(state[id]);
    });
  }

  // ---- Hitung utama: sisa, donat, 50/30/20 ----
  function hitung() {
    var gaji = val("gaji");
    var total = totalBelanja();
    var sisa = gaji - total;
    $("sisaUang").textContent = rp(sisa);
    var v = $("verdict");
    if (sisa < 0) { v.textContent = "TEKOR " + rp(-sisa) + " — pengeluaran melebihi gaji, pangkas kategori kuning."; v.className = "bad"; }
    else if (sisa < gaji * 0.1) { v.textContent = "MePet — sisa di bawah 10% gaji. Dana darurat rawan jebol."; v.className = "warn"; }
    else { v.textContent = "AMAN — sisa " + Math.round(sisa / gaji * 100) + "% dari gaji. Sisihkan ke tabungan."; v.className = "ok"; }
    $("totalBelanja").textContent = rp(total);
    $("gajiTampil").textContent = rp(gaji);

    var b = totalGrup("butuh"), i = totalGrup("ingin"), t = totalGrup("tabung");
    var all = Math.max(total, 1);
    $("donut").style.background =
      "conic-gradient(#1b7a43 0 " + (b / all * 360) + "deg, #f2b705 " + (b / all * 360) + "deg " + ((b + i) / all * 360) + "deg, #e07b39 " + ((b + i) / all * 360) + "deg 360deg)";
    $("legend").innerHTML =
      "<li><span class='sw' style='background:#1b7a43'></span>Kebutuhan pokok — " + rp(b) + " (" + Math.round(b / all * 100) + "%)</li>" +
      "<li><span class='sw' style='background:#f2b705'></span>Keinginan / hiburan — " + rp(i) + " (" + Math.round(i / all * 100) + "%)</li>" +
      "<li><span class='sw' style='background:#e07b39'></span>Cicilan + tabungan — " + rp(t) + " (" + Math.round(t / all * 100) + "%)</li>";
    var pb = Math.min(b / Math.max(gaji, 1) * 100, 100), pi = Math.min(i / Math.max(gaji, 1) * 100, 100), pt = Math.min(t / Math.max(gaji, 1) * 100, 100);
    $("barButuh").style.width = pb + "%";
    $("barIngin").style.width = pi + "%";
    $("barTabung").style.width = pt + "%";
    $("teks503020").textContent = "Kebutuhan " + Math.round(pb) + "% (patokan 50%) · Keinginan " + Math.round(pi) +
      "% (patokan 30%) · Tabungan+cicilan " + Math.round(pt) + "% (patokan 20%). " +
      (pb > 55 ? "Kebutuhanmu di atas patokan — cek lauk dan transport dulu." : "Kebutuhanmu masih dalam patokan, bagus.");
    hitung30();
  }

  // ---- 8 kalkulator ----
  function hitungKalk() {
    var g = val("k1gaji");
    $("k1out").textContent = "Kebutuhan (50%): " + rp(g * 0.5) + " · Keinginan (30%): " + rp(g * 0.3) + " · Tabungan (20%): " + rp(g * 0.2) + ".";

    var target = val("k2keluar") * 6, punya = val("k2punya"), sisih = val("k2sisih");
    var kurang = Math.max(target - punya, 0);
    var bulan = sisih > 0 ? Math.ceil(kurang / sisih) : 0;
    $("k2out").textContent = "Target darurat 6 bulan: " + rp(target) + ". Kurang " + rp(kurang) +
      (sisih > 0 ? " — tercapai dalam " + bulan + " bulan kalau konsisten menyisihkan " + rp(sisih) + "/bulan." : " — isi sisihan per bulan dulu.");

    var pokok = Math.max(val("k3harga") - val("k3dp"), 0);
    var bungaTotal = pokok * (val("k3bunga") / 100) * (val("k3tenor") / 12);
    var cicilan = val("k3tenor") > 0 ? (pokok + bungaTotal) / val("k3tenor") : 0;
    $("k3out").textContent = "Cicilan: " + rp(cicilan) + "/bulan selama " + val("k3tenor") + " bulan. Total dibayar " +
      rp(pokok + bungaTotal) + " (bunga " + rp(bungaTotal) + ").";

    var perAnak = val("k4spp") + val("k4les") + val("k4seragam") / 6;
    var totalAnak = perAnak * val("k4anak");
    $("k4out").textContent = "Per anak: " + rp(perAnak) + "/bulan. Total " + val("k4anak") + " anak: " + rp(totalAnak) + "/bulan.";

    var tarif = { 450: 415, 900: 1352, 1300: 1444.7, 2200: 1444.7 }[val("k5daya")] || 1352;
    $("k5out").textContent = "Daya " + val("k5daya") + " VA, tarif Rp" + tarif.toLocaleString("id-ID") + "/kWh — estimasi tagihan: " +
      rp(val("k5kwh") * tarif) + "/bulan untuk " + val("k5kwh") + " kWh.";

    var sebulan = (val("k6hari") + val("k6jajan")) * 30;
    $("k6out").textContent = "Belanja harian sebulan: " + rp(sebulan) + ". Kalau jajan dipangkas setengah, hemat " + rp(val("k6jajan") * 15) + "/bulan.";

    var sisaTarget = Math.max(val("k7target") - val("k7punya"), 0);
    var bulanTabung = val("k7setor") > 0 ? Math.ceil(sisaTarget / val("k7setor")) : 0;
    $("k7out").textContent = sisaTarget <= 0 ? "Target sudah tercapai — selamat!" :
      "Kurang " + rp(sisaTarget) + " — tercapai dalam " + bulanTabung + " bulan dengan setoran " + rp(val("k7setor")) + "/bulan.";

    var sisaHarian = Math.max(val("k8gaji") - val("k8tetap"), 0);
    $("k8out").textContent = "Sisa setelah pengeluaran tetap: " + rp(sisaHarian) + " — uang harianmu " + rp(sisaHarian / 30) +
      "/hari selama 30 hari." + (sisaHarian <= 0 ? " Gaji habis untuk pengeluaran tetap — harus ada yang dipangkas." : "");
  }

  // ---- 5 skenario ----
  var btnWrap = $("skenarioBtns");
  D.skenario.forEach(function (s, idx) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = s.nama;
    b.addEventListener("click", function () { pilihSkenario(idx); });
    btnWrap.appendChild(b);
  });
  function pilihSkenario(idx) {
    var s = D.skenario[idx];
    Array.prototype.forEach.call(btnWrap.children, function (b, i) { b.classList.toggle("aktif", i === idx); });
    $("gaji").value = s.gaji;
    $("anggota").value = String(s.anggota);
    D.kategori.forEach(function (k) { state[k.id] = s.nilai[k.id] || 0; });
    syncKategori();
    $("skenarioJudul").textContent = "Skenario: " + s.nama;
    $("skenarioCerita").textContent = s.cerita;
    var total = totalBelanja();
    $("skenarioHasil").textContent = "Total belanja skenario ini: " + rp(total) + " — sisa " + rp(s.gaji - total) +
      " (" + Math.round((s.gaji - total) / s.gaji * 100) + "% dari gaji).";
    hitung(); hitungKalk();
  }

  // ---- Simulasi 30 hari ----
  // Modelnya jujur: pengeluaran tetap = total belanja MINUS dua pos harian
  // (lauk & sayur, hiburan & jajan) — sisanya adalah uang yang tersedia
  // untuk dibelanjakan harian selama 30 hari.
  function hitung30() {
    var harian = val("uangHarian");
    var tetap = totalBelanja() - (state.lauk || 0) - (state.hiburan || 0);
    var pool = Math.max(val("gaji") - tetap, 0);
    var saldo = pool;
    var saran = Math.floor(pool / 30);
    var tbody = document.querySelector("#tabel30 tbody");
    tbody.innerHTML = "";
    var hariHabis = 0;
    for (var d = 1; d <= 30; d++) {
      saldo -= harian;
      var tr = document.createElement("tr");
      var status = saldo >= 0 ? "Aman" : "HABIS";
      if (saldo < 0 && !hariHabis) hariHabis = d;
      if (saldo < 0) tr.className = "habis";
      tr.innerHTML = "<td>Hari " + d + "</td><td>" + rp(harian) + "</td><td>" + rp(Math.max(saldo, 0)) + "</td><td>" + status + "</td>";
      tbody.appendChild(tr);
    }
    var bar = $("progressBar");
    if (hariHabis) {
      bar.style.width = Math.round(hariHabis / 30 * 100) + "%";
      bar.style.background = "#c0392b";
      $("hariBertahan").textContent = "Uang harian habis di hari ke-" + hariHabis + " dari 30 (jatah 30 hari: " + rp(pool) +
        "). Kurangi belanja harian jadi " + rp(saran) + "/hari supaya cukup sebulan penuh.";
    } else {
      bar.style.width = "100%";
      bar.style.background = "#1b7a43";
      $("hariBertahan").textContent = "Bertahan penuh 30 hari. Sisa saldo di akhir bulan: " + rp(saldo) +
        " (jatah 30 hari: " + rp(pool) + ").";
    }
  }

  // ---- 10 tips ----
  var tipsList = $("tipsList");
  D.tips.forEach(function (t) {
    var li = document.createElement("li");
    var b = document.createElement("b"); b.textContent = t.judul + " — ";
    li.appendChild(b);
    li.appendChild(document.createTextNode(t.isi));
    tipsList.appendChild(li);
  });

  // ---- Simpan / reset (localStorage) ----
  $("btnSimpan").addEventListener("click", function () {
    try {
      localStorage.setItem(KUNCI, JSON.stringify({ gaji: val("gaji"), anggota: val("anggota"), state: state }));
      $("saveNote").textContent = "Tersimpan di browser ini.";
    } catch (e) { $("saveNote").textContent = "Tidak bisa menyimpan di browser ini."; }
  });
  $("btnReset").addEventListener("click", function () {
    try { localStorage.removeItem(KUNCI); } catch (e) {}
    $("gaji").value = 5000000; $("anggota").value = "4";
    D.kategori.forEach(function (k) { state[k.id] = k.nilai; });
    syncKategori(); hitung(); hitungKalk();
    $("saveNote").textContent = "Dikembalikan ke contoh awal.";
  });

  // ---- Muat simpanan ----
  try {
    var saved = JSON.parse(localStorage.getItem(KUNCI) || "null");
    if (saved) {
      if (saved.gaji) $("gaji").value = saved.gaji;
      if (saved.anggota) $("anggota").value = String(saved.anggota);
      if (saved.state) D.kategori.forEach(function (k) { if (typeof saved.state[k.id] === "number") state[k.id] = saved.state[k.id]; });
    }
  } catch (e) {}

  // ---- Wire semua input ----
  ["gaji", "anggota"].forEach(function (id) {
    $(id).addEventListener("input", hitung);
    $(id).addEventListener("change", hitung);
  });
  ["k1gaji", "k2keluar", "k2punya", "k2sisih", "k3harga", "k3dp", "k3tenor", "k3bunga",
   "k4spp", "k4seragam", "k4les", "k4anak", "k5daya", "k5kwh", "k6hari", "k6jajan",
   "k7target", "k7setor", "k7punya", "k8gaji", "k8tetap"].forEach(function (id) {
    var el = $(id); if (!el) return;
    el.addEventListener("input", hitungKalk);
    el.addEventListener("change", hitungKalk);
  });
  $("uangHarian").addEventListener("input", hitung30);

  // ---- Jalan pertama ----
  syncKategori();
  pilihSkenario(1);
  hitung(); hitungKalk();
})();

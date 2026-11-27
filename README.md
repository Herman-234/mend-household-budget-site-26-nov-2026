# KantongKeluarga — 12 Kategori, 8 Kalkulator, 5 Skenario, 30 Hari Bertahan

[![make.fun](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/Herman-234/mend-household-budget-site-26-nov-2026/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/Herman-234/mend-household-budget-site-26-nov-2026/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)

Situs anggaran rumah tangga untuk keluarga Indonesia — entri kompetisi
[Make the best household budget site](https://make.fun/bounty/best-household-budget-site-20261126-1457)
di make.fun. Satu halaman, statis, tanpa jaringan, jalan di desktop dan HP.

## Hook: Gaji UMR vs Biaya Hidup Nyata

Bukan sekadar form anggaran. Halaman ini menjawab satu pertanyaan tajam:
**gaji Rp3,85jt–Rp12jt cukup tidak untuk hidup sebulan?** — lengkap dengan
simulasi bertahan 30 hari yang menunjukkan di hari ke berapa uang habis,
dan berapa uang harian yang aman.

## Isi situs (12 Kategori, 8 Kalkulator, 5 Skenario, 30 Hari)

- **12 kategori belanja** dengan slider — beras & sembako, lauk harian,
  listrik & token, air & gas, transport, pulsa & internet, sekolah anak,
  kesehatan, cicilan, tabungan, dana darurat, hiburan — lengkap dengan
  donat pembagian anggaran dan patokan 50/30/20 yang dihitung langsung.
- **8 kalkulator**: anggaran 50/30/20, dana darurat, cicilan motor, biaya
  sekolah anak, listrik & token, belanja harian, tabungan target, dan
  simulasi 30 hari.
- **5 skenario gaji** sekali klik (UMR Bandung Rp3.850.000 s.d. Rp12.000.000,
  1–3 anak, ngontrak s.d. KPR) — anggarannya langsung terisi beserta cerita
  dan verdict tiap skenario.
- **Simulasi bertahan 30 hari**: tabel saldo harian + progress bar + saran
  uang harian yang aman supaya cukup sebulan penuh.
- **10 tips hemat** dengan angka nyata (rupiah per bulan yang dihemat).
- Semua nilai tersimpan di browser sendiri (localStorage); ada tombol
  Simpan Anggaran dan Reset ke Contoh. Tanpa akun, tanpa server.

## Menjalankan

Buka `app/index.html` langsung di browser, atau layani folder `app/`:

```sh
node serve.ts   # bila serve.ts tersedia, atau python3 -m http.server di app/
```

## Menyerahkan (program entri)

`main.ts` (Node 22, standard library) menyalin `app/` + `screenshots/` ke
direktori output dan menulis `dossier.json` dengan pustaka vendored
`vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Lisensi

MIT — lihat [LICENSE](LICENSE).

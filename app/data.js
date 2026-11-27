// Data KantongKeluarga: 12 kategori belanja, 5 skenario gaji, 10 tips hemat.
// Angka contoh memakai harga umum 2026. Semua angka bisa diubah pengguna.
window.KANTONG_DATA = {
  kategori: [
    { id: "sembako",  nama: "Beras & sembako",   grup: "butuh",  nilai: 800000,  maks: 2000000, ket: "Beras 20 kg, minyak, gula, telur" },
    { id: "lauk",     nama: "Lauk & sayur harian", grup: "butuh", nilai: 900000, maks: 2500000, ket: "Belanja pasar tiap pagi, Rp30rb/hari" },
    { id: "listrik",  nama: "Listrik & token",   grup: "butuh",  nilai: 250000,  maks: 1000000, ket: "Token 900 VA, kipas + kulkas + lampu" },
    { id: "airgas",   nama: "Air & gas",         grup: "butuh",  nilai: 150000,  maks: 600000,  ket: "Air PAM + 1 tabung gas 3 kg" },
    { id: "transport",nama: "Transport & bensin", grup: "butuh",  nilai: 400000,  maks: 1500000, ket: "Bensin motor + ongkos angkot" },
    { id: "pulsa",    nama: "Pulsa & internet",  grup: "butuh",  nilai: 200000,  maks: 800000,  ket: "Paket data 2 HP + WiFi rumah" },
    { id: "sekolah",  nama: "Sekolah anak",      grup: "butuh",  nilai: 500000,  maks: 3000000, ket: "SPP 2 anak + bekal + buku" },
    { id: "sehat",    nama: "Kesehatan & obat",  grup: "butuh",  nilai: 150000,  maks: 1000000, ket: "Vitamin, obat warung, BPJS" },
    { id: "cicilan",  nama: "Cicilan motor",     grup: "tabung", nilai: 600000,  maks: 3000000, ket: "Angsuran ke-8 dari 24 bulan" },
    { id: "tabungan", nama: "Tabungan",          grup: "tabung", nilai: 500000,  maks: 3000000, ket: "Disisihkan di awal gajian" },
    { id: "darurat",  nama: "Dana darurat",      grup: "tabung", nilai: 250000,  maks: 2000000, ket: "Target Rp12jt (3x pengeluaran)" },
    { id: "hiburan",  nama: "Hiburan & jajan",   grup: "ingin",  nilai: 300000,  maks: 1500000, ket: "Jajan anak, kopi, nonton sebulan sekali" }
  ],
  grupNama: { butuh: "Kebutuhan pokok", ingin: "Keinginan / hiburan", tabung: "Cicilan + tabungan" },
  grupWarna: { butuh: "#1b7a43", ingin: "#f2b705", tabung: "#e07b39" },
  skenario: [
    { nama: "UMR Bandung Rp3.850.000", gaji: 3850000, anggota: 4,
      cerita: "Buruh pabrik, istri di rumah, 2 anak SD. Ngontrak Rp600rb/bulan. Gaji pas-pasan: kebutuhan 78% dari gaji, tabungan cuma Rp100rb. Kuncinya: masak tiap hari dan tanpa cicilan baru.",
      nilai: { sembako: 700000, lauk: 750000, listrik: 200000, airgas: 120000, transport: 350000, pulsa: 120000, sekolah: 400000, sehat: 100000, cicilan: 0, tabungan: 100000, darurat: 50000, hiburan: 150000 } },
    { nama: "Gaji Rp5.000.000 — 1 anak", gaji: 5000000, anggota: 3,
      cerita: "Sopir online + istri jualan online. Anak 1, masih balita. Sisa Rp450rb kalau disiplin; dana darurat baru Rp1jt — target 6 bulan pengeluaran (Rp24jt) masih jauh.",
      nilai: { sembako: 700000, lauk: 800000, listrik: 250000, airgas: 150000, transport: 500000, pulsa: 200000, sekolah: 200000, sehat: 150000, cicilan: 550000, tabungan: 500000, darurat: 250000, hiburan: 300000 } },
    { nama: "Gaji Rp7.500.000 — 2 anak", gaji: 7500000, anggota: 4,
      cerita: "Karyawan toko + cicilan motor Rp600rb. Dua anak SD. Sisa Rp1,1jt — cukup untuk nabung haji kecil-kecilan Rp500rb/bulan dan dana darurat Rp350rb.",
      nilai: { sembako: 800000, lauk: 900000, listrik: 250000, airgas: 150000, transport: 450000, pulsa: 200000, sekolah: 600000, sehat: 200000, cicilan: 600000, tabungan: 500000, darurat: 350000, hiburan: 400000 } },
    { nama: "Gaji Rp10.000.000 — KPR", gaji: 10000000, anggota: 4,
      cerita: "PNS golongan III + istri guru honorer. KPR Rp2,2jt/bulan, 2 anak SMP. Sisa Rp1,6jt — dana pendidikan anak sudah harus disiapkan dari sekarang.",
      nilai: { sembako: 900000, lauk: 1000000, listrik: 350000, airgas: 180000, transport: 600000, pulsa: 250000, sekolah: 900000, sehat: 250000, cicilan: 2200000, tabungan: 700000, darurat: 400000, hiburan: 500000 } },
    { nama: "Gaji Rp12.000.000 — 3 anak", gaji: 12000000, anggota: 5,
      cerita: "Wiraswasta + KPR dan cicilan mobil. Tiga anak, satu kuliah. Sisa Rp1,9jt — paling longgar, tapi cicilan total Rp3,4jt/bulan adalah risiko terbesar kalau penghasilan turun.",
      nilai: { sembako: 1000000, lauk: 1200000, listrik: 400000, airgas: 200000, transport: 800000, pulsa: 300000, sekolah: 1400000, sehat: 300000, cicilan: 3400000, tabungan: 800000, darurat: 500000, hiburan: 600000 } }
  ],
  tips: [
    { judul: "Masak 5 hari seminggu", isi: "Jajan makan siang Rp25rb x 22 hari kerja = Rp550rb. Masak bekal dari rumah memangkasnya jadi sekitar Rp200rb — hemat Rp350rb/bulan." },
    { judul: "Belanja pasar pagi, bukan minimarket", isi: "Sayur dan lauk di pasar pagi rata-rata 20–30% lebih murah. Selisih belanja Rp60rb/hari bisa jadi Rp45rb — hemat sekitar Rp450rb/bulan." },
    { judul: "Token listrik dibeli tanggal 1", isi: "Beli token di awal bulan sesuai anggaran (mis. Rp250rb), jangan tambah di tengah bulan. Lampu LED + cabut colokan yang tidak dipakai memangkas 10–15% pemakaian." },
    { judul: "Gajian langsung pisahkan tabungan", isi: "Rumusnya: gaji masuk, langsung pindah Rp500rb ke rekening lain sebelum belanja. Yang ditabung di akhir bulan hampir selalu nol." },
    { judul: "Bensin: isi penuh seminggu sekali", isi: "Motor 110cc isi Rp30rb per 3 hari = Rp300rb/bulan. Catat kilometernya; kalau tiba-tiba boros, berarti ada yang harus diservis." },
    { judul: "SPP dan seragam dicicil dari jauh hari", isi: "Seragam + buku Rp600rb per anak per semester terasa berat kalau dibayar sekaligus. Sisihkan Rp100rb/bulan dari 6 bulan sebelumnya." },
    { judul: "Jajan anak pakai amplop harian", isi: "Rp10rb/hari x 22 hari sekolah = Rp220rb. Kasih uang jajan harian dalam amplop, bukan mingguan — anak belajar mengatur, uang tidak habis di hari pertama." },
    { judul: "Langganan bersama tetangga", isi: "WiFi rumah Rp200rb dibagi 2 rumah = Rp100rb. Galon dan gas beli bareng agen bisa lebih murah Rp3–5rb per item." },
    { judul: "Cek cicilan sebelum ambil yang baru", isi: "Total cicilan jangan lewat 30% gaji. Gaji Rp5jt berarti cicilan maksimal Rp1,5jt — kalau sudah Rp1,5jt, tunda dulu beli barang kredit." },
    { judul: "Dana darurat dulu, baru hiburan", isi: "Target dana darurat = 3x pengeluaran sebulan (mis. Rp12jt untuk pengeluaran Rp4jt). Setelah penuh, uang Rp250rb/bulannya boleh pindah ke hiburan." }
  ]
};

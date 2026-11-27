// KantongKeluarga — program entri untuk make.fun best-household-budget-site-20261126-1457.
// Tugasnya: menyerahkan situs statis (app/) dan screenshot-nya ke grader.
// Caranya: salin app/ + screenshots/ ke direktori output, lalu tulis
// dossier.json — ringkasan yang dibaca juri AI — memakai pustaka vendored
// make.fun (vendor/makefun-frontend.ts, tidak diubah).
// Jalan di Node 22, standard library saja; tanpa jaringan, tanpa install.
// Di luar container grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));

// Pilih tempat menulis: MAKEFUN_OUTPUT_DIR, kalau tidak ada /output.
// Kalau direktori itu tidak bisa dibuat (mis. read-only di suatu sandbox),
// jatuh ke ./output di sebelah file ini, supaya entri tetap terserahkan
// ke tempat yang bisa ditulis — bukan gagal diam-diam.
function pickOutputDir(): string {
  const candidates = [process.env.MAKEFUN_OUTPUT_DIR ?? "/output", join(repoRoot, "output")];
  for (const dir of candidates) {
    try {
      mkdirSync(dir, { recursive: true });
      return dir;
    } catch {
      // coba kandidat berikutnya
    }
  }
  throw new Error("no writable output directory (tried MAKEFUN_OUTPUT_DIR, /output, ./output)");
}
const outDir = pickOutputDir();
cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
mkdirSync(join(outDir, "screenshots"), { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });
}

// Batas-batas ini mengikuti gate kompetisi: teks dossier maks 160 KiB,
// maks 4 screenshot @ 256 KiB, app/ maks 993 file dan 16 MiB.
writeFileSync(
  join(outDir, "dossier.json"),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

const dossierBytes = statSync(join(outDir, "dossier.json")).size;
console.log(`KantongKeluarga entry written to ${outDir} (dossier.json ${dossierBytes} bytes).`);

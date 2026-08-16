# Portfolio 

Website portfolio statis (HTML5, CSS3, JavaScript ES6+, Three.js, GSAP, Lenis)
untuk Data Analyst / Data Scientist / Machine Learning Engineer / Full Stack
Developer. Tidak ada backend, tidak ada database — 100% berjalan di browser.

## 1. Cara Menjalankan di Komputer Lokal

Karena beberapa fitur (fetch modul JS) membutuhkan HTTP server (bukan `file://`),
jalankan salah satu cara berikut dari folder project ini:

```bash
# Python (sudah terinstal di kebanyakan komputer)
python -m http.server 8000

# atau Node.js
npx serve .

# atau ekstensi "Live Server" di VS Code
```

Lalu buka `http://localhost:8000` di browser.

Membuka `index.html` langsung dengan dobel klik **bisa saja bekerja** di
sebagian besar browser modern, tapi server lokal lebih aman untuk menghindari
pembatasan CORS pada beberapa browser.

## 2. Struktur Folder

```
/
├── index.html              → Halaman utama (semua section: Home s/d Kontak)
├── project-detail.html     → Template halaman detail project (?id=slug-project)
├── assets/
│   ├── css/
│   │   ├── style.css              → Seluruh desain sistem & layout
│   │   └── project-detail.css     → Style khusus halaman detail project
│   ├── js/
│   │   ├── data.js                → SATU-SATUNYA file yang perlu Anda edit
│   │   ├── loader.js              → Loading screen + animasi tunnel
│   │   ├── cursor.js              → Custom cursor
│   │   ├── three-background.js    → Background Three.js (partikel, sphere, dst)
│   │   ├── hero-visual.js         → Objek 3D berputar di Hero
│   │   ├── skills-galaxy.js       → Visualisasi galaksi skill (canvas 2D)
│   │   ├── main.js                → Render konten dinamis + GSAP + navigasi
│   │   └── project-detail.js      → Render halaman detail project
│   ├── images/, icons/, documents/, videos/, fonts/, models/
├── robots.txt
├── sitemap.xml
├── manifest.json
└── README.md
```

## 3. Cara Mengganti Data Portfolio (PENTING — baca ini dulu)

**Semua isi portfolio** (nama, deskripsi, pendidikan, pengalaman, skill,
project, sertifikat, kontak, sosial media) diatur dari **satu file saja**:

```
assets/js/data.js
```

Buka file itu dan edit objek `PORTFOLIO_DATA`. Tidak perlu menyentuh HTML
sama sekali — index.html dan project-detail.html akan otomatis merender ulang
sesuai isi file ini.

Contoh mengganti nama dan role:

```js
profile: {
  name: "Nama Anda",
  roles: ["Data Analyst", "Data Scientist", "Machine Learning Engineer", "Full Stack Developer"],
  ...
}
```

## 4. Cara Menambah Project Baru

Tambahkan objek baru ke dalam array `projects` di `data.js`, mengikuti pola
yang sudah ada. Setiap project butuh:

- `id` — slug unik tanpa spasi, dipakai di URL (`project-detail.html?id=id-anda`)
- `name`, `category`, `date`, `status`, `technologies`, `shortDescription`
- `links.demo`, `links.github`, `links.video` (boleh dikosongkan `""` jika tidak ada)
- `detail.*` — seluruh isi halaman detail (ringkasan, latar belakang, masalah,
  tujuan, workflow, fitur, tantangan, solusi, role, hasil, insight)

Setelah disimpan, kartu project baru otomatis muncul di grid, dan tombol
**Detail Project** akan membuka `project-detail.html?id=id-anda` dengan
seluruh isi `detail` yang Anda tulis.

> **Catatan SEO:** karena ini website statis tanpa backend, semua project
> berbagi satu file `project-detail.html` yang sama dan dibedakan lewat
> parameter `?id=`. Ini cukup untuk kebanyakan kebutuhan, tapi jika Anda ingin
> setiap project punya URL statis sendiri untuk SEO maksimal (agar Google
> mengindeks tiap project sebagai halaman berbeda), duplikasi
> `project-detail.html` menjadi misalnya `project-churn-prediction.html`,
> lalu di bagian `<head>` isi meta title/description secara manual dan di
> `assets/js/project-detail.js` set variabel `id` langsung tanpa membaca dari
> query string.

## 5. Mengganti Foto, Video, dan Sertifikat

Saat ini foto profil, thumbnail project, dan sertifikat menggunakan
placeholder visual (gradient + ikon) agar file tetap ringan tanpa aset
gambar asli. Untuk menggunakan foto/gambar Anda sendiri:

1. Simpan gambar di `assets/images/`.
2. Di `assets/css/style.css`, cari `.about-photo`, `.project-thumb`, atau
   `.cert-icon`, lalu ganti `background` dengan
   `background-image: url('../images/nama-file.jpg'); background-size: cover;`
   — atau lebih mudah, tambahkan tag `<img>` langsung di `main.js` pada
   fungsi `renderProjects()` / `renderCertificates()` / `renderAbout()`.
3. Untuk video demo project, isi `links.video` di `data.js` dengan URL
   embed YouTube (`https://www.youtube.com/embed/ID_VIDEO`) — video player
   akan otomatis muncul di halaman detail.

## 6. Mengganti Warna / Tema

Seluruh palet warna didefinisikan sebagai CSS variable di bagian atas
`assets/css/style.css` (`:root { --bg, --primary, --secondary, --accent, ... }`).
Ubah nilainya di satu tempat ini untuk mengubah tema di seluruh halaman.

## 7. Deploy ke GitHub Pages

1. Buat repository baru di GitHub, lalu push seluruh isi folder ini ke branch `main`.
2. Buka **Settings → Pages** di repository tersebut.
3. Pada **Source**, pilih branch `main` dan folder `/ (root)`.
4. Simpan — GitHub akan memberi Anda URL seperti
   `https://username.github.io/nama-repo/`.
5. Perbarui URL tersebut di:
   - `index.html` dan `project-detail.html` (tag `canonical`, `og:url`, dan JSON-LD)
   - `robots.txt` dan `sitemap.xml`

## 8. Deploy ke Vercel

1. Buat akun di [vercel.com](https://vercel.com) dan hubungkan dengan GitHub.
2. Klik **Add New → Project**, pilih repository ini.
3. Karena ini situs statis, biarkan **Framework Preset** sebagai **Other**
   dan **Build Command** kosong — Vercel akan menyajikan file apa adanya.
4. Klik **Deploy**. Setelah selesai, Anda mendapat URL `https://nama-project.vercel.app`.
5. (Opsional) Hubungkan domain kustom Anda lewat tab **Domains**.

## 9. Catatan Performa & Skala

- Scene Three.js latar belakang baru dijalankan setelah loading screen
  selesai (`siteReady` event), sehingga first paint tetap ringan.
- Animasi otomatis dinonaktifkan bila pengguna mengaktifkan
  `prefers-reduced-motion` di sistem operasinya.
- Untuk skor Lighthouse terbaik: kompres semua gambar/video asli Anda
  sebelum diunggah (disarankan `.webp` untuk gambar, resolusi ≤ 1920px),
  dan pertimbangkan meng-host font/Font Awesome secara lokal alih-alih CDN
  jika Anda butuh performa maksimal tanpa dependensi eksternal.

## 10. Yang Perlu Anda Lengkapi Sebelum Publish

- [ ] Ganti seluruh isi `assets/js/data.js` dengan data asli Anda
- [ ] Tambahkan file CV asli di `assets/documents/` (lihat `PLACEHOLDER.txt`)
- [ ] Ganti URL contoh (`nadiaardra.dev`, `github.com/username`, dst.) dengan milik Anda
- [ ] Tambahkan foto profil, thumbnail project, dan gambar sertifikat asli
- [ ] Perbarui `sitemap.xml`, `robots.txt`, dan seluruh tag `canonical`/`og:url`
      dengan domain final Anda

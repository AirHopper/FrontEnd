# ✈️ AirHopper Front End


AirHopper adalah merupakan website pemesanan tiket pesawat online yang dirancang untuk memberikan pengalaman perjalanan yang mudah dan nyaman. Dengan dukungan teknologi modern seperti React, Chakra UI, dan Vite, kami menyediakan layanan frontend yang cepat, aman, dan dapat diandalkan.

## 🌟 Fitur Utama

- **Pencarian Tiket**: Fitur ini memungkinkan pengguna untuk mencari tiket perjalanan dengan mudah berdasarkan tujuan, tanggal dan Kelas penerbangan.
- **Pemesanan Tiket**: Melalui fitur ini, pengguna dapat memesan tiket secara langsung dari platform. Proses pemesanan dilakukan secara cepat dan intuitif, mulai dari memilih tiket hingga mengisi informasi penumpang yang diperlukan.
- **Pembayaran Tiket**: Fitur ini menyediakan berbagai metode pembayaran yang aman dan fleksibel, seperti transfer bank, kartu kredit/debit, e-wallet, atau layanan pembayaran lainnya.
- **Riwayat Pemesanan**: Pengguna dapat melihat daftar lengkap pemesanan yang telah dilakukan, termasuk detail perjalanan, status pembayaran, dan informasi tiket.
- **Destinasi Favorit**: Fitur ini memungkinkan pengguna menyimpan destinasi yang sering mereka kunjungi atau tempat-tempat yang ingin mereka datangi.
- **Oauth Google**: Fitur ini menyediakan kemudahan bagi pengguna untuk mendaftar dan masuk ke platform menggunakan akun Google mereka.
- **Diskon Penerbangan**: Fitur ini memberikan informasi kepada pengguna mengenai penawaran diskon atau promosi khusus untuk tiket penerbangan. Diskon dapat berlaku untuk rute tertentu atau maskapai tertentu.
- **Notifikasi**: Fitur ini memberikan informasi penting kepada pengguna, seperti konfirmasi pemesanan, pembaruan status tiket, dan promo
- **Otorisasi dan Autentikasi**:Fitur ini menentukan hak akses pengguna terhadap fitur atau data tertentu berdasarkan perannya, seperti admin atau pengguna reguler.
- **Update Akun**: Fitur ini meningkatkan pengalaman pengguna dengan memberikan kontrol penuh atas pengaturan akun mereka

## 🛠️ Teknologi yang Digunakan

- **React.js** sebagai library JavaScript yang digunakan untuk membangun antarmuka pengguna (UI)
- **Tanstack** sebagai untuk pengelolaan data asinkron di aplikasi React.
- **Vite** sebagai build tool modern yang digunakan untuk pengembangan aplikasi web.
- **Midtrans** untuk gateway pembayaran.
- **Chakra UI** sebagai library komponen React yang menyediakan elemen-elemen UI yang dapat dikustomisasi dengan mudah. 
- **NPM** sebagai manajer paket untuk Node.js yang digunakan untuk mengelola dependensi proyek.
- **PWA** sebagai pengalaman seperti aplikasi native
- **Redux** sebagai untuk mengelola state global dalam aplikasi.

## 🚀 Cara Menggunakan

### Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lokal:

### Prasyarat

1. Node.js versi terbaru (minimal 18.x).

### Langkah Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/AirHopper/FrontEnd.git
   ```
2. Instal semua dependensi:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Konfigurasikan file lingkungan .env:

   ```bash
        VITE_API_URL="your-api-url"
        VITE_API_VERSION="your-api-version"
        VITE_GOOGLE_OAUTH_CLIENT_ID="your-google-client-id"
        VITE_WEB_PUSH_PUBLIC_KEY="your-web-push-public-key"
        MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
   ```

3. Jalankan server:
   ```bash
   npm run dev
   ```

## 👥 Tim AirHopper

Kami adalah kolaborasi antara developer Backend dan Fullstack dari program Studi Independen Kampus Merdeka - Binar Academy.

- **Backend :**
  - **Muhamad Royhan Fadhli** 
  - **Juan Verrel Tanuwijaya**
  - **Ahmad Subhan Daryhadi**
  - **Bima Rizqy Ramadhan** 
- **Fullstack :**
  - **Ridhwan Tsalasah Putra**: **[Notification and Account]**
  - **Ryan Nicholas Purba**: **[Landing Page and History]**
  - **M. Zaky Pria Maulana**: **[Search Tiket and History]**
  - **Joe Ferdinan**: **[Checkout and Payment]**

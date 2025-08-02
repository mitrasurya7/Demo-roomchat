
# 🚀 Panduan Lengkap Instalasi Dokku + MongoDB di Ubuntu

Dokku adalah platform PaaS ringan berbasis Docker untuk deploy aplikasi berbasis Git. Panduan ini akan membimbing Anda langkah demi langkah dari awal instalasi hingga siap digunakan dalam arsitektur aplikasi Anda menggunakan **MongoDB** sebagai basis data utama.

---

## 📦 Prasyarat

- ✅ Server Ubuntu 20.04+ (minimal 1GB RAM)
- ✅ Akses root atau sudo
- ✅ Domain (opsional, untuk setup HTTPS)
- ✅ SSH key Anda sudah tersedia

---

## 🔧 1. Update Server

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 🏗 2. Instalasi Dokku

```bash
wget wget -NP . https://dokku.com/bootstrap.sh
sudo DOKKU_TAG=v0.35.20 bash bootstrap.sh
```

> 💡 Versi terbaru bisa dicek di: https://github.com/dokku/dokku/releases

---

## 🔑 3. Tambah SSH Key untuk Deployment

Di local machine:

```bash
cat ~/.ssh/id_rsa.pub | ssh root@your-server-ip "sudo dokku ssh-keys:add admin"
```

---

## 🌐 4. Setup Domain (Opsional)

```bash
dokku domains:set-global yourdomain.com
```

---

## 📁 5. Membuat Aplikasi

```bash
dokku apps:create nama-aplikasi
```

---

## 🐳 6. Deploy Aplikasi via Git

Di lokal:

```bash
git remote add dokku dokku@your-server-ip:nama-aplikasi
git push dokku main
```

> Jika branch Anda `master`, gunakan `git push dokku master`.

---

## ☁️ 7. Tambah MongoDB (Menggunakan Plugin Resmi)

```bash
sudo dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo
```

Buat instance database:

```bash
dokku mongo:create nama-db
```

Koneksikan dengan aplikasi:

```bash
dokku mongo:link nama-db nama-aplikasi
```

---

## ⚙️ 8. Atur ENV Vars

```bash
dokku config:set nama-aplikasi NODE_ENV=production
```

Atau lihat semua ENV:

```bash
dokku config nama-aplikasi
```

---

## 🔐 9. Setup HTTPS (Jika Punya Domain)

Install plugin Let's Encrypt:

```bash
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
```

Aktifkan HTTPS:

```bash
dokku letsencrypt:enable nama-aplikasi
dokku letsencrypt:cron-job --add
```

---

## 🛠 10. Manajemen Aplikasi

**Start / Stop / Restart**

```bash
dokku ps:restart nama-aplikasi
dokku ps:stop nama-aplikasi
```

**Cek log**

```bash
dokku logs nama-aplikasi -t
```

---

## 💾 Backup MongoDB

```bash
dokku mongo:export nama-db > backup-nama-db.tar.gz
```

Restore:

```bash
dokku mongo:import nama-db < backup-nama-db.tar.gz
```

---

## 🎯 Struktur Arsitektur

```plaintext
Client (Web/Mobile)
      ↓
Reverse Proxy (Nginx - Otomatis oleh Dokku)
      ↓
Dokku Container (Node.js / Other App)
      ↓
MongoDB (via dokku-mongo plugin)
```

---

## ✅ Kesimpulan

Dengan panduan ini, Anda telah memiliki platform deploy ringan yang efisien, siap digunakan untuk berbagai macam aplikasi. Dokku + MongoDB adalah solusi yang elegan untuk arsitektur microservices maupun monolith.

---

## 📚 Referensi

- [Dokku Documentation](http://dokku.com/docs/)
- [Dokku Mongo Plugin](https://github.com/dokku/dokku-mongo)
- [Let's Encrypt Dokku](https://github.com/dokku/dokku-letsencrypt)

---

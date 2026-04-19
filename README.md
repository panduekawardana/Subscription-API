<img width="1800" height="520" alt="Image" src="https://github.com/user-attachments/assets/9a8b30a0-f6af-4656-9039-da02d9108927" />

<h4 align="center">Subscription Management System API</h4>
<P align="center">Membuat sistem subscription api dengan menggunakan javascript dari konfigurasi awal hingga pengujian autentikasi, error handling, dan rate limit request dengan arcjet.</P>

#### Implementasi ⚙️
<ul>
    <li>Node js</li>
    <li>Express JS</li>
    <li>Database PostgreSQL</li>
    <li>Postamn atau httpie Testing</li>
</ul>
 
 ### Fitur 🔋

 👉 Pembatasan Laju dan Perlindungan Bot Tingkat Lanjut: dengan Arcjet yang membantu Anda mengamankan seluruh aplikasi.
👉 Pemodelan Basis Data: Model dan relasi menggunakan PostgreSQL.
👉 Otentikasi JWT: Operasi CRUD pengguna dan manajemen langganan.
👉 Penanganan Kesalahan Global: Validasi input dan integrasi middleware.
👉 Mekanisme Pencatatan: Untuk debugging dan pemantauan yang lebih baik.

### Quick Start🤸‍♂️
**Pastikan install:**
- **[Git](https://git-scm.com/install/)**
- **[Github](https://git-scm.com/install/)** opsional
- **[Node js](https://nodejs.org/en/download)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[Postman](https://www.postgresql.org/)**

#### Clone repoitory
```bash
git clone https://github.com/panduekawardana/Subscription-API.git
cd Subscription-API
```

##### Installasi
```bash
npm install
```
##### Set Up Environment Variables
buat file `.env.local`

```bash
# PORT
PORT=
NODE_ENV=''

# DATABASE
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=

DB_SSL=
DB_POOL_MAX=
DB_POOL_MIN=
DB_POOL_IDLE=

# JWT SECRET
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"
```

### Kekurangan Fitur⚠️
Belum bisa mengirimkan email subscription menggunakan `upstash` atau tools lainnya karena belum diterapkan🤸‍♂️.
</br>

<img width="1800" height="520" alt="Image" src="https://github.com/user-attachments/assets/82899bf6-bd8b-4a4c-b8bb-50d6c5f54f40" />

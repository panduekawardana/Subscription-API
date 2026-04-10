import pg from 'pg';
import '../config/env.js';

const { Client } = pg;

/** Uji koneksi saat startup (connect → query → disconnect). */
export default async function connectionDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();
    await client.query('SELECT 1');
    console.log(
      `Koneksi database PostgreSQL OK berjalan di mode ${process.env.NODE_ENV}`,
    );
  } catch (err) {
    console.error('Koneksi database PostgreSQL gagal:', err.message);
    throw err;
  } finally {
    await client.end();
  }
}

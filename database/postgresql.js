import pg from 'pg';
import '../config/env.js';
import { USER_TABLE_SCHEMA } from '../models/user.model.js';
import { SUBSCRIPTION_TABLE_SCHEMA } from '../models/subscription.model.js';

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

export async function query(text, params = []) {
  return pool.query(text, params);
}

async function initializeTables() {
  await query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
  await query(USER_TABLE_SCHEMA);
  await query(SUBSCRIPTION_TABLE_SCHEMA);
}

/** Uji koneksi saat startup (connect → query → disconnect). */
export default async function connectionDatabase() {
  try {
    await query('SELECT 1');
    await initializeTables();
    console.log(
      `Koneksi database PostgreSQL OK berjalan di mode ${process.env.NODE_ENV}`,
    );
  } catch (err) {
    console.error('Koneksi database PostgreSQL gagal:', err.message);
    throw err;
  }
}

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../database/postgresql.js';
import { JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV } from '../config/env.js';

const AUTH_COOKIE_NAME = 'session_token';
const isProduction = NODE_ENV === 'production';

function getJwtSecret() {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return JWT_SECRET;
}

function signSessionToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      sid: uuidv4(),
    },
    getJwtSecret(),
    { expiresIn: JWT_EXPIRES_IN || '7d' },
  );
}

function setSessionCookie(res, token) {
  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'fullName, email, and password are required',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await query('SELECT id FROM users WHERE email = $1 LIMIT 1', [
      normalizedEmail,
    ]);

    if (existingUser.rowCount > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const createdUser = await query(
      `
      INSERT INTO users (full_name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, full_name, email, created_at
      `,
      [fullName.trim(), normalizedEmail, passwordHash],
    );

    const user = createdUser.rows[0];
    const token = signSessionToken(user);
    setSessionCookie(res, token);

    return res.status(201).json({
      success: true,
      message: 'Sign up successful',
      data: {
        token: token,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          createdAt: user.created_at,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'email and password are required',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userResult = await query(
      `
      SELECT id, full_name, email, password_hash, created_at
      FROM users
      WHERE email = $1
      LIMIT 1
      `,
      [normalizedEmail],
    );

    if (userResult.rowCount === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const user = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = signSessionToken(user);
    setSessionCookie(res, token);

    return res.status(200).json({
      success: true,
      message: 'Sign in successful',
      data: {
        token: token,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          createdAt: user.created_at,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const signOut = async (_req, res, next) => {
  try {
    res.clearCookie(AUTH_COOKIE_NAME, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
    });

    return res.status(200).json({
      success: true,
      message: 'Sign out successful',
    });
  } catch (error) {
    return next(error);
  }
};

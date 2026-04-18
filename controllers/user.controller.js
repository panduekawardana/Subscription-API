import {query} from '../database/postgresql.js';

export const getUsers = async (req, res, next) => {
  try {
    const usersResult = await query(
      `
      SELECT id, full_name, email, password_hash, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      `,
    );

    const users = usersResult.rows.map((u) => ({
      id: u.id,
      data: {
        fullName: u.full_name,
        email: u.email,
        password: u.password,
        createdAt: u.created_at,
        updatedAt: u.updated_at,
      },
    }));

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const {id} = req.params;

    const userResult = await query(
      `
      SELECT id, full_name, email, created_at, updated_at
      FROM users
      WHERE id = $1
      LIMIT 1
      `,
      [id],
    );

    if (userResult.rowCount === 0) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const u = userResult.rows[0];
    const user = {
      id: u.id,
      data: {
        fullName: u.full_name,
        email: u.email,
        createdAt: u.created_at,
        updatedAt: u.updated_at,
      },
    };

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

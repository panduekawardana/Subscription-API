import jwt from 'jsonwebtoken';
import {JWT_SECRET, NODE_ENV} from '../config/env.js';

const AUTH_COOKIE_NAME = 'session_token';
function getTokenFromRequest(req) {
  const cookieToken = req.cookies?.[AUTH_COOKIE_NAME];
  if (cookieToken) return cookieToken;
  const authHeader = req.headers?.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }
  return null;
}
function unauthorized(res, message, error) {
  return res.status(401).json({
    success: false,
    message,
    // error hanya ditampilkan di development agar tidak bocor di production
    error: NODE_ENV === 'development' ? error?.message : undefined,
  });
}
const authorize = async (req, res, next) => {
  try {
    if (!JWT_SECRET) {
      return unauthorized(res, 'Unauthorized: JWT_SECRET is not configured');
    }
    const token = getTokenFromRequest(req);
    if (!token) {
      return unauthorized(res, 'Unauthorized: token missing');
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: decoded.sub,
      email: decoded.email,
    };
    return next();
  } catch (error) {
    const isExpired = error?.name === 'TokenExpiredError';
    return unauthorized(
      res,
      isExpired ? 'Unauthorized: token expired' : 'Unauthorized: invalid token',
      error,
    );
  }
};
export default authorize;
export {authorize};
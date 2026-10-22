// Signed admin tokens (HMAC) without external packages
const crypto = require('crypto');

const SECRET = process.env.AUTH_SECRET || 'danis-costure-dev-secret';
const TTL_MS = 12 * 60 * 60 * 1000;

function signature(payload) {
  return crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
}

function sign(user) {
  const payload = Buffer.from(JSON.stringify({ u: user, t: Date.now() })).toString('base64url');
  return payload + '.' + signature(payload);
}

function verify(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2 || signature(parts[0]) !== parts[1]) return null;
  try {
    const data = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
    if (Date.now() - data.t > TTL_MS) return null;
    return data;
  } catch (err) {
    return null;
  }
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const data = verify(header.replace(/^Bearer\s+/i, ''));
  if (!data) return res.status(401).json({ error: 'Admin login required' });
  req.user = data.u;
  next();
}

module.exports = { sign, verify, requireAuth };

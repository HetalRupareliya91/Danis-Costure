// Admin login -> /api/auth
const router = require('express').Router();
const { sign } = require('../middleware/auth');

router.post('/login', (req, res) => {
  const body = req.body || {};
  const user = process.env.ADMIN_USER || 'admin';
  const pass = process.env.ADMIN_PASS || 'admin123';
  if (body.username === user && body.password === pass) {
    return res.json({ token: sign(user), user: user });
  }
  res.status(401).json({ error: 'Invalid username or password' });
});

module.exports = { base: '/api/auth', router: router };

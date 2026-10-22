// API tests for Products
const { test, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../src/server');

let server;
let base;

before(function () {
  return new Promise(function (resolve) {
    server = app.listen(0, function () {
      base = 'http://127.0.0.1:' + server.address().port + '/api';
      resolve();
    });
  });
});

after(function () {
  if (server.closeAllConnections) server.closeAllConnections();
  server.close();
});

test('GET /api/products returns a list', async function () {
  const res = await fetch(base + '/products');
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(await res.json()));
});

test('GET /api/products/stats returns totals', async function () {
  const res = await fetch(base + '/products/stats');
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(typeof body.total, 'number');
  assert.strictEqual(typeof body.byStatus, 'object');
});

test('GET /api/products/:id returns 404 for unknown id', async function () {
  const res = await fetch(base + '/products/99999999');
  assert.strictEqual(res.status, 404);
});

test('POST /api/products rejects an empty request', async function () {
  const res = await fetch(base + '/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.strictEqual(res.status, 401);
});

test('Products is listed in /api/modules', async function () {
  const res = await fetch(base + '/modules');
  const mods = await res.json();
  assert.ok(mods.some(function (m) { return m.slug === 'products'; }));
});

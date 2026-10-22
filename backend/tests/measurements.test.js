// API tests for Measurements
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

test('GET /api/measurements returns a list', async function () {
  const res = await fetch(base + '/measurements');
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(await res.json()));
});

test('GET /api/measurements/stats returns totals', async function () {
  const res = await fetch(base + '/measurements/stats');
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(typeof body.total, 'number');
  assert.strictEqual(typeof body.byStatus, 'object');
});

test('GET /api/measurements/:id returns 404 for unknown id', async function () {
  const res = await fetch(base + '/measurements/99999999');
  assert.strictEqual(res.status, 404);
});

test('POST /api/measurements rejects an empty request', async function () {
  const res = await fetch(base + '/measurements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.strictEqual(res.status, 400);
});

test('Measurements is listed in /api/modules', async function () {
  const res = await fetch(base + '/modules');
  const mods = await res.json();
  assert.ok(mods.some(function (m) { return m.slug === 'measurements'; }));
});

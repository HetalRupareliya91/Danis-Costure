// Tiny JSON file store - each collection is saved as backend/data/<name>.json
const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function fileOf(collection) {
  return path.join(DATA_DIR, collection + '.json');
}

function read(collection) {
  try {
    return JSON.parse(fs.readFileSync(fileOf(collection), 'utf8'));
  } catch (err) {
    return [];
  }
}

function write(collection, rows) {
  fs.writeFileSync(fileOf(collection), JSON.stringify(rows, null, 2));
}

function nextId(rows) {
  return rows.reduce((max, row) => Math.max(max, row.id || 0), 0) + 1;
}

module.exports = {
  all(collection) {
    return read(collection);
  },
  get(collection, id) {
    return read(collection).find((row) => row.id === Number(id)) || null;
  },
  create(collection, data) {
    const rows = read(collection);
    const row = Object.assign({ id: nextId(rows), createdAt: new Date().toISOString() }, data);
    rows.push(row);
    write(collection, rows);
    return row;
  },
  update(collection, id, data) {
    const rows = read(collection);
    const index = rows.findIndex((row) => row.id === Number(id));
    if (index === -1) return null;
    rows[index] = Object.assign({}, rows[index], data, { id: rows[index].id, updatedAt: new Date().toISOString() });
    write(collection, rows);
    return rows[index];
  },
  remove(collection, id) {
    const rows = read(collection);
    const next = rows.filter((row) => row.id !== Number(id));
    write(collection, next);
    return next.length !== rows.length;
  }
};

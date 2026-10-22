// Embroidery Designs service - business logic on top of the JSON store
const store = require('../utils/store');
const model = require('../models/embroidery.model');
const validator = require('../validators/embroidery.validator');

function badRequest(errors) {
  const err = new Error(errors.join(', '));
  err.status = 400;
  return err;
}

function list(query) {
  query = query || {};
  let rows = store.all(model.COLLECTION);
  const q = String(query.q || '').trim().toLowerCase();
  if (q) rows = rows.filter((row) => JSON.stringify(row).toLowerCase().indexOf(q) !== -1);
  if (query.status) rows = rows.filter((row) => row.status === query.status);
  return rows.sort((a, b) => b.id - a.id);
}

function get(id) {
  return store.get(model.COLLECTION, id);
}

function create(input) {
  const data = validator.normalize(model.pick(input));
  if (!data.status) data.status = validator.STATUSES[0];
  const errors = validator.validate(data, false);
  if (errors.length) throw badRequest(errors);
  return store.create(model.COLLECTION, data);
}

function update(id, input) {
  const data = validator.normalize(model.pick(input));
  const errors = validator.validate(data, true);
  if (errors.length) throw badRequest(errors);
  return store.update(model.COLLECTION, id, data);
}

function remove(id) {
  return store.remove(model.COLLECTION, id);
}

function stats() {
  const rows = store.all(model.COLLECTION);
  const byStatus = {};
  validator.STATUSES.forEach((s) => { byStatus[s] = 0; });
  rows.forEach((row) => { byStatus[row.status] = (byStatus[row.status] || 0) + 1; });
  return { total: rows.length, byStatus: byStatus };
}

module.exports = { list, get, create, update, remove, stats };

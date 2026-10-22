// Customers validation rules
const model = require('../models/customers.model');

const NUMERIC = [];
const STATUSES = ['active', 'inactive'];

function isBlank(value) {
  return value === undefined || value === null || value === '';
}

function validate(data, partial) {
  const errors = [];
  if (!partial) {
    model.REQUIRED.forEach(function (key) {
      if (isBlank(data[key])) errors.push(key + ' is required');
    });
  }
  NUMERIC.forEach(function (key) {
    if (!isBlank(data[key]) && isNaN(Number(data[key]))) errors.push(key + ' must be a number');
  });
  if (!isBlank(data.phone) && !/^[0-9+ -]{7,15}$/.test(String(data.phone))) errors.push('phone must be 7 to 15 digits');
  if (!isBlank(data.email) && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.email))) errors.push('email is invalid');
  if (!isBlank(data.status) && STATUSES.indexOf(data.status) === -1) errors.push('status must be one of: ' + STATUSES.join(', '));
  return errors;
}

function normalize(data) {
  const out = Object.assign({}, data);
  NUMERIC.forEach(function (key) {
    if (!isBlank(out[key])) out[key] = Number(out[key]);
  });
  return out;
}

module.exports = { validate: validate, normalize: normalize, NUMERIC: NUMERIC, STATUSES: STATUSES };

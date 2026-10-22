// Customers model - Dani's Costure
// Fields stored for every Customers record.
const COLLECTION = 'customers';
const FIELDS = ['name', 'phone', 'email', 'city', 'notes'];
const REQUIRED = ['name'];

function pick(input) {
  const out = {};
  FIELDS.concat(['status']).forEach(function (key) {
    if (input && input[key] !== undefined) out[key] = input[key];
  });
  return out;
}

module.exports = { COLLECTION: COLLECTION, FIELDS: FIELDS, REQUIRED: REQUIRED, pick: pick };

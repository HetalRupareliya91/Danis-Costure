// Measurements model - Dani's Costure
// Fields stored for every Measurements record.
const COLLECTION = 'measurements';
const FIELDS = ['customerName', 'phone', 'chest', 'waist', 'hip', 'shoulder', 'length', 'sleeve'];
const REQUIRED = ['customerName'];

function pick(input) {
  const out = {};
  FIELDS.concat(['status']).forEach(function (key) {
    if (input && input[key] !== undefined) out[key] = input[key];
  });
  return out;
}

module.exports = { COLLECTION: COLLECTION, FIELDS: FIELDS, REQUIRED: REQUIRED, pick: pick };

// Orders model - Dani's Costure
// Fields stored for every Orders record.
const COLLECTION = 'orders';
const FIELDS = ['customerName', 'phone', 'garment', 'quantity', 'dueDate', 'amount'];
const REQUIRED = ['customerName'];

function pick(input) {
  const out = {};
  FIELDS.concat(['status']).forEach(function (key) {
    if (input && input[key] !== undefined) out[key] = input[key];
  });
  return out;
}

module.exports = { COLLECTION: COLLECTION, FIELDS: FIELDS, REQUIRED: REQUIRED, pick: pick };

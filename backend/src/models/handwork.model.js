// Handwork model - Dani's Costure
// Fields stored for every Handwork record.
const COLLECTION = 'handwork';
const FIELDS = ['orderId', 'workType', 'artisan', 'stitchCount', 'dueDate'];
const REQUIRED = ['orderId'];

function pick(input) {
  const out = {};
  FIELDS.concat(['status']).forEach(function (key) {
    if (input && input[key] !== undefined) out[key] = input[key];
  });
  return out;
}

module.exports = { COLLECTION: COLLECTION, FIELDS: FIELDS, REQUIRED: REQUIRED, pick: pick };

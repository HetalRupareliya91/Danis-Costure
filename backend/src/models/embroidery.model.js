// Embroidery Designs model - Dani's Costure
// Fields stored for every Embroidery Designs record.
const COLLECTION = 'embroidery';
const FIELDS = ['code', 'name', 'threadType', 'complexity', 'rate'];
const REQUIRED = ['code'];

function pick(input) {
  const out = {};
  FIELDS.concat(['status']).forEach(function (key) {
    if (input && input[key] !== undefined) out[key] = input[key];
  });
  return out;
}

module.exports = { COLLECTION: COLLECTION, FIELDS: FIELDS, REQUIRED: REQUIRED, pick: pick };

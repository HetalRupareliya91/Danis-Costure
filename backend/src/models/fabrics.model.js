// Fabrics model - Dani's Costure
// Fields stored for every Fabrics record.
const COLLECTION = 'fabrics';
const FIELDS = ['name', 'type', 'color', 'metersInStock', 'pricePerMeter'];
const REQUIRED = ['name'];

function pick(input) {
  const out = {};
  FIELDS.concat(['status']).forEach(function (key) {
    if (input && input[key] !== undefined) out[key] = input[key];
  });
  return out;
}

module.exports = { COLLECTION: COLLECTION, FIELDS: FIELDS, REQUIRED: REQUIRED, pick: pick };

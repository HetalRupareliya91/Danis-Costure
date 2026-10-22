// Stitching Masters model - Dani's Costure
// Fields stored for every Stitching Masters record.
const COLLECTION = 'stitching-masters';
const FIELDS = ['name', 'phone', 'speciality', 'ratePerPiece', 'experience'];
const REQUIRED = ['name'];

function pick(input) {
  const out = {};
  FIELDS.concat(['status']).forEach(function (key) {
    if (input && input[key] !== undefined) out[key] = input[key];
  });
  return out;
}

module.exports = { COLLECTION: COLLECTION, FIELDS: FIELDS, REQUIRED: REQUIRED, pick: pick };

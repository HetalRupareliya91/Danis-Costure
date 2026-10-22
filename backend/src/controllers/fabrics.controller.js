// Fabrics controller - HTTP layer
const service = require('../services/fabrics.service');

exports.list = (req, res) => res.json(service.list(req.query));

exports.stats = (req, res) => res.json(service.stats());

exports.get = (req, res) => {
  const row = service.get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Fabrics record not found' });
  res.json(row);
};

exports.create = (req, res, next) => {
  try {
    res.status(201).json(service.create(req.body));
  } catch (err) {
    next(err);
  }
};

exports.update = (req, res, next) => {
  try {
    const row = service.update(req.params.id, req.body);
    if (!row) return res.status(404).json({ error: 'Fabrics record not found' });
    res.json(row);
  } catch (err) {
    next(err);
  }
};

exports.remove = (req, res) => {
  if (!service.remove(req.params.id)) return res.status(404).json({ error: 'Fabrics record not found' });
  res.status(204).end();
};

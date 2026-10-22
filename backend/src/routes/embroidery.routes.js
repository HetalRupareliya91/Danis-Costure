// Embroidery Designs routes -> /api/embroidery
const router = require('express').Router();
const controller = require('../controllers/embroidery.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', controller.list);
router.get('/stats', controller.stats);
router.get('/:id', controller.get);
router.post('/', requireAuth, controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);

module.exports = {
  base: '/api/embroidery',
  router: router,
  meta: {
    slug: 'embroidery',
    name: 'Embroidery Designs',
    description: 'Signature embroidery motifs to choose for your outfit.',
    fields: ['code', 'name', 'threadType', 'complexity', 'rate'],
    statuses: ['active', 'archived'],
    publicCreate: false
  }
};

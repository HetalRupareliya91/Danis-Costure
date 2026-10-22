// Fabrics routes -> /api/fabrics
const router = require('express').Router();
const controller = require('../controllers/fabrics.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', controller.list);
router.get('/stats', controller.stats);
router.get('/:id', controller.get);
router.post('/', requireAuth, controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);

module.exports = {
  base: '/api/fabrics',
  router: router,
  meta: {
    slug: 'fabrics',
    name: 'Fabrics',
    description: 'Silk, georgette, velvet and banarasi fabrics hand-picked for you.',
    fields: ['name', 'type', 'color', 'metersInStock', 'pricePerMeter'],
    statuses: ['available', 'low-stock', 'out-of-stock'],
    publicCreate: false
  }
};

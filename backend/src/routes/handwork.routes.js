// Handwork routes -> /api/handwork
const router = require('express').Router();
const controller = require('../controllers/handwork.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', controller.list);
router.get('/stats', controller.stats);
router.get('/:id', controller.get);
router.post('/', requireAuth, controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);

module.exports = {
  base: '/api/handwork',
  router: router,
  meta: {
    slug: 'handwork',
    name: 'Handwork',
    description: 'Zardosi, aari, mirror and sequin work by our karigars.',
    fields: ['orderId', 'workType', 'artisan', 'stitchCount', 'dueDate'],
    statuses: ['pending', 'in-progress', 'quality-check', 'done'],
    publicCreate: false
  }
};

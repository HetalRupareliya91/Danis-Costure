// Orders routes -> /api/orders
const router = require('express').Router();
const controller = require('../controllers/orders.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', controller.list);
router.get('/stats', controller.stats);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);

module.exports = {
  base: '/api/orders',
  router: router,
  meta: {
    slug: 'orders',
    name: 'Orders',
    description: 'Place an order or track every stage of your outfit.',
    fields: ['customerName', 'phone', 'garment', 'quantity', 'dueDate', 'amount'],
    statuses: ['new', 'cutting', 'handwork', 'stitching', 'press', 'ready', 'delivered'],
    publicCreate: true
  }
};

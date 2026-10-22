// Customers routes -> /api/customers
const router = require('express').Router();
const controller = require('../controllers/customers.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', controller.list);
router.get('/stats', controller.stats);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);

module.exports = {
  base: '/api/customers',
  router: router,
  meta: {
    slug: 'customers',
    name: 'Customers',
    description: 'Register once and we keep your details ready for every outfit.',
    fields: ['name', 'phone', 'email', 'city', 'notes'],
    statuses: ['active', 'inactive'],
    publicCreate: true
  }
};

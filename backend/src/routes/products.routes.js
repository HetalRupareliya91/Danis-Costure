// Products routes -> /api/products
const router = require('express').Router();
const controller = require('../controllers/products.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', controller.list);
router.get('/stats', controller.stats);
router.get('/:id', controller.get);
router.post('/', requireAuth, controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);

module.exports = {
  base: '/api/products',
  router: router,
  meta: {
    slug: 'products',
    name: 'Products',
    description: 'Lehengas, sarees, kurtis, anarkalis and sherwanis crafted in-house.',
    fields: ['name', 'category', 'price', 'fabric', 'stock'],
    statuses: ['available', 'made-to-order', 'sold-out'],
    publicCreate: false
  }
};

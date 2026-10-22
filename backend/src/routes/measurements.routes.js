// Measurements routes -> /api/measurements
const router = require('express').Router();
const controller = require('../controllers/measurements.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', controller.list);
router.get('/stats', controller.stats);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);

module.exports = {
  base: '/api/measurements',
  router: router,
  meta: {
    slug: 'measurements',
    name: 'Measurements',
    description: 'Share your body measurements for a perfect made-to-measure fit.',
    fields: ['customerName', 'phone', 'chest', 'waist', 'hip', 'shoulder', 'length', 'sleeve'],
    statuses: ['received', 'verified'],
    publicCreate: true
  }
};

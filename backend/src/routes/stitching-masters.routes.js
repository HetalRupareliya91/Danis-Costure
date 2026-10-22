// Stitching Masters routes -> /api/stitching-masters
const router = require('express').Router();
const controller = require('../controllers/stitching-masters.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', controller.list);
router.get('/stats', controller.stats);
router.get('/:id', controller.get);
router.post('/', requireAuth, controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);

module.exports = {
  base: '/api/stitching-masters',
  router: router,
  meta: {
    slug: 'stitching-masters',
    name: 'Stitching Masters',
    description: 'Master tailors for blouses, lehengas, sherwanis and more.',
    fields: ['name', 'phone', 'speciality', 'ratePerPiece', 'experience'],
    statuses: ['available', 'busy', 'on-leave'],
    publicCreate: false
  }
};

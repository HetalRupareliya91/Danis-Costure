// Admin panel module: Handwork
(function () {
  'use strict';
  if (!window.DCAdmin) return;
  window.DCAdmin.register('handwork', {
    title: 'Handwork',
    color: '#c27c0e',
    columns: ['orderId', 'workType', 'artisan', 'stitchCount', 'status'],
    labels: { orderId: 'Order Id', workType: 'Work Type', artisan: 'Artisan', stitchCount: 'Stitch Count', dueDate,status: 'Due Date,status' },
    types: { orderId: 'number', workType: 'text', artisan: 'text', stitchCount: 'number', dueDate: 'date' },
    searchPlaceholder: 'Search Handwork...'
  });
})();

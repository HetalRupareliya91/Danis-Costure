// Storefront module: Handwork
// Tells the customer website how to show the Handwork section.
(function () {
  'use strict';
  if (!window.DC) return;
  window.DC.register({
    slug: 'handwork',
    title: 'Handwork',
    kind: 'stats',
    icon: 'H',
    blurb: 'Zardosi, aari, mirror and sequin work by our karigars.',
    primary: 'orderId',
    labels: { orderId: 'Order Id', workType: 'Work Type', artisan: 'Artisan', stitchCount: 'Stitch Count', dueDate,status: 'Due Date,status' },
    types: { orderId: 'number', workType: 'text', artisan: 'text', stitchCount: 'number', dueDate: 'date' },
    emptyText: 'Nothing to show in Handwork yet. Visit again soon.'
  });
})();

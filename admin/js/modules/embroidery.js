// Admin panel module: Embroidery Designs
(function () {
  'use strict';
  if (!window.DCAdmin) return;
  window.DCAdmin.register('embroidery', {
    title: 'Embroidery Designs',
    color: '#7b4b94',
    columns: ['code', 'name', 'threadType', 'complexity', 'status'],
    labels: { code: 'Code', name: 'Name', threadType: 'Thread Type', complexity: 'Complexity', rate,status: 'Rate,status' },
    types: { code: 'text', name: 'text', threadType: 'text', complexity: 'number', rate: 'number' },
    searchPlaceholder: 'Search Embroidery Designs...'
  });
})();

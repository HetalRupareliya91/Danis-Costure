// Admin panel module: Fabrics
(function () {
  'use strict';
  if (!window.DCAdmin) return;
  window.DCAdmin.register('fabrics', {
    title: 'Fabrics',
    color: '#2e7d6b',
    columns: ['name', 'type', 'color', 'metersInStock', 'status'],
    labels: { name: 'Name', type: 'Type', color: 'Color', metersInStock: 'Meters In Stock', pricePerMeter,status: 'Price Per Meter,status' },
    types: { name: 'text', type: 'text', color: 'text', metersInStock: 'number', pricePerMeter: 'number' },
    searchPlaceholder: 'Search Fabrics...'
  });
})();

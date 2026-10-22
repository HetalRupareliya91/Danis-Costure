// Admin panel module: Measurements
(function () {
  'use strict';
  if (!window.DCAdmin) return;
  window.DCAdmin.register('measurements', {
    title: 'Measurements',
    color: '#b5651d',
    columns: ['customerName', 'phone', 'chest', 'waist', 'status'],
    labels: { customerName: 'Customer Name', phone: 'Phone', chest: 'Chest', waist: 'Waist', hip: 'Hip', shoulder: 'Shoulder', length: 'Length', sleeve,status: 'Sleeve,status' },
    types: { customerName: 'text', phone: 'tel', chest: 'number', waist: 'number', hip: 'number', shoulder: 'number', length: 'number', sleeve: 'number' },
    searchPlaceholder: 'Search Measurements...'
  });
})();

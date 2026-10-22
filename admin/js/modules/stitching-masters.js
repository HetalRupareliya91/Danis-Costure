// Admin panel module: Stitching Masters
(function () {
  'use strict';
  if (!window.DCAdmin) return;
  window.DCAdmin.register('stitching-masters', {
    title: 'Stitching Masters',
    color: '#1f5f8b',
    columns: ['name', 'phone', 'speciality', 'ratePerPiece', 'status'],
    labels: { name: 'Name', phone: 'Phone', speciality: 'Speciality', ratePerPiece: 'Rate Per Piece', experience,status: 'Experience,status' },
    types: { name: 'text', phone: 'tel', speciality: 'text', ratePerPiece: 'number', experience: 'number' },
    searchPlaceholder: 'Search Stitching Masters...'
  });
})();

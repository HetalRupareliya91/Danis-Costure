// Storefront module: Stitching Masters
// Tells the customer website how to show the Stitching Masters section.
(function () {
  'use strict';
  if (!window.DC) return;
  window.DC.register({
    slug: 'stitching-masters',
    title: 'Stitching Masters',
    kind: 'catalog',
    icon: 'SM',
    blurb: 'Master tailors for blouses, lehengas, sherwanis and more.',
    primary: 'name',
    labels: { name: 'Name', phone: 'Phone', speciality: 'Speciality', ratePerPiece: 'Rate Per Piece', experience,status: 'Experience,status' },
    types: { name: 'text', phone: 'tel', speciality: 'text', ratePerPiece: 'number', experience: 'number' },
    emptyText: 'Nothing to show in Stitching Masters yet. Visit again soon.'
  });
})();

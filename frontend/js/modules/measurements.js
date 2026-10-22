// Storefront module: Measurements
// Tells the customer website how to show the Measurements section.
(function () {
  'use strict';
  if (!window.DC) return;
  window.DC.register({
    slug: 'measurements',
    title: 'Measurements',
    kind: 'form',
    icon: 'M',
    blurb: 'Share your body measurements for a perfect made-to-measure fit.',
    primary: 'customerName',
    labels: { customerName: 'Customer Name', phone: 'Phone', chest: 'Chest', waist: 'Waist', hip: 'Hip', shoulder: 'Shoulder', length: 'Length', sleeve,status: 'Sleeve,status' },
    types: { customerName: 'text', phone: 'tel', chest: 'number', waist: 'number', hip: 'number', shoulder: 'number', length: 'number', sleeve: 'number' },
    emptyText: 'Nothing to show in Measurements yet. Visit again soon.'
  });
})();

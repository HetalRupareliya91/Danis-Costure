// Storefront module: Embroidery Designs
// Tells the customer website how to show the Embroidery Designs section.
(function () {
  'use strict';
  if (!window.DC) return;
  window.DC.register({
    slug: 'embroidery',
    title: 'Embroidery Designs',
    kind: 'catalog',
    icon: 'ED',
    blurb: 'Signature embroidery motifs to choose for your outfit.',
    primary: 'code',
    labels: { code: 'Code', name: 'Name', threadType: 'Thread Type', complexity: 'Complexity', rate,status: 'Rate,status' },
    types: { code: 'text', name: 'text', threadType: 'text', complexity: 'number', rate: 'number' },
    emptyText: 'Nothing to show in Embroidery Designs yet. Visit again soon.'
  });
})();

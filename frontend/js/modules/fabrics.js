// Storefront module: Fabrics
// Tells the customer website how to show the Fabrics section.
(function () {
  'use strict';
  if (!window.DC) return;
  window.DC.register({
    slug: 'fabrics',
    title: 'Fabrics',
    kind: 'catalog',
    icon: 'F',
    blurb: 'Silk, georgette, velvet and banarasi fabrics hand-picked for you.',
    primary: 'name',
    labels: { name: 'Name', type: 'Type', color: 'Color', metersInStock: 'Meters In Stock', pricePerMeter,status: 'Price Per Meter,status' },
    types: { name: 'text', type: 'text', color: 'text', metersInStock: 'number', pricePerMeter: 'number' },
    emptyText: 'Nothing to show in Fabrics yet. Visit again soon.'
  });
})();

// Storefront module: Products
// Tells the customer website how to show the Products section.
(function () {
  'use strict';
  if (!window.DC) return;
  window.DC.register({
    slug: 'products',
    title: 'Products',
    kind: 'catalog',
    icon: 'P',
    blurb: 'Lehengas, sarees, kurtis, anarkalis and sherwanis crafted in-house.',
    primary: 'name',
    labels: { name: 'Name', category: 'Category', price: 'Price', fabric: 'Fabric', stock,status: 'Stock,status' },
    types: { name: 'text', category: 'text', price: 'number', fabric: 'text', stock: 'number' },
    emptyText: 'Nothing to show in Products yet. Visit again soon.'
  });
})();

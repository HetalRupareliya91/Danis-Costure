// Admin panel module: Products
(function () {
  'use strict';
  if (!window.DCAdmin) return;
  window.DCAdmin.register('products', {
    title: 'Products',
    color: '#a0263c',
    columns: ['name', 'category', 'price', 'fabric', 'status'],
    labels: { name: 'Name', category: 'Category', price: 'Price', fabric: 'Fabric', stock,status: 'Stock,status' },
    types: { name: 'text', category: 'text', price: 'number', fabric: 'text', stock: 'number' },
    searchPlaceholder: 'Search Products...'
  });
})();

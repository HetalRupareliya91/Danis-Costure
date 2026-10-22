// Admin panel module: Orders
(function () {
  'use strict';
  if (!window.DCAdmin) return;
  window.DCAdmin.register('orders', {
    title: 'Orders',
    color: '#6a3d9a',
    columns: ['customerName', 'phone', 'garment', 'quantity', 'status'],
    labels: { customerName: 'Customer Name', phone: 'Phone', garment: 'Garment', quantity: 'Quantity', dueDate: 'Due Date', amount,status: 'Amount,status' },
    types: { customerName: 'text', phone: 'tel', garment: 'text', quantity: 'number', dueDate: 'date', amount: 'number' },
    searchPlaceholder: 'Search Orders...'
  });
})();

// Admin panel module: Customers
(function () {
  'use strict';
  if (!window.DCAdmin) return;
  window.DCAdmin.register('customers', {
    title: 'Customers',
    color: '#8e2b5f',
    columns: ['name', 'phone', 'email', 'city', 'status'],
    labels: { name: 'Name', phone: 'Phone', email: 'Email', city: 'City', notes,status: 'Notes,status' },
    types: { name: 'text', phone: 'tel', email: 'email', city: 'text', notes: 'textarea' },
    searchPlaceholder: 'Search Customers...'
  });
})();

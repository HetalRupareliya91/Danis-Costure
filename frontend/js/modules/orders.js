// Storefront module: Orders
// Tells the customer website how to show the Orders section.
(function () {
  'use strict';
  if (!window.DC) return;
  window.DC.register({
    slug: 'orders',
    title: 'Orders',
    kind: 'track',
    icon: 'O',
    blurb: 'Place an order or track every stage of your outfit.',
    primary: 'customerName',
    labels: { customerName: 'Customer Name', phone: 'Phone', garment: 'Garment', quantity: 'Quantity', dueDate: 'Due Date', amount,status: 'Amount,status' },
    types: { customerName: 'text', phone: 'tel', garment: 'text', quantity: 'number', dueDate: 'date', amount: 'number' },
    emptyText: 'Nothing to show in Orders yet. Visit again soon.'
  });
})();

// Storefront module: Customers
// Tells the customer website how to show the Customers section.
(function () {
  'use strict';
  if (!window.DC) return;
  window.DC.register({
    slug: 'customers',
    title: 'Customers',
    kind: 'form',
    icon: 'C',
    blurb: 'Register once and we keep your details ready for every outfit.',
    primary: 'name',
    labels: { name: 'Name', phone: 'Phone', email: 'Email', city: 'City', notes,status: 'Notes,status' },
    types: { name: 'text', phone: 'tel', email: 'email', city: 'text', notes: 'textarea' },
    emptyText: 'Nothing to show in Customers yet. Visit again soon.'
  });
})();

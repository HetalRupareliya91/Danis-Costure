# Orders

Place an order or track every stage of your outfit.

## Fields

| Field | Type | Required |
|---|---|---|
| customerName | text | yes |
| phone | tel | no |
| garment | text | no |
| quantity | number | no |
| dueDate | date | no |
| amount | number | no |
| status | one of: new, cutting, handwork, stitching, press, ready, delivered | auto |

## API

| Method | Path | Auth |
|---|---|---|
| GET | /api/orders?q=&status= | public |
| GET | /api/orders/stats | public |
| GET | /api/orders/:id | public |
| POST | /api/orders | public (customer website) |
| PUT | /api/orders/:id | admin token |
| DELETE | /api/orders/:id | admin token |

## Screens

- Storefront section type: **track**
- Admin panel: list, search, filter by status, add, edit, delete
- Mobile: cards stack in one column below 640px

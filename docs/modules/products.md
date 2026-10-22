# Products

Lehengas, sarees, kurtis, anarkalis and sherwanis crafted in-house.

## Fields

| Field | Type | Required |
|---|---|---|
| name | text | yes |
| category | text | no |
| price | number | no |
| fabric | text | no |
| stock | number | no |
| status | one of: available, made-to-order, sold-out | auto |

## API

| Method | Path | Auth |
|---|---|---|
| GET | /api/products?q=&status= | public |
| GET | /api/products/stats | public |
| GET | /api/products/:id | public |
| POST | /api/products | admin token |
| PUT | /api/products/:id | admin token |
| DELETE | /api/products/:id | admin token |

## Screens

- Storefront section type: **catalog**
- Admin panel: list, search, filter by status, add, edit, delete
- Mobile: cards stack in one column below 640px

# Customers

Register once and we keep your details ready for every outfit.

## Fields

| Field | Type | Required |
|---|---|---|
| name | text | yes |
| phone | tel | no |
| email | email | no |
| city | text | no |
| notes | textarea | no |
| status | one of: active, inactive | auto |

## API

| Method | Path | Auth |
|---|---|---|
| GET | /api/customers?q=&status= | public |
| GET | /api/customers/stats | public |
| GET | /api/customers/:id | public |
| POST | /api/customers | public (customer website) |
| PUT | /api/customers/:id | admin token |
| DELETE | /api/customers/:id | admin token |

## Screens

- Storefront section type: **form**
- Admin panel: list, search, filter by status, add, edit, delete
- Mobile: cards stack in one column below 640px

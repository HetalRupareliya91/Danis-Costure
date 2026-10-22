# Handwork

Zardosi, aari, mirror and sequin work by our karigars.

## Fields

| Field | Type | Required |
|---|---|---|
| orderId | number | yes |
| workType | text | no |
| artisan | text | no |
| stitchCount | number | no |
| dueDate | date | no |
| status | one of: pending, in-progress, quality-check, done | auto |

## API

| Method | Path | Auth |
|---|---|---|
| GET | /api/handwork?q=&status= | public |
| GET | /api/handwork/stats | public |
| GET | /api/handwork/:id | public |
| POST | /api/handwork | admin token |
| PUT | /api/handwork/:id | admin token |
| DELETE | /api/handwork/:id | admin token |

## Screens

- Storefront section type: **stats**
- Admin panel: list, search, filter by status, add, edit, delete
- Mobile: cards stack in one column below 640px

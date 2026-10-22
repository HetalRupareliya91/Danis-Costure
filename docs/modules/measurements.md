# Measurements

Share your body measurements for a perfect made-to-measure fit.

## Fields

| Field | Type | Required |
|---|---|---|
| customerName | text | yes |
| phone | tel | no |
| chest | number | no |
| waist | number | no |
| hip | number | no |
| shoulder | number | no |
| length | number | no |
| sleeve | number | no |
| status | one of: received, verified | auto |

## API

| Method | Path | Auth |
|---|---|---|
| GET | /api/measurements?q=&status= | public |
| GET | /api/measurements/stats | public |
| GET | /api/measurements/:id | public |
| POST | /api/measurements | public (customer website) |
| PUT | /api/measurements/:id | admin token |
| DELETE | /api/measurements/:id | admin token |

## Screens

- Storefront section type: **form**
- Admin panel: list, search, filter by status, add, edit, delete
- Mobile: cards stack in one column below 640px

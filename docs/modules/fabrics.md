# Fabrics

Silk, georgette, velvet and banarasi fabrics hand-picked for you.

## Fields

| Field | Type | Required |
|---|---|---|
| name | text | yes |
| type | text | no |
| color | text | no |
| metersInStock | number | no |
| pricePerMeter | number | no |
| status | one of: available, low-stock, out-of-stock | auto |

## API

| Method | Path | Auth |
|---|---|---|
| GET | /api/fabrics?q=&status= | public |
| GET | /api/fabrics/stats | public |
| GET | /api/fabrics/:id | public |
| POST | /api/fabrics | admin token |
| PUT | /api/fabrics/:id | admin token |
| DELETE | /api/fabrics/:id | admin token |

## Screens

- Storefront section type: **catalog**
- Admin panel: list, search, filter by status, add, edit, delete
- Mobile: cards stack in one column below 640px

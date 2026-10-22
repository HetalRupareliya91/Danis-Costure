# Embroidery Designs

Signature embroidery motifs to choose for your outfit.

## Fields

| Field | Type | Required |
|---|---|---|
| code | text | yes |
| name | text | no |
| threadType | text | no |
| complexity | number | no |
| rate | number | no |
| status | one of: active, archived | auto |

## API

| Method | Path | Auth |
|---|---|---|
| GET | /api/embroidery?q=&status= | public |
| GET | /api/embroidery/stats | public |
| GET | /api/embroidery/:id | public |
| POST | /api/embroidery | admin token |
| PUT | /api/embroidery/:id | admin token |
| DELETE | /api/embroidery/:id | admin token |

## Screens

- Storefront section type: **catalog**
- Admin panel: list, search, filter by status, add, edit, delete
- Mobile: cards stack in one column below 640px

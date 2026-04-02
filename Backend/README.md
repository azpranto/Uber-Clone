# Backend API Documentation

## `POST /api/users/register`

Register a new user and return a JWT auth token.

### Request

- Method: `POST`
- Path: `/api/users/register`
- Headers:
  - `Content-Type: application/json`
- Body (JSON):

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

### Required Fields & Validation

The endpoint uses `express-validator` rules from the route:

- `fullname.firstname`
  - Required (must be present)
  - Minimum length: `3` characters
- `email`
  - Must be a valid email address (and must be present)
- `password`
  - Minimum length: `8` characters (and must be present)
- `fullname.lastname`
  - Not validated by the route validator
  - Optional for this endpoint
  - If provided, the model schema expects it to be at least `3` characters

### Success Response

- Status code: `201 Created`
- Response body:

```json
{
  "token": "string (JWT)",
  "user": { }
}
```

Notes:

- `token` is generated via JWT using `process.env.JWT_SECRET` and includes the created user's `_id`.
- The returned `user` document does not include the `password` field (the model defines `password` with `select: false`).

### Error Responses

#### Validation Error

- Status code: `400 Bad Request`
- Response body:

```json
{
  "errors": [
    {
      "param": "string",
      "msg": "string",
      "value": "any",
      "location": "string"
    }
  ]
}
```

This is returned when any `express-validator` check fails.


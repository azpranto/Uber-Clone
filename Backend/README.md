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

---

## `POST /api/users/login`

Authenticate a user and return a JWT auth token.

### Request

- Method: `POST`
- Path: `/api/users/login`
- Headers:
  - `Content-Type: application/json`
- Body (JSON):

```json
{
  "email": "string",
  "password": "string"
}
```

### Required Fields & Validation

The endpoint uses `express-validator` rules from the route:

- `email`
  - Required (must be present)
  - Must be a valid email address
- `password`
  - Required (must be present)
  - Minimum length: `8` characters

### Success Response

- Status code: `200 OK`
- Response body:

```json
{
  "token": "string (JWT)",
  "user": { }
}
```

Notes:

- `token` is generated via JWT using `process.env.JWT_SECRET` and includes the authenticated user's `_id`.
- The returned `user` document does not include the `password` field (the model defines `password` with `select: false`).
- Authentication is successful when both email exists in the database and password matches the stored hash.

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

This is returned when any `express-validator` check fails (invalid email format or password too short).

#### Authentication Error

- Status code: `401 Unauthorized`
- Response body:

```json
{
  "message": "Invalid email or password"
}
```

This is returned when:
- Email does not exist in the database
- Password does not match the stored hash for the provided email

---

## `GET /api/users/profile`

Get the authenticated user's profile information.

### Request

- Method: `GET`
- Path: `/api/users/profile`
- Headers:
  - `Authorization: Bearer <token>` OR
  - Cookie: `token=<token>`
- Authentication: Required (uses `authMiddleware`)

### Success Response

- Status code: `200 OK`
- Response body:

```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

Notes:

- The user data is retrieved from the `req.user` object set by the authentication middleware.
- The response does not include the `password` field (model defines `password` with `select: false`).
- Token can be provided either as a Bearer token in Authorization header or as an HTTP-only cookie.

### Error Responses

#### Unauthorized Error

- Status code: `401 Unauthorized`
- Response body:

```json
{
  "message": "Unauthorized"
}
```

This is returned when:
- No token is provided (missing from both cookie and Authorization header)
- Token is invalid or expired
- Token is blacklisted (previously used for logout)

---

## `GET /api/users/logout`

Logout the authenticated user and invalidate their token.

### Request

- Method: `GET`
- Path: `/api/users/logout`
- Headers:
  - `Authorization: Bearer <token>` OR
  - Cookie: `token=<token>`
- Authentication: Required (uses `authMiddleware`)

### Success Response

- Status code: `200 OK`
- Response body:

```json
{
  "message": "Logged out successfully"
}
```

Notes:

- The token is cleared from the HTTP-only cookie.
- The token is added to the blacklist collection to prevent future use.
- Blacklisted tokens automatically expire after 24 hours (configured in the blacklistToken model).
- Both cookie and Authorization header tokens are invalidated.

### Error Responses

#### Unauthorized Error

- Status code: `401 Unauthorized`
- Response body:

```json
{
  "message": "Unauthorized"
}
```

This is returned when:
- No token is provided (missing from both cookie and Authorization header)
- Token is invalid or expired
- Token is already blacklisted

---

## `POST /api/captains/register`

Register a new captain and return a JWT auth token.

### Request

- Method: `POST`
- Path: `/api/captains/register`
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
  "password": "string",
  "vehicle": {
    "color": "string",
    "licensePlate": "string",
    "capacity": "number",
    "type": "string"
  }
}
```

### Required Fields & Validation

The endpoint uses `express-validator` rules from the route:

- `fullname.firstname`
  - Required (must be present)
  - Minimum length: `3` characters
- `email`
  - Required (must be present)
  - Must be a valid email address
- `password`
  - Required (must be present)
  - Minimum length: `6` characters
- `vehicle.color`
  - Required (must be present)
  - Minimum length: `3` characters
- `vehicle.licensePlate`
  - Required (must be present)
  - Minimum length: `3` characters
- `vehicle.capacity`
  - Required (must be present)
  - Must be an integer, minimum: `1`
- `vehicle.type`
  - Required (must be present)
  - Must be one of: `car`, `motorcycle`, `cng`
- `fullname.lastname`
  - Not validated by the route validator
  - Optional for this endpoint

### Success Response

- Status code: `201 Created`
- Response body:

```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "licensePlate": "string",
      "capacity": "number",
      "type": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  },
  "token": "string (JWT)"
}
```

Notes:

- `token` is generated via JWT using `process.env.JWT_SECRET` and includes the created captain's `_id`.
- The returned `captain` document does not include the `password` field.
- Email uniqueness is checked - returns error if captain already exists.

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

#### Captain Already Exists Error

- Status code: `400 Bad Request`
- Response body:

```json
{
  "message": "Captain already exists"
}
```

This is returned when a captain with the provided email already exists in the database.

---

## `POST /api/captains/login`

Authenticate a captain and return a JWT auth token.

### Request

- Method: `POST`
- Path: `/api/captains/login`
- Headers:
  - `Content-Type: application/json`
- Body (JSON):

```json
{
  "email": "string",
  "password": "string"
}
```

### Required Fields & Validation

The endpoint uses `express-validator` rules from the route:

- `email`
  - Required (must be present)
  - Must be a valid email address
- `password`
  - Required (must be present)
  - Minimum length: `6` characters

### Success Response

- Status code: `200 OK`
- Response body:

```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "licensePlate": "string",
      "capacity": "number",
      "type": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  },
  "token": "string (JWT)"
}
```

Notes:

- `token` is generated via JWT using `process.env.JWT_SECRET` and includes the authenticated captain's `_id`.
- The returned `captain` document does not include the `password` field.
- Authentication is successful when both email exists in the database and password matches the stored hash.
- Token is also set as an HTTP-only cookie for subsequent requests.

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

This is returned when any `express-validator` check fails (invalid email format or password too short).

#### Authentication Error

- Status code: `400 Bad Request`
- Response body:

```json
{
  "message": "Invalid email or password"
}
```

This is returned when:
- Email does not exist in the database
- Password does not match the stored hash for the provided email

---

## `GET /api/captains/profile`

Get the authenticated captain's profile information.

### Request

- Method: `GET`
- Path: `/api/captains/profile`
- Headers:
  - `Authorization: Bearer <token>` OR
  - Cookie: `token=<token>`
- Authentication: Required (uses `authCaptain` middleware)

### Success Response

- Status code: `200 OK`
- Response body:

```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "vehicle": {
    "color": "string",
    "licensePlate": "string",
    "capacity": "number",
    "type": "string"
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

Notes:

- The captain data is retrieved from the `req.captain` object set by the authentication middleware.
- The response does not include the `password` field.
- Token can be provided either as a Bearer token in Authorization header or as an HTTP-only cookie.

### Error Responses

#### Unauthorized Error

- Status code: `401 Unauthorized`
- Response body:

```json
{
  "message": "Unauthorized"
}
```

This is returned when:
- No token is provided (missing from both cookie and Authorization header)
- Token is invalid or expired
- Token is blacklisted (previously used for logout)

---

## `GET /api/captains/logout`

Logout the authenticated captain and invalidate their token.

### Request

- Method: `GET`
- Path: `/api/captains/logout`
- Headers:
  - `Authorization: Bearer <token>` OR
  - Cookie: `token=<token>`
- Authentication: Required (uses `authCaptain` middleware)

### Success Response

- Status code: `200 OK`
- Response body:

```json
{
  "message": "Logged out successfully"
}
```

Notes:

- The token is cleared from the HTTP-only cookie.
- The token is added to the blacklist collection to prevent future use.
- Blacklisted tokens automatically expire after 24 hours (configured in the blacklistToken model).
- Both cookie and Authorization header tokens are invalidated.

### Error Responses

#### Unauthorized Error

- Status code: `401 Unauthorized`
- Response body:

```json
{
  "message": "Unauthorized"
}
```

This is returned when:
- No token is provided (missing from both cookie and Authorization header)
- Token is invalid or expired
- Token is already blacklisted


# 🚀 User API Documentation

## Base Route: `/users`

---

### 🔹 POST `/register`

**Description**: Register a new user.

**Request Body**:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (min: 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

**Responses**:

- **201 Created**: User registered successfully.

```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

- **400 Bad Request**: Validation errors or user already exists.

```json
{
  "errors": [
    {
      "msg": "Validation message",
      "param": "field name",
      "location": "body"
    }
  ]
}
// or
{
  "error": "User already exists"
}
```

---

### 🔹 POST `/login`

**Description**: Authenticate an existing user.

**Request Body**:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

**Responses**:

- **200 OK**: Successful login.

```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

- **400 Bad Request**: Validation errors.

```json
{
  "errors": [
    {
      "msg": "Validation message",
      "param": "field name",
      "location": "body"
    }
  ]
}
```

- **401 Unauthorized**: Invalid credentials.

```json
{
  "error": "Invalid email or password"
}
```

---

### 🔹 GET `/profile`

**Description**: Get the authenticated user's profile.

**Headers**:

- `Authorization`: `Bearer <token>` (required)

**Responses**:

- **200 OK**:

```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string"
}
```

- **401 Unauthorized**:

```json
{
  "message": "Unauthorized"
}
```

---

### 🔹 GET `/logout`

**Description**: Log out the authenticated user.

**Headers**:

- `Authorization`: `Bearer <token>` (required)

**Responses**:

- **200 OK**:

```json
{
  "message": "Logged out"
}
```

- **401 Unauthorized**:

```json
{
  "message": "Unauthorized"
}
```

---

# 🧭 Captain API Documentation

## Base Route: `/captains`

---

### 🔹 POST `/register`

**Description**: Register a new captain.

**Request Body**:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (min: 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)",
  "vehicle": {
    "color": "string (min: 3 characters, required)",
    "plate": "string (min: 3 characters, required)",
    "capacity": "number (required)",
    "vehicleType": "string (enum: ['car', 'motorcycle', 'auto'], required)"
  }
}
```

**Responses**:

- **200 OK**: Captain registered successfully.

```json
{
  "token": "string",
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "type": "string"
    }
  }
}
```

- **400 Bad Request**: Validation errors.

```json
{
  "errors": [
    {
      "msg": "Validation message",
      "param": "field name",
      "location": "body"
    }
  ]
}
```

- **401 Unauthorized**: Captain already exists.

```json
{
  "message": "Captian already exists"
}
```

---

### 🔹 POST `/login`

**Description**: Authenticate an existing captain.

**Request Body**:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

**Responses**:

- **200 OK**: Successful login.

```json
{
  "token": "string",
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "type": "string"
    }
  }
}
```

- **400 Bad Request**: Validation errors.

```json
{
  "errors": [
    {
      "msg": "Validation message",
      "param": "field name",
      "location": "body"
    }
  ]
}
```

- **401 Unauthorized**: Invalid credentials.

```json
{
  "message": "Invaild email or password"
}
```

---

### 🔹 GET `/profile`

**Description**: Get the authenticated captain's profile.

**Headers**:

- `Authorization`: `Bearer <token>` (required)

**Responses**:

- **200 OK**:

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
      "plate": "string",
      "capacity": "number",
      "type": "string"
    }
  }
}
```

- **401 Unauthorized**:

```json
{
  "message": "Unauthorized"
}
```

---

### 🔹 GET `/logout`

**Description**: Log out the authenticated captain.

**Headers**:

- `Authorization`: `Bearer <token>` (required)

**Responses**:

- **200 OK**:

```json
{
  "message": "Logged out successfully"
}
```

- **401 Unauthorized**:

```json
{
  "message": "Unauthorized"
}
```

---

# 🚗 Ride API Documentation

## Base Route: `/rides`

---

### 🔹 POST `/create`

**Description**: Create a new ride (user only).

**Headers**:

- `Authorization`: `Bearer <token>` (required)

**Request Body**:

```json
{
  "pickup": "string (min: 3 characters, required)",
  "destination": "string (min: 3 characters, required)",
  "vehicleType": "string (enum: ['car', 'auto', 'moto'], required)"
}
```

**Responses**:

- **200 OK**: Ride created successfully.

```json
{
  "_id": "string",
  "user": "string",
  "pickup": "string",
  "destination": "string",
  "fare": "number",
  "otp": "number",
  "status": "pending"
  // ...other ride fields
}
```

- **401 Unauthorized**: Validation errors.

```json
{
  "errors": [
    {
      "msg": "Validation message",
      "param": "field name",
      "location": "body"
    }
  ]
}
```

- **400 Bad Request**: Other errors.

```json
{
  "message": "Error message"
}
```

---

# 🗺️ Maps API Documentation

## Base Route: `/maps`

All endpoints require user authentication (`Authorization: Bearer <token>`).

### 🔹 GET `/get-coordinates?address=...`

- **Description**: Get latitude and longitude for an address.

### 🔹 GET `/get-distance-time?origin=...&destination=...`

- **Description**: Get distance and time between two addresses.

### 🔹 GET `/get-suggestion?input=...`

- **Description**: Get address suggestions for autocomplete.

---

## ✅ Notes

- Set the header `Content-Type: application/json` for all requests with a body.
- Tokens returned on login/register should be used as Bearer tokens for all authenticated routes.
- Validation errors are returned as an `errors` array; other errors may use `error` or `message`.
- For enhanced security, use HTTPS and store tokens securely (e.g., in HTTP-only cookies or secure local storage).
- Some endpoints may return 200 or 201 for successful creation; check the actual implementation for details.

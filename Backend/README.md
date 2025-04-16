
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
    "type": "string (enum: ['car', 'motorcycle', 'auto'], required)"
  }
}
```

**Responses**:

- **201 Created**:

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

- **400 Bad Request**:

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

- **200 OK**:

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

- **400 Bad Request**:

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

- **401 Unauthorized**:

```json
{
  "message": "Invalid email or password"
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

## ✅ Notes

- Set the header `Content-Type: application/json` for all requests with a body.
- Tokens returned on login/register should be used as Bearer tokens for all authenticated routes.
- Ensure robust validation on both frontend and backend.
- For enhanced security, use HTTPS and store tokens securely (e.g., in HTTP-only cookies or secure local storage).

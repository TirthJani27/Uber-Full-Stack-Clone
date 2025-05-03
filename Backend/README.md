# 🚗 Uber Backend API

This is the backend for an Uber-like ride-hailing application, built with Node.js, Express, MongoDB, and Socket.IO.

---

## 🚀 Features

- User and Captain (driver) registration & authentication
- Ride creation, confirmation, and completion
- Real-time ride updates via Socket.IO
- Google Maps integration for geocoding and suggestions
- Secure JWT-based authentication
- Modular MVC structure

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Uber/Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `Backend` directory with the following:

```
PORT=8000
DB_CONNECT=mongodb://localhost:27017/uber
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Start the server

```bash
node server.js
```

The backend will run on `http://localhost:8000`.

---

## 📚 API Documentation

### User Endpoints

- **POST `/users/register`**  
  Register a new user by providing name, email, and password.

- **POST `/users/login`**  
  Authenticate a user and return a JWT token.

- **GET `/users/profile`**  
  Retrieve the authenticated user's profile details.

- **GET `/users/logout`**  
  Logout the user by invalidating the JWT token.

### Captain Endpoints

- **POST `/captains/register`**  
  Register a new captain with name, email, and vehicle details.

- **POST `/captains/login`**  
  Authenticate a captain and return a JWT token.

- **GET `/captains/profile`**  
  Retrieve the authenticated captain's profile details.

- **GET `/captains/logout`**  
  Logout the captain by invalidating the JWT token.

### Ride Endpoints

- **POST `/rides/create`**  
  Create a new ride request (user only).

- **GET `/rides/get-fair`**  
  Get an estimated fare for a ride based on distance and time.

- **POST `/rides/confirm`**  
  Confirm a ride request as a captain.

- **GET `/rides/start-ride`**  
  Start a ride after verifying the OTP (captain only).

- **POST `/rides/end-ride`**  
  Mark the ride as completed (captain only).

### Maps Endpoints

- **GET `/maps/get-coordinates`**  
  Retrieve latitude and longitude for a given address.

- **GET `/maps/get-distance-time`**  
  Calculate distance and estimated time between two locations.

- **GET `/maps/get-suggestion`**  
  Fetch address suggestions based on partial input.

---

## 🧑‍💻 Development Notes

- All endpoints requiring authentication expect a JWT in the `Authorization: Bearer <token>` header.
- Socket.IO is used for real-time ride status updates.
- See the code for detailed request/response formats and error handling.

---

## 📄 License

MIT

---

## 📬 Contact

For questions or support, open an issue or contact the maintainer.


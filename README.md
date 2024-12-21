# Jio-Cinema-clone:

A full-stack JioCinema clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project features user authentication, dynamic video streaming, and a responsive UI inspired by modern OTT platforms.

# Backend Documentation for JioCinema Clone:

This document provides an overview of the backend architecture for the JioCinema clone project. It details routes, request bodies, responses, and descriptions for better understanding.

---

## Routes

### 1. **User Registration (Sign-Up)**

- **Route:** `/api/v1/users/signup`
- **Method:** POST

#### Request Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "profilePicture": "string (optional)",
  "role": "string (optional, default: 'user')"
}
```

#### Response:

**Success (201):**

```json
{
  "success": true,
  "msg": "User Registration Successful!",
  "user": {
    "username": "string",
    "email": "string",
    "profilePicture": "string",
    "role": "string",
    "createdAt": "Date",
    "_id": "string"
  },
  "JwtToken": "string"
}
```

**Error (400):**:

```json
{
  "success": false,
  "errors": [
    { "msg": "Validation error message", "param": "field", "location": "body" }
  ]
}
```

#### Description:

This route allows users to register by providing a username, email, and password. The input is validated using `express-validator`, and a JWT token is generated upon successful registration.

---

## Components

### 1. **Controller: `user.controller.js`**

#### Function: `signUp`

- **Purpose:** Handles the user registration logic, including validation and JWT token generation.
- **Workflow:**
  - Validates input fields using `express-validator`.
  - Calls `createUser` from `user.repository.js` to store user details in the database.
  - Generates a JWT token using `generateJwtToken`.

### 2. **Model: `user.model.js`**

#### User Schema

- **Fields:**

  - `username` (String, required, unique)
  - `email` (String, required, unique)
  - `password` (String, required, minLength: 6, hashed before saving)
  - `profilePicture` (String, optional)
  - `role` (Enum: ["user", "admin"], default: "user")
  - `createdAt` (Date, default: now)

- **Methods:**
  - `comparePassword(password)`: Compares input password with hashed password.
  - `generateJwtToken()`: Generates a JWT token with user ID and expiration.

### 3. **Routes: `user.routes.js`**

- **Route:** POST `/signup`
- **Validation:**

  - `username` must not be empty.
  - `email` must be a valid email.
  - `password` must be at least 6 characters long.

- **Controller:** `signUp`

### 4. **Repository: `user.repository.js`**

#### Function: `createUser`

- **Purpose:** Encapsulates the logic to create a new user in the database.
- **Workflow:**
  - Validates required fields (`username`, `email`, `password`).
  - Creates and saves a new user document in MongoDB.

### 5. **App Configuration: `app.js`**

- Initializes the Express app and sets up environment variables using `dotenv`.
- Configures middleware like `body-parser` for parsing request bodies.
- Connects to MongoDB via `dbConnection`.
- Sets up the `/api/v1/users` route for user-related endpoints.
- Includes a health check route (`/`) to verify the application is running.

---

## Environment Variables

- **`PORT`**: Port for the server (default: 3000).
- **`JWT_SECRET`**: Secret key for signing JWT tokens.
- **MongoDB Connection URI**: For database connectivity.

---

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up `.env` file with required environment variables.
4. Run the application:
   ```bash
   npm start
   ```

---

This backend serves as the foundation for user management in the JioCinema clone project, offering scalable and secure user authentication and registration.

# Jio-Cinema-clone:

A full-stack JioCinema clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project features user authentication, dynamic video streaming, and a responsive UI inspired by modern OTT platforms.

# Backend Documentation for JioCinema Clone

This document provides detailed information on the backend implementation of the JioCinema clone project, including routes, request bodies, responses, and brief descriptions.

---

## USER ROUTES:

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

**Error (400):**

```json
{
  "success": false,
  "errors": [
    { "msg": "Validation error message", "param": "field", "location": "body" }
  ]
}
```

#### Description:

This route registers a new user by validating the input fields using `express-validator`. Upon successful registration, it stores the user details in MongoDB and generates a JWT token for authentication.

---

### 2. **User Login (Sign-In)**

- **Route:** `/api/v1/users/signin`
- **Method:** POST

#### Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response:

**Success (200):**

```json
{
  "success": true,
  "msg": "User Logged In Successfully!",
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

**Error (401):**

```json
{
  "success": false,
  "msg": "Invalid Email or Password!"
}
```

#### Description:

This route allows users to log in by verifying their email and password. It checks the credentials against the stored data in MongoDB, and upon success, generates a JWT token for session management.

---

### 3. **User Logout (Sign-Out)**

- **Route:** `/api/v1/users/signout`
- **Method:** GET

#### Response:

**Success (200):**

```json
{
  "success": true,
  "msg": "User Logged Out Successfully!"
}
```

#### Description:

This route logs out the user by clearing the authentication token from the cookies and blacklisting the token to prevent reuse.

---

### 4. **Get User Profile**

- **Route:** `/api/v1/users/profile`
- **Method:** GET
- **Authentication Required**

#### Headers:

```json
{
  "Authorization": "Bearer <jwtToken>"
}
```

#### Response:

**Success (200):**

```json
{
  "success": true,
  "user": {
    "username": "string",
    "email": "string",
    "profilePicture": "string",
    "role": "string",
    "createdAt": "Date",
    "_id": "string"
  }
}
```

#### Description:

This route retrieves the details of the currently authenticated user by decoding the JWT token and fetching the user data from MongoDB.

---

## Example Walkthrough

### Registering a New User

**Request:**

```bash
POST /api/v1/users/signup
Content-Type: application/json
```

**Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword",
  "profilePicture": "https://example.com/profile.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "msg": "User Registration Successful!",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "profilePicture": "https://example.com/profile.jpg",
    "role": "user",
    "createdAt": "2024-12-21T10:30:00.000Z",
    "_id": "64ef2a27bcf86cd799439012"
  },
  "JwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWYyYTI3YmNmODZjZDc5OTQzOTAxMiIsImV4cCI6MTcwMjg2ODAwMH0.k9mQ0XOtF6GdBtW7xvWyISoz"
}
```

### Logging In a User

**Request:**

```bash
POST /api/v1/users/signin
Content-Type: application/json
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword"
}
```

**Response:**

```json
{
  "success": true,
  "msg": "User Logged In Successfully!",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "profilePicture": "https://example.com/profile.jpg",
    "role": "user",
    "createdAt": "2024-12-21T10:30:00.000Z",
    "_id": "64ef2a27bcf86cd799439012"
  },
  "JwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWYyYTI3YmNmODZjZDc5OTQzOTAxMiIsImV4cCI6MTcwMjg2ODAwMH0.k9mQ0XOtF6GdBtW7xvWyISoz"
}
```

## VIDEO ROUTES:

### 1. **Add a New Video**

- **Route:** `/api/v1/videos/addVideo`
- **Method:** POST
- **Authentication:** Required (Admin Only)

#### Request Body:

```json
{
  "title": "string",
  "description": "string",
  "genre": ["string"],
  "releaseDate": "ISO 8601 date string",
  "duration": "integer",
  "thumbnail": "string (URL)",
  "videoUrl": "string (URL)",
  "cast": ["string"],
  "languages": "string",
  "category": "string"
}
```

#### Response:

**Success (201):**

```json
{
  "success": true,
  "msg": "Video Created Successfully!",
  "video": {
    "title": "string",
    "description": "string",
    "genre": ["string"],
    "releaseDate": "Date",
    "duration": "integer",
    "thumbnail": "string (URL)",
    "videoUrl": "string (URL)",
    "cast": ["string"],
    "languages": "string",
    "category": "string",
    "createdBy": "string (user ID)",
    "_id": "string"
  }
}
```

**Error (400):**

```json
{
  "success": false,
  "errors": [
    { "msg": "Validation error message", "param": "field", "location": "body" }
  ]
}
```

#### Description:

This route allows authenticated admin users to add a new video to the platform. The video details are validated using `express-validator` before being stored in the database.

---

### 2. **Get All Videos**

- **Route:** `/api/v1/videos/allVideos`
- **Method:** GET
- **Authentication:** Required (Admin Only)

#### Response:

**Success (200):**

```json
{
  "success": true,
  "msg": "All Videos Fetched Successfully!",
  "count": "number",
  "videos": [
    {
      "title": "string",
      "description": "string",
      "genre": ["string"],
      "releaseDate": "Date",
      "duration": "integer",
      "thumbnail": "string (URL)",
      "videoUrl": "string (URL)",
      "languages": "string",
      "category": "string",
      "createdBy": "string (user ID)",
      "_id": "string"
    }
  ]
}
```

#### Description:

This route retrieves all videos stored in the database. It is accessible only by authenticated admin users and returns a list of all video records.

---

### 3. **Get Video by ID**

- **Route:** `/api/v1/videos/video/:id`
- **Method:** GET
- **Authentication:** Required (Admin Only)

#### Response:

**Success (200):**

```json
{
  "success": true,
  "msg": "Video Fetched Successfully!",
  "video": {
    "title": "string",
    "description": "string",
    "genre": ["string"],
    "releaseDate": "Date",
    "duration": "integer",
    "thumbnail": "string (URL)",
    "videoUrl": "string (URL)",
    "languages": "string",
    "category": "string",
    "createdBy": "string (user ID)",
    "_id": "string"
  }
}
```

**Error (400):**

```json
{
  "success": false,
  "msg": "Video with this id not found!"
}
```

#### Description:

This route fetches a specific video by its unique ID. It is only accessible to authenticated admin users.

---

### 4. **Update Video**

- **Route:** `/api/v1/videos/updateVideo/:id`
- **Method:** PUT
- **Authentication:** Required (Admin Only)

#### Request Body:

```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "genre": ["string"] (optional),
  "releaseDate": "ISO 8601 date string (optional)",
  "duration": "integer (optional)",
  "thumbnail": "string (URL) (optional)",
  "videoUrl": "string (URL) (optional)",
  "cast": ["string"] (optional),
  "languages": "string (optional)",
  "category": "string (optional)"
}
```

#### Response:

**Success (200):**

```json
{
  "success": true,
  "msg": "Video Updated Successfully",
  "video": {
    "title": "string",
    "description": "string",
    "genre": ["string"],
    "releaseDate": "Date",
    "duration": "integer",
    "thumbnail": "string (URL)",
    "videoUrl": "string (URL)",
    "languages": "string",
    "category": "string",
    "_id": "string"
  }
}
```

**Error (400):**

```json
{
  "success": false,
  "msg": "Video with this id not found!"
}
```

#### Description:

This route updates details of an existing video. Only the fields provided in the request body will be updated. It is accessible to authenticated admin users.

---

### 5. **Delete Video**

- **Route:** `/api/v1/videos/video/:id`
- **Method:** DELETE
- **Authentication:** Required (Admin Only)

#### Response:

**Success (200):**

```json
{
  "success": true,
  "msg": "Video Deleted Successfully"
}
```

**Error (400):**

```json
{
  "success": false,
  "msg": "Video with this id not found!"
}
```

#### Description:

This route deletes a specific video from the database. It is only accessible to authenticated admin users.

---

### 6. **Get Videos by User ID**

- **Route:** `/api/v1/videos/myVideos`
- **Method:** GET
- **Authentication:** Required

#### Response:

**Success (200):**

```json
{
  "success": true,
  "msg": "Videos Fetched Successfully!",
  "count": "number",
  "videos": [
    {
      "title": "string",
      "description": "string",
      "genre": ["string"],
      "releaseDate": "Date",
      "duration": "integer",
      "thumbnail": "string (URL)",
      "videoUrl": "string (URL)",
      "languages": "string",
      "category": "string",
      "createdBy": "string (user ID)",
      "_id": "string"
    }
  ]
}
```

#### Description:

This route fetches all videos created by the currently authenticated user. It is accessible to all authenticated users.

---

## Environment Variables

- **`PORT`**: Port for the server (default: 3000).
- **`JWT_SECRET`**: Secret key for signing JWT tokens.
- **`MongoDB_URI`**: MongoDB connection string.

---

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the required environment variables.
4. Start the server:
   ```bash
   npm start
   ```

---

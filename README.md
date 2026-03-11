# 📇 Contact Manager API

A RESTful Contact Management API built with Node.js, Express, MongoDB, and JWT Authentication.

---

## 🚀 Features

- User Registration
- User Login (JWT Authentication)
- Protected Routes
- Create Contact
- Get All Contacts (Per User)
- Get Contact By ID
- Update Contact
- Delete Contact
- Input Validation with Joi
- Password Hashing with Bcrypt
- MongoDB with Mongoose

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Joi (Validation)
- Bcrypt (Password Hashing)

---

## 📂 Project Structure

```text
node/
│
├── config/
│   └── mongodb.js
│
├── controller/
│   ├── userController.js
│   └── contactController.js
│
├── middleware/
│   ├── jwt.js
│   ├── userMiddleware.js
│   └── contactMiddleware.js
│
├── models/
│   ├── userModel.js
│   └── contactModel.js
│
├── route/
│   ├── userRoute.js
│   └── contactRoute.js
│
├── errorHandler/
│   └── errorHandler.js
│
├── app.js
└── server.js
```

---

## 🌐 Base URL

`http://localhost:5000/api`

---

## 🔐 Authentication

This API uses **JWT (JSON Web Token)**.

After login, include token in request headers:

`Authorization: Bearer YOUR_ACCESS_TOKEN`

---

# 👤 User Endpoints

### ➕ Register User

**POST** `/api/user/register`

```json
{
  "username": "johnsmith",
  "email": "john@example.com",
  "password": "123456"
}
```

### 🔑 Login User

**POST** `/api/user/login`

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "data": "login successful",
  "accessToken": "JWT_TOKEN"
}
```

### 👤 Get Current User (Protected)

**GET** `/api/user/current`

**Headers:**

`Authorization: Bearer TOKEN`

---

# 📇 Contact Endpoints (Protected)

All routes below require authentication.

### 📄 Get All Contacts

**GET** `/api/contact`

### 🔍 Get Contact By ID

**GET** `/api/contact/:id`

### ➕ Create Contact

**POST** `/api/contact`

```json
{
  "name": "John Smith",
  "email": "john@gmail.com",
  "adress": "Addis Ababa",
  "phone": "0912345678"
}
```

### ✏️ Update Contact

**PUT** `/api/contact/:id`

### ❌ Delete Contact

**DELETE** `/api/contact/:id`

---

## 🧾 Data Models

### User

| Field    | Type   | Required | Unique |
| :------- | :----- | :------- | :----- |
| username | String | ✅       | ✅     |
| email    | String | ✅       | ✅     |
| password | String | ✅       | ❌     |

### Contact

| Field   | Type     | Required | Unique |
| :------ | :------- | :------- | :----- |
| user_id | ObjectId | ✅       | ❌     |
| name    | String   | ✅       | ❌     |
| email   | String   | ✅       | ✅     |
| adress  | String   | ✅       | ❌     |
| phone   | String   | ✅       | ✅     |

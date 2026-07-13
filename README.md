# 💼 Freelance Gig Management System

A simple full-stack web app where freelancers can post, browse, edit, and delete freelance "gigs" (projects). Built with **Node.js + Express** on the backend and **vanilla HTML/CSS/JavaScript** on the frontend, using **JWT authentication**.

> ⚠️ This project uses an **in-memory data store** (plain JavaScript arrays) instead of a real database. All data resets when the server restarts. It's built for learning/demo purposes.

---

## ✨ Features

- User registration & login with hashed passwords (bcrypt)
- JWT-based authentication for protected actions
- Create, view, update, and delete gigs
- Only the gig's creator sees Edit/Delete options on their own gigs
- Request logging middleware
- Centralized error handling
- Input validation for auth and gig data

---

## 🛠 Tech Stack

**Backend:** Node.js, Express.js, bcrypt, jsonwebtoken

**Frontend:** HTML, CSS, vanilla JavaScript (ES modules, `fetch` API)

**Data storage:** In-memory arrays (no database)

---

## 📁 Project Structure

```
freelance-gig-management-system/
├── app.js                  # App entry point, middleware & route setup
├── package.json
│
├── routes/
│   ├── authRoutes.js        # /api/auth routes
│   └── gigRoutes.js         # /api/gigs routes
│
├── controllers/
│   ├── authController.js    # Register & login logic
│   └── gigController.js     # Gig CRUD logic
│
├── models/
│   ├── User.js               # In-memory user store
│   └── Gig.js                 # In-memory gig store
│
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   ├── loggerMiddleware.js   # Request logger
│   └── errorMiddleware.js    # Central error handler
│
├── validators/
│   ├── authValidator.js      # Register/login validation
│   └── gigValidator.js       # Gig data validation
│
└── public/
    ├── index.html
    ├── css/style.css
    └── js/
        ├── api.js             # Fetch wrapper
        ├── auth.js            # Auth helpers (login/register/logout)
        └── gig.js             # Gig CRUD + UI rendering
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/freelance-gig-management-system.git
cd freelance-gig-management-system

# Install dependencies
npm install
```

### Run the app

```bash
npm start
```

Then open your browser at:

```
http://localhost:3000
```

---

## 🔑 API Endpoints

### Auth

| Method | Endpoint             | Description         | Auth Required |
|--------|-----------------------|----------------------|----------------|
| POST   | `/api/auth/register`  | Register a new user  | No             |
| POST   | `/api/auth/login`     | Log in & get a token | No             |

### Gigs

| Method | Endpoint          | Description        | Auth Required |
|--------|--------------------|---------------------|----------------|
| GET    | `/api/gigs`        | Get all gigs        | No             |
| GET    | `/api/gigs/:id`     | Get a single gig     | No             |
| POST   | `/api/gigs`         | Create a new gig     | Yes            |
| PUT    | `/api/gigs/:id`     | Update a gig         | Yes            |
| DELETE | `/api/gigs/:id`     | Delete a gig         | Yes            |

For protected routes, send the token in the request header:

```
Authorization: Bearer <your_token>
```

---

## 📝 Gig Object Shape

```json
{
  "id": "1234567890",
  "title": "Build a landing page",
  "clientName": "Acme Corp",
  "budget": 500,
  "status": "Available",
  "userId": "1111111111"
}
```

`status` must be one of: `Available`, `In Progress`, `Completed`.

---

## ⚠️ Known Limitations

- **No persistent database** — data is lost on server restart.
- **Hardcoded JWT secret key** — should be moved to an environment variable (`.env`) before any real-world use.
- **No backend ownership check** on update/delete routes — only the frontend UI hides Edit/Delete buttons for other users' gigs. A user with a valid token could technically edit or delete gigs they don't own via a direct API call.

---


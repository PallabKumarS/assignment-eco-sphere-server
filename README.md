# Eco Sphere Server

A backend API built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL** for managing eco-friendly ideas and contributions.

---

## 🧰 Tech Stack

- **Backend Framework:** Node.js + Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **UUID:** Used as primary keys for all tables

---

## 🔧 Setup Guide

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- Package Manager (npm or yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/PallabKumarS/assignment-09-eco-sphere-server.git

cd assignment-09-eco-sphere-server
```

### 2. Install Dependencies

To install dependencies:

```bash
bun install
```

To run the server:

```bash
bun run dev
```

## Environment Variables

Create a `.env` file and configure the following:

```
DATABASE_URL="your postgresql connection string"
NODE_ENV="development"
PORT=5000
```

## API Routes

### Categories

```
POST   /api/auth/register         – Register a new user

POST   /api/auth/login            – Login user

PATCH  /api/auth/change-password  – Change user password

POST   /api/auth/refresh-token    – Refresh access token


```

### Categories

```
GET    /api/categories            – Get all categories

GET    /api/categories/:id        – Get category by ID

POST   /api/categories            – Create a new category (Admin only)

PATCH  /api/categories/:id        – Update a category (Admin only)

DELETE /api/categories/:id        – Delete a category (Admin only)


```

### Users

```
GET    /api/users                 – Get all users (Admin only)

GET    /api/users/me              – Get logged-in user's profile

GET    /api/users/:id             – Get user by ID

GET    /api/users/:id/ideas       – Get all ideas by a user

GET    /api/users/:id/purchases   – Get user's purchases

PATCH  /api/users/:id             – Update user info

PATCH  /api/users/:id/status      – Change user account status

PATCH  /api/users/:id/role        – Change user role

DELETE /api/users/:id             – Delete user (Admin only)



```

### Ideas

```
POST   /api/ideas                 – Submit a new idea (Member only)

GET    /api/ideas                 – Get all ideas

GET    /api/ideas/personal        – Get logged-in user's ideas

GET    /api/ideas/:id             – Get an idea by ID

PATCH  /api/ideas/:id             – Update an idea (Author/Admin only)

DELETE /api/ideas/:id             – Delete an idea (Author/Admin only)

PATCH  /api/ideas/:id/status      – Change idea status (Admin only)

GET    /api/ideas/:id/votes       – Get votes on an idea
```

### Comments

```
GET    /api/comments/:id          – Get all comments for an idea

POST   /api/comments/:ideaId      – Add a comment (Member only)

POST   /api/comments/:parentId/reply – Reply to a comment

PATCH  /api/comments/:id          – Update a comment (Author/Admin)

DELETE /api/comments/:id          – Delete a comment (Author/Admin)

```

### Votes

```
POST   /api/votes/:id/vote        – Vote on an idea (Member only)

DELETE /api/votes/:id/vote        – Remove vote from an idea
```

### Payments

```
GET    /api/payments              – Get all payment records

GET    /api/payments/:id          – Get a single payment

POST   /api/payments              – Create a payment

POST   /api/payments/:id/verify   – Verify a payment
```

## 👥 Contributors

- [Pallab Kumar Sarker](https://github.com/PallabKumarS)
- [Manjur Morshed](https://github.com/theMorshed)

---

## Live Server

[Backend Live Link](https://pks-eco-sphere-server.vercel.app)

[GitHub Repository](https://github.com/PallabKumarS/assignment-09-eco-sphere-server)

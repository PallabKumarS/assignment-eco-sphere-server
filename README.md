# Bike Service Management System

A backend API built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL** for managing customers, bikes, and service records in a bike servicing center.

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
git clone https://github.com/PallabKumarS/assignment-08-prisma.git

cd assignment-08-prisma

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
DATABASE_URL="your mongodb uri"
NODE_ENV="development"
PORT=5000
```

## API Routes

### Customers Management

```
POST /api/customers – Create a new customer

GET /api/customers – Get all customers

GET /api/customers/:customerId – Get customer by ID

PUT /api/customers/:customerId – Update customer

DELETE /api/customers/:customerId – Delete customer
```

### Bikes Management

```
POST /api/bikes – Add a bike

GET /api/bikes – List all bikes

GET /api/bikes/:bikeId – Get a bike by ID
```

### Service Records Management

```
POST /api/services – Create service record

GET /api/services – List all service records

GET /api/services/:serviceId – Get service record

PUT /api/services/:serviceId/complete – Mark service as completed

GET /api/services/status – List pending or overdue services (older than 7 days)

```

## Live Server

[Backend Live Link](https://pks-assignment-08-prisma.vercel.app)

[GitHub Repository](https://github.com/PallabKumarS/assignment-08-prisma)

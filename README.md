# Notes API

A RESTful Notes API built with **Node.js**, **Express**, **Prisma**, **PostgreSQL**, **JWT**, **bcrypt**, and **Zod**.  
It supports user authentication and authenticated note management.

## Features

- User registration and login
- Password hashing with `bcrypt`
- JWT authentication
- Notes CRUD operations
- Request validation with `Zod`
- Centralized error handling
- PostgreSQL database with Prisma ORM

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JSON Web Token
- bcrypt
- Zod

## Project Structure

```text
notes_api/
├─ app.js
├─ config/
├─ controllers/
├─ middleware/
├─ prisma/
├─ routes/
├─ validations/
└─ README.md
```

## Prerequisites

Make sure you have the following installed:

- Node.js
- PostgreSQL
- npm

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/your_database?schema=public"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"
```

## Installation

```bash
npm install
```

## Prisma Setup

Generate Prisma Client after installing dependencies or changing the schema:

```bash
npx prisma generate
```

If you change the database schema, run a migration:

```bash
npx prisma migrate dev --name init
```

## Running the Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Base URL

```text
http://localhost:3000/api
```

## Authentication Endpoints

### Register User

`POST /api/auth/register`

**Body:**

```json
{
  "name": "Abdallah",
  "email": "abdallah@example.com",
  "password": "123456"
}
```

**Success Response:**

```json
{
  "message": "User registered successfully!",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "...",
    "name": "Abdallah",
    "email": "abdallah@example.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Login User

`POST /api/auth/login`

**Body:**

```json
{
  "email": "abdallah@example.com",
  "password": "123456"
}
```

**Success Response:**

```json
{
  "message": "Login successful!",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "...",
    "name": "Abdallah",
    "email": "abdallah@example.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Notes Endpoints

All note routes are protected and require a valid JWT token.

### Create Note

`POST /api/notes/create`

**Headers:**

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

**Body:**

```json
{
  "title": "My first note",
  "content": "This is the note content"
}
```

### Get All Notes

`GET /api/notes/all`

**Headers:**

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### Update Note

`PUT /api/notes/update/:id`

**Headers:**

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

**Body:**

```json
{
  "title": "Updated title",
  "content": "Updated content"
}
```

### Delete Note

`DELETE /api/notes/delete/:id`

**Headers:**

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Validation

Request validation is handled using **Zod**:

- `registerSchema` validates name, email, and password
- `loginSchema` validates email and password

Invalid requests return a `400` response with validation errors.

## Error Handling

The app uses a global error handler to return consistent error responses.

## Example Postman Headers

For protected routes, add this header:

```text
Authorization: Bearer <token>
```

For JSON requests, use:

```text
Content-Type: application/json
```

## Notes

- Make sure PostgreSQL is running before starting the app.
- Run `npx prisma generate` after any Prisma schema update.
- If you change `.env`, restart the server.

## License

This project is for learning and personal use.

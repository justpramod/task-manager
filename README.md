
# Task Manager

A simple RESTful Task Manager API built with Node.js, Express and MongoDB. Supports user authentication and CRUD operations for tasks.

## Features

- User registration and login (JWT authentication)
- Create, read, update, and delete tasks
- Task ownership: each user manages their own tasks
- Protected routes via middleware

## Tech Stack

- Node.js
- Express
- MongoDB / Mongoose
- JSON Web Tokens (JWT)

## Quick Start

Prerequisites: Node.js and MongoDB (local or Atlas).

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with the following variables:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

3. Run the app

```bash
npm run dev
# or
npm start
```

## Project Structure

- [app.js](app.js) — application entry point
- [routes/auth.js](routes/auth.js) — authentication routes (register/login)
- [routes/tasks.js](routes/tasks.js) — task CRUD routes
- [models/User.js](models/User.js) — User model
- [models/Task.js](models/Task.js) — Task model
- [middleware/protect.js](middleware/protect.js) — route protection middleware

## API Endpoints

Authentication

- POST `/api/auth/register` — register a new user
- POST `/api/auth/login` — log in and receive a JWT

Tasks (protected — require `Authorization: Bearer <token>`)

- GET `/api/tasks` — list authenticated user's tasks
- POST `/api/tasks` — create a new task
- GET `/api/tasks/:id` — get a specific task
- PUT `/api/tasks/:id` — update a task
- DELETE `/api/tasks/:id` — delete a task

## Models (summary)

- User: `name`, `email` (unique), `password` (hashed)
- Task: `title`, `description`, `completed` (boolean), `user` (ObjectId ref to User), timestamps

## Environment Variables

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — port to run the server (default 5000)

## Contributing

Feel free to open issues or pull requests. Keep changes focused and add tests where relevant.

## License

This project is provided as-is. Add a license file if you want to specify usage terms.


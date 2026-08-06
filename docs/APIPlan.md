# API Plan

## User Routes

### GET /users

Show all users.

### POST /users

Add a new user.

### PUT /users/:id

Update user information.

### DELETE /users/:id

Delete a user.

---

## Workout Routes

### GET /workouts

Show all workouts.

### POST /workouts

Add a new workout.

### PUT /workouts/:id

Update a workout.

### DELETE /workouts/:id

Delete a workout.

---

## Progress Routes

### GET /progress

Show all progress records.

### POST /progress

Add a new progress record.

---

## Extra Route

### GET /juicereport

Generate a fitness report.

---

# Express Architecture Plan

The backend of the GymTracker application will be developed using Express.js and TypeScript. The project is organized into different folders to keep the code simple, readable, and easy to maintain.

src
|
| routes
|-- controllers
|-- models
|-- app.ts
|-- server.ts


---

# Folder Description

### routes

This folder contains all API routes that receive requests from the frontend and direct them to the appropriate controller.

### controllers

This folder contains the application logic and handles the processing of user requests.

### models

This folder stores the database models used to manage users, workouts, and progress data.

### app.ts

This file configures the Express application by connecting middleware and API routes.

### server.ts

This file starts the Express server and allows the application to accept incoming requests.

---

# Technical Documentation

The backend is planned using Express.js with TypeScript. The frontend communicates with the backend through API routes. When a request is received, it is handled by the appropriate controller, which processes the request and interacts with the database models. This organized structure improves code readability, maintenance, and future scalability of the application.

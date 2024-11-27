
# Fitness App API

A Node.js and Express-based API for managing user workouts.

## Features
- User authentication (login and register).
- Manage workouts: create, retrieve, update, delete, and mark as completed.
- JWT-based authentication.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   node index.js
   ```

## Endpoints

### Authentication
- **POST users/login** - Login with email and password.
- **POST users/register** - Register a new user.

### Workouts (require authentication)
- **POST /workouts/addWorkout** - Create a new workout.
- **GET /workouts/getMyWorkouts** - Retrieve all workouts of the logged-in user.
- **PATCH /workouts/updateWorkout/:id** - Update a specific workout.
- **DELETE /workouts/deleteWorkout/:id** - Delete a specific workout.
- **PATCH /workouts/completeWorkoutStatus/:id** - Mark a workout as completed.

## Sample User

Use the following credentials to test:
```json
{
  "email": "gerald@mail.com",
  "password": "testpass"
}
```

## Notes
- Use a JWT token in the `Authorization` header for all workout routes.
- Replace `<workoutId>` with the actual workout ID for update, delete, and complete routes.

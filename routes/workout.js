const express = require('express');
const router = express.Router();
const {
  createWorkout,
  getMyWorkouts,
  updateWorkout,
  deleteWorkout,
  completeWorkout,
} = require('../controllers/workout');
const authMiddleware = require('../auth').verify; // Ensure proper import

// Create a new workout
router.post('/addWorkout', authMiddleware, createWorkout);

// Get all workouts for the logged-in user
router.get('/getMyWorkouts', authMiddleware, getMyWorkouts);

// Update a workout
router.patch('/updateWorkout/:id', authMiddleware, updateWorkout);

// Delete a workout
router.delete('/deleteWorkout/:id', authMiddleware, deleteWorkout);

// Mark a workout as completed
router.patch('/completeWorkoutStatus/:id', authMiddleware, completeWorkout);

module.exports = router;

const Workout = require('../models/Workout');

// Create a new workout
exports.createWorkout = async (req, res) => {
  try {
    const { name, duration } = req.body;

    // Validate required fields
    if (!name || !duration) {
      return res.status(400).json({ error: 'Name and duration are required' });
    }

    const newWorkout = new Workout({
      userId: req.user.id, // Ensure req.user is populated by middleware
      name,
      duration,
    });

    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create workout' });
  }
};

// Get all workouts for the logged-in user
exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });

    // If no workouts found
    if (!workouts.length) {
      return res.status(404).json({ message: 'No workouts found' });
    }

    res.status(200).json({ workouts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

// Update a workout
exports.updateWorkout = async (req, res) => {
  try {
    const { name, duration } = req.body;

    // Validate required fields
    if (!name || !duration) {
      return res.status(400).json({ error: 'Name and duration are required' });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { name, duration },
      { new: true }
    );

    // If workout not found
    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout updated successfully', updatedWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update workout' });
  }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);

    // If workout not found
    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};

// Mark a workout as completed
exports.completeWorkout = async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );

    // If workout not found
    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout status updated successfully', updatedWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update workout status' });
  }
};

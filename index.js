const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS middleware

require("dotenv").config();

const app = express();

app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin:admin123@wdc028-b461.n4ncf.mongodb.net/fitness-app?retryWrites=true&w=majority&appName=WDC028-B461", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Routes Middleware
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas")
);

if (require.main === module) {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`API is now online on port ${process.env.PORT || 5000}`);
  });
}

module.exports = { app, mongoose };

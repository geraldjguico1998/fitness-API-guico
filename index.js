const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS middleware

require("dotenv").config();

const app = express();

// Updated CORS settings with correct origin
const allowedOrigins = [
  "http://localhost:3000", // For local development
  "https://fitness-app-client-g4wcayay9-geralds-projects-60bc6630.vercel.app" // Your actual Vercel deployment URL
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://admin:admin123@wdc028-b461.n4ncf.mongodb.net/fitness-app?retryWrites=true&w=majority&appName=WDC028-B461",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Routes Middleware
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas")
);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`API is now online on port ${PORT}`);
  });
}

module.exports = { app, mongoose };

const express = require("express");
const userController = require("../controllers/user");
const auth = require('../auth'); // Assuming `auth` middleware for authentication

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/details", auth.verify, userController.getProfile);

module.exports = router;
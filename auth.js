const jwt = require("jsonwebtoken");

module.exports.verify = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
  
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ auth: "Failed", message: "No token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Token verified successfully:", verified);
    req.user = verified; // Attach user payload to the request object
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ auth: "Failed", message: "Invalid token" });
  }
};

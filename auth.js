const jwt = require("jsonwebtoken");

module.exports.verify = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    console.log("Authorization header missing.");
    return res.status(401).json({ auth: "Failed", message: "No token provided." });
  }

  // Extract the token
  const token = authorizationHeader.startsWith("Bearer ")
    ? authorizationHeader.slice(7).trim()
    : authorizationHeader.trim();

  // Log the extracted token for debugging
  console.log("Received token:", token);

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(403).json({ auth: "Failed", message: "Invalid or expired token." });
    }

    // Log the decoded token for debugging
    console.log("Token successfully verified. User payload:", decodedToken);

    req.user = decodedToken; // Attach decoded token to request
    next(); // Proceed to the next middleware
  });
};

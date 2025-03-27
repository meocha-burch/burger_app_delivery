import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // ✅ Ensure token exists
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

export default verifyToken; // ✅ Correct ES Module export



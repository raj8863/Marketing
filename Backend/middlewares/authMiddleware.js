import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "Access Denied: No Token Provided" });

  try {
    // If the token starts with "Bearer ", extract only the hash
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attaches { id: user._id } to the request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Session Expired or Invalid Token" });
  }
};
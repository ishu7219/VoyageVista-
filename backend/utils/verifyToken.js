import jwt from "jsonwebtoken";

// ✅ Middleware: verify token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ success: false, message: "You're not authorized" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Token is invalid or expired" });
    req.user = user;
    next();
  });
};

// ✅ Middleware: verify user (optional)
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.body.userId || req.user.role === "admin") next();
    else return res.status(401).json({ success: false, message: "You're not authenticated" });
  });
};

// ✅ Middleware: verify admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") next();
    else return res.status(401).json({ success: false, message: "You're not authorized" });
  });
};

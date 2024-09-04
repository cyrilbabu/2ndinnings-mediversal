import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
  
    jwt.verify(token, process.env.SECRET_KEY || "default_secret", (err, decoded) => {
      if (err) return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
  
      req.user = decoded;
      res.locals.user = decoded; // Pass the user info to the response
      next();
    });
  };
  

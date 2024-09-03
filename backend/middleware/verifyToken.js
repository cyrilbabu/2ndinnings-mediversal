import jwt from "jsonwebtoken"


export const verifyToken =async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    }
    try{
        const decode = jwt.verify(
            token,
            process.env.SECRET_KEY || "default_secret"
        );
        req.user = decode
    }catch(error){
        return res.status(400).json({ success: false, message: "Invalid token" });
    }
}



export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.userRole)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient role' });
      }
      next();
    };
  };
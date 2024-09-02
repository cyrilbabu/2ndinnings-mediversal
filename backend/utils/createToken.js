import jwt from 'jsonwebtoken'




export const createToken = (id,role)=>{


  return jwt.sign({id,role},process.env.SECRET_KEY || "default_secret",{
    expiresIn:"3d"
  })

}
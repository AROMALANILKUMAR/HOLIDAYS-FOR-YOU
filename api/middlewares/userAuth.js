const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSecret =process.env.JWT_SECRET;
console.log(jwtSecret);
module.exports=async (req,res,next)=>{
    try {
        
        if(!req.headers.authorization){
          throw Error("no token")
        }
        let token = req.headers.authorization.split(' ')[1]
        if(!token || token == 'null') {
          throw error ('user token required')
        }
        const decoded = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decoded.id,{password: 0 })
        if(!user){
          throw Error ('user not exist')
        }
        // res.json({id:user._id,name:user.name,email:user.email,token:token})
        req.userId=user._id
        next()
      } catch (error) {
        console.log(error)
      }
}
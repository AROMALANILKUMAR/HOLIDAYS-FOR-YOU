
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

require("dotenv").config();


const jwtSecret = process.env.JWT_SECRET;



const registerPage = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const bcryptSalt = await bcrypt.genSalt(10);
      const userDoc = await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      console.log(e);
      res.status(422).json(e);
    }
  }

  
const loginPage = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await UserModel.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        const token = await jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          },
          jwtSecret,
          {});
          console.log("token",token)
        res.json({
          user: userDoc,
          token: token,
          message: "login successfull",
          
        });
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.json("not found");
    }
  } catch (error) {
    console.log("login",error);
  }
}


const profilePage=async(req, res) => {
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
    res.json({id:user._id,name:user.name,email:user.email,token:token})
  } catch (error) {
    console.log("profilePage",error)
  }
}



  module.exports={
    registerPage,
  loginPage,
  profilePage
}
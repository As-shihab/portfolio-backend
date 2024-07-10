
const express = require('express')
const User =  require("../Models/User")
const router =  express.Router()
const jwt = require("jsonwebtoken")
const middleware = require("../middleware/checkauth")

router.post('/signup' , async (req , res)=>{
    try{
    

      const check = await User.find({email:req.body.email});
      if(check.length > 0 ) {
        return res.json({signup: false , message: "User already exist"})
      }
   else{
    const create = await User.create(req.body)
   const token =await jwt.sign({name:create.name , email: create.email , id: create._id} ,process.env.AUTH_SECRET ,{expiresIn: 60*60*60})
    if(create) return res.status(200).json({signup: true ,token: token})
   }
    }
    catch(err){
        return res.json({status:false , err})
    }
})


router.post('/login' , async (req , res)=>{
  if(req.body.email=="" || req.body.password==""){
    return res.json({message:"fill the inputs"})
  }
  else{
  
    try{
      const getUser = await User.find({email: req.body.email , password: req.body.password})
      if(!getUser[0].email==""){
        const token = await jwt.sign({user: getUser.name , email:getUser.email , id: getUser._id} , process.env.AUTH_SECRET , {expiresIn : 60*60*60})
        return res.status(200).json({login:true , token: token})
      }
      else{
        return res.json({login: false , msg: "User Not Found"})
      }
    }
    catch(err){
      return res.json({login:false , err})
    }
      


  }
})

router.get("/isauth" , middleware , (req,res)=>{
  return res.json({auth:true})
})



//  update user

router.get("/profile" , (req, res)=>{
return res.json(req.headers)
})









module.exports = router
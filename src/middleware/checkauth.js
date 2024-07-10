

const jwt = require("jsonwebtoken")
const checkauth = async (req , res , next) =>{
    const token = req.headers['access_token'];
      
    try{
      await jwt.verify(token , process.env.AUTH_SECRET , (err , decoded)=>{
    
         if(err) return res.json({auth:false , msg:"Unauthenticated user"})
          const {id , email , name} = decoded;
            req.id = id;
            req.email = email;
            req.name = name;
            next()
      })
    }

    catch(err){
        next("Auth error" + err)
    }
}


module.exports = checkauth
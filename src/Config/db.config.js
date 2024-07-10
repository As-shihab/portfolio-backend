const mongoose = require('mongoose')

const db = async ()=>{
    await mongoose.connect(process.env.DB)
    .then(res=>{console.log("Database Connected")})
    .catch((err)=>{console.log(err)})
    
}

db();

module.exports = db


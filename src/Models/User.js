const mongoose = require("mongoose")


const UserSchema =new mongoose.Schema({
    name: {
        type:String,
        required:[true , "Fill the name field"]
    },
    email: {
        unique: [true , "User already exist"],
        required:[true , "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        type: String,
        trim:true,
        lowercase: true,
       
    },
    password: {
        required:[true , "Provide password"],
        type:String ,


    }
})


const User =  new mongoose.model('User' , UserSchema)

module.exports = User;


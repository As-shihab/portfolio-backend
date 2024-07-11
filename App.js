const express = require("express")
const App = express()
const cors= require("cors")
require('dotenv').config()
const db = require('./src/Config/db.config')
const auth_router = require('./src/Router/auth')
App.use(express.json())
App.use(cors())
App.use("/Pictures" , express.static("./src/Public"))
const shihab = require("./src/Router/shihab")
const Port = process.env.PORT || 3000
App.listen(Port , ()=>{
    console.log("Server running on")
})

// api creating

App.use("/api/auth", auth_router)
App.use("/api/shihab" , shihab)
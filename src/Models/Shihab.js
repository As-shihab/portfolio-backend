

const mongoose = require('mongoose')


const project_create= new mongoose.Schema({
    file_name: String,
    title: String ,
    url: String ,
    lan: String
})

const new_project = new mongoose.model("project" , project_create)

module.exports = {new_project}
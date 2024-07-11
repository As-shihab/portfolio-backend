const multer = require('multer')
const path = require('path')
const express = require('express')
const router = express.Router()
const {new_project} =require("../Models/Shihab")

const Storage = multer.diskStorage({
    destination: function(req , res , cb){
        cb(null , "src/Public/")
    },
    filename: function(req , file , cb){
        const file_name= Date.now() + path.extname(file.originalname)
        cb(null  , file_name)
    }
})

const upload = multer({storage:Storage})

router.post('/new_project' ,upload.single('cover') ,async (req, res)=>{
  
   const init = await new_project.create({
        title: req.body.title,
        file_name: req.file.path,
        url:req.body.url,
        lan:req.body.lan

    })

    if(init){
        return res.json({deploy: true})
    }
    else{
        return res.json({deploy:false})
    }
  

})

// fetch all projects

router.get('/fetch_projects' ,async (req ,res)=>{
   const fetch_projects =await new_project.find()
     
   if(fetch_projects){
    return res.json({fetch:true , projects: fetch_projects})
   }
   else{
    return  res.json({fetch: false})
   }
})



module.exports = router
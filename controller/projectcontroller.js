const projects = require("../model/projectModel");

exports.addproject=async(req,res)=>{
console.log("inside addproject");
const{title,language,github,website, overview}=req.body
console.log(title,language,github,website, overview);

const projectimage=req.file.filename
console.log(projectimage);

const userId =req.payload
console.log(userId);

try {
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(406).json('project already exist')
    }
    else{
        const newproject =new projects({
            title,language,github,website, overview ,projectimage,userId
        })
        await newproject.save()
        res.status(200).json(newproject)
    }
    
} catch (error) {
    res.status(401).json('project adding failed due to '+error)
}




}

//get all project

exports.getallproject=async(req, res)=>{

    const searchkey =req.query.search

    const query= {
        language:{
         $regex:searchkey , $options:'i'
        }
    }

    try{
        const allprojects=await projects.find(query)
        if(allprojects){
            res.status(200).json(allprojects)

        }
        else{
            res.status(406).json('no projects found')
           
        }
    }
    catch(error){
        res.status(406).json('something went wrong')
         
    }

}

//get home projects

exports.gethomeproject=async(req, res)=>{
    try{
        const homeprojects=await projects.find().limit(3)
        if(homeprojects){
            res.status(200).json(homeprojects)

        }
        else{
            res.status(406).json('no projects found')
           
        }
    }
    catch(error){
        res.status(406).json('something went wrong')
         
    }

}

//get user projects

exports.getuserproject=async(req, res)=>{
    const userId =req.payload
    try{
        const userprojects=await projects.find({userId})
        if(userprojects){
            res.status(200).json(userprojects)

        }
        else{
            res.status(406).json('no projects found')
           
        }
    }
    catch(error){
        res.status(401).json(error)
         
    }

}

//remove user project
exports.removeUserProject=async (req,res)=>{
    const {id}=req.params
    try {
        await projects.findByIdAndDelete({_id:id})
        res.status(200).json('deleted successfully')
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editprojectcontroller=async(req,res)=>{
    const {id}=req.params
    const {title , language ,github , website ,overview ,projectimage}=req.body
    const userId=req.payload
    const uploadedimage= req.file?req.file.filename : projectimage

    try {
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectimage:uploadedimage,
            userId
        },{new:true})

        await existingProject.save()
        res.status(200).json(existingProject)
        
    } catch (error) {
        res.status(401).json(error)
        
    }


}
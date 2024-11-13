//import express 
const express = require('express')

//import multer
const multerconfig = require('./middleware/multermiddleware')

//import usercontroller
const userController= require('./controller/userController')
 
const projectcontroller = require('./controller/projectcontroller')


//importb middleware

const jwtmiddleware = require('./middleware/jwtmiddleware')
//instance router 
const router = new express.Router()


//register
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//addproject
router.post('/addproject',jwtmiddleware,multerconfig.single("projectimage"), projectcontroller.addproject)

//allproject
router.get('/all-project',jwtmiddleware,projectcontroller.getallproject)

//homeproject
router.get('/home-project',projectcontroller.gethomeproject)

//userprojects
router.get('/user-project',jwtmiddleware, projectcontroller.getuserproject)

//remove userprojects
router.delete('/remove-user-project/:id',jwtmiddleware,projectcontroller.removeUserProject)

//edit userprojects
router.put('/update-user-project/:id',jwtmiddleware,multerconfig.single("projectimage"),projectcontroller.editprojectcontroller)

//edit userprojects
router.put('/update-profile',jwtmiddleware,multerconfig.single("profile"),userController.editprofilecontroller)

module.exports = router
const express = require("express")
const doctorcontroller=require('../Controllers/DoctorController')
const admincontroller=require('../Controllers/AdminController')
const route=express.Router()
const path=require("path")
module.exports=route;

let sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid&&req.session.user.isadmin==true) {
        
            next()

        
       
       
    } else {
       
       
        return res.status(403).send('forbidden....')
    }
  };

  //get doctore account
  route.get('/getdoctoreaccount/:mobile',sessionChecker,doctorcontroller.getaccountforadmin)
  //gettimetableforadmin
  route.get('/getdoctoretimetable/:mobile',sessionChecker,doctorcontroller.gettimetableforadmin)
  //update timetable for admin
  route.patch('/updatedoctoretimetable/:mobile',sessionChecker,doctorcontroller.updatetimetableforadmin)
  //active doctore
  route.patch('/activedoctor/:mobile',sessionChecker,doctorcontroller.activedoctore)
  //dactive doctore
  route.patch('/dactivedoctor/:mobile',sessionChecker,doctorcontroller.dactivedoctore)

  //new admin account
  route.post('/newaccount',sessionChecker,admincontroller.newaccount)
  //get admin account
  route.get('/getadminaccount',sessionChecker,admincontroller.getaccount)
  //update admin account
  route.patch('/updateadminaccount',sessionChecker,admincontroller.updateaccount)
  //active admin
  route.patch('/activeadmin',sessionChecker,admincontroller.activeadmin)
  //dactive admin
  route.patch('/dactiveadmin',sessionChecker,admincontroller.dactiveadmin)
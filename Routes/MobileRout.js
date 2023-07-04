const express = require("express")
const mobile=require('../Controllers/moblieController')
const route=express.Router()
module.exports=route;


route.post('/newaccount',mobile.newaccount)
route.post('/login',mobile.login)
route.get('/getDoctors/:address',mobile.getDoctors)
route.get('/showBooking/:mobilePat',mobile.showBooking)
route.patch('/updateaccount/:mobilePat',mobile.updateaccount)



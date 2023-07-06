const express = require("express");
const path=require("path");
require("dotenv").config()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const app = express();
const helmet=require("helmet")
const mongoos = require("mongoose")
const bcrypt=require("bcrypt")
const ejs = require('ejs')
const http = require('http')
const doctor=require('./Model/DoctorModel')
const admin=require('./Model/adminModel')

// set our application port
app.set("port", 4009);
// set morgan to log info about our requests for development use.
app.use(morgan("dev"));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoos.connect("mongodb://0.0.0.0:27017/canser",{

useNewUrlParser:true,
useUnifiedTopology:true,
//useCreateIndex:true,
//useFindAndModify:false

}).then(()=>{

    console.log("connected")
}).catch((err)=>{
console.log(err)

})
app.use(helmet({
    contentSecurityPolicy: false,
  }))
  app.use(cookieParser());

  app.use(
    session({
      key: "user_sid",
      secret: process.env.zoze,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 1800000,
      },
    })
  );
  app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie("user_sid");
    }
    next();
  });
    // middleware function to check for logged-in users
app.get('/sessioncheck', (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    if(req.session.user.isadmin==true){
      res.status(200).send('user is admin')
    }else{
      res.status(201).send('user is doctor')
    }

    
   
   
     
    
  } else {
    
    res.status(403).send('login....')
  }
});

app.post('/login',async(req,res)=>{
  try {
    const user = await doctor.findOne({ email:req.body.email },{isactive:true}).exec();
    const adminuser=await admin.findOne({ email:req.body.email },{isactive:true}).exec();
    if(user){
      const comparpass = await bcrypt.compare(req.body.password, user.password)
      if (!comparpass) {
        return res.status(403).send("invaild username or password");
      
    }
    
      req.session.user = user;
      res.status(200).send('success user')
    }
    else if(adminuser){
      const comparpass2 = await bcrypt.compare(req.body.password, adminuser.password)
      if (!comparpass2) {
        return res.status(403).send("invaild username or password");
          
       
    }
    
      req.session.user = adminuser;
      res.status(201).send('success admin')
    }else{
      return res.status(404).send("not found");
    }
   
} catch (error) {
  console.log(error)
}

})

app.get('/',(req,res)=>{
    res.send("hello")

})

//routs mount
const doctorroute=require("./Routes/DoctoreRout")
app.use('/doctor',doctorroute)
const adminroute=require("./Routes/AdminRout")
app.use('/admin',adminroute)
const mobileroute=require("./Routes/MobileRout")
app.use('/api',mobileroute)

app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.status(200).send('success logout')
  } else {
    res.status(403).send('forbidden')
  }
  });

  app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
    });
   

    const httpServer=http.createServer(app)
// start the express server
httpServer.listen(app.get("port"), () =>
console.log(`App started on port ${app.get("port")}`)
);
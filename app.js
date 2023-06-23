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
app.get('/',(req,res)=>{
    res.send("hello")

})

  app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
    });

    const httpServer=http.createServer(app)
// start the express server
httpServer.listen(app.get("port"), () =>
console.log(`App started on port ${app.get("port")}`)
);
const doctor=require('../Model/DoctorModel')
const path=require("path");

let newaccount=async(req,res)=>{
    res.set("Access-Control-Allow-Origin","*");
    const mybody=req.body
    const newdoc=new doctor(mybody)
}
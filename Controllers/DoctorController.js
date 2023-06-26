const doctor=require('../Model/DoctorModel')
const schedual=require('../Model/scheduleModel')
const path=require("path");

let newaccount=async(req,res)=>{
    res.set("Access-Control-Allow-Origin","*")
    const std = await doctor.findOne({mobile:req.body.mobile}).exec()
    if(!std){
        return res.status(401).send("doctore exist")
    }
    const mybody=req.body
    const newdoc=new doctor(mybody)
  await  newdoc.save().then(()=>{
   
        // res.status(200).send("doctor added successfull")
        /***** */

        // Create a new schedule document
const newSchedule = new schedual({
    doctormobile: req.body.mobile,
    sat: false,
    sattime: {
      startTime: new Date('2023-06-26T09:00:00Z'),
      endTime: new Date('2023-06-26T17:00:00Z'),
    },
    sun: false,
    suntime: {
      startTime: new Date('2023-06-27T09:00:00Z'),
      endTime: new Date('2023-06-27T17:00:00Z'),
    },
    mon: false,
    montime: {
      startTime: new Date('2023-06-28T09:00:00Z'),
      endTime: new Date('2023-06-28T17:00:00Z'),
    },
    tue: false,
    tuetime: {
      startTime: new Date('2023-06-29T09:00:00Z'),
      endTime: new Date('2023-06-29T17:00:00Z'),
    },
    wen: false,
    wentime: {
      startTime: new Date('2023-06-30T09:00:00Z'),
      endTime: new Date('2023-06-30T17:00:00Z'),
    },
    thu: false,
    thutime: {
      startTime: new Date('2023-07-01T09:00:00Z'),
      endTime: new Date('2023-07-01T17:00:00Z'),
    },
    fri: false,
    fritime: {
      startTime: new Date('2023-07-02T09:00:00Z'),
      endTime: new Date('2023-07-02T17:00:00Z'),
    },
  });
 newSchedule.save().then(()=>{
    res.status(200).send("doctor addes sucsess")
 }).catch(()=>{
    for(let e in err.errors){
        console.log(err.errors[e].message)
        res.status(400).send("Bad Request2...")
    }
})

        /******/ 




    }).catch(()=>{
        for(let e in err.errors){
            console.log(err.errors[e].message)
            res.status(400).send("Bad Request...")
        }
    })

}

let getaccount=async(req,res)=>{
    const doc=await doctor.findOne({mobile:req.session.user.mobile}).exec()
    if(!doc){
        return res.status(400).send("notfound")

    }
    res.status(200).send(doc)
}
let getaccountforadmin=async(req,res)=>{
    const doc=await doctor.findOne({mobile:req.body.mobile}).exec()
    if(!doc){
        return res.status(400).send("notfound")

    }
    res.status(200).send(doc)
}

let gettimetableforuser=async(req,res)=>{
    const doc=await schedual.findOne({mobile:req.session.user.mobile}).exec()
    if(!doc){
        return res.status(400).send("notfound")

    }
    res.status(200).send(doc)
}
let gettimetableforadmin=async(req,res)=>{
    const doc=await schedual.findOne({mobile:req.body.mobile}).exec()
    if(!doc){
        return res.status(400).send("notfound")

    }
    res.status(200).send(doc)
}

let updateaccount=async(req,res)=>{
    const body=req.body
    const doc=await doctor.findByIdAndUpdate(req.session.user._id,body).exec()
    if(!doc){
        return res.status(400).send("notfound")

    }
    res.status(200).send('succsess updating')

}
let updatetimetable=async(req,res)=>{
    const body=req.body
    const doc=await schedual.findOneAndUpdate({mobile:req.session.user.mobile},body).exec()
    if(!doc){
        return res.status(400).send("notfound")

    }
    res.status(200).send('succsess updating')

}
let activedoctore=async(req,res)=>{
    const body=req.body
    const doc=await doctor.findOneAndUpdate({mobile:req.session.user.mobile},{isactive:true}).exec()
    if(!doc){
        return res.status(400).send("notfound")

    }
    res.status(200).send('succsess updating')

}
let dactivedoctore=async(req,res)=>{
    const body=req.body
    const doc=await doctor.findOneAndUpdate({mobile:req.session.user.mobile},{isactive:false}).exec()
    if(!doc){
        return res.status(400).send("notfound")

    }
    res.status(200).send('succsess updating')

}

module.exports={newaccount,getaccount,updateaccount,updatetimetable,activedoctore,dactivedoctore,gettimetableforadmin,gettimetableforuser,getaccountforadmin}
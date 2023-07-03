const bcrypt=require("bcrypt")
const patientmodel=require('../Model/patientModel')
const doctormodel=require('../Model/DoctorModel')
const schedulemodel=require('../Model/scheduleModel')
const bookDocModel=require('../Model/bookDocModel')



// @desc create newaccount for patient
let newaccount=async(req,res)=>{
    res.set("Access-Control-Allow-Origin","*")

    const patient = await patientmodel.findOne({mobile:req.body.mobile,email:req.body.email}).exec()
 
    if(patient){
        return res.status(401).send("patient exist")
    }
    const mybody=req.body
    
    const newPat=new patientmodel(mybody)
    newPat.save().then(()=>{
   
         res.status(200).send("patient added successfull")
        
    }).catch((err)=>{
        for(let e in err.errors){
            console.log(err.errors[e].message)
            res.status(400).send("Bad Request...")
        }
    })

}



// @desc login for patient
let login=async(req,res)=>{
    res.set("Access-Control-Allow-Origin","*")

    const patient = await patientmodel.findOne({ email:req.body.email },{isactive:true}).exec()

    if(patient){
        const comparpass = await bcrypt.compare(req.body.password, patient.password)
        if (!comparpass) {
          return res.status(403).send("invaild username or password");
        
      }
      
      
        res.status(200).send('login successful')
      }else{
        return res.status(404).send("not found");
      }

}




// @desc getDoctors and filter it by address and day
let getDoctors = async(req, res)=>{
   let filterObject={address: req.params.address}
   const doctors=await doctormodel.find(filterObject).sort({rate:-1}).exec()

   if(!doctors){
     return res.status(404).send("not found")
   }


   const newdoctor=doctors.filter(async(item)=>{
    
    const schedule=await schedulemodel.findOne({doctormobile:item.mobile}).exec();
    const day =req.params.day
    const flag=false;
    switch (day) {
        case 'sat':
            if(schedule.sat==true) flag=true;
            break;
        case 'sun':
            if(schedule.sun==true) flag=true;
            break;
         case 'mon':
             if(schedule.mon==true) flag=true;
            break;
            case 'tue':
             if(schedule.tue==true) flag=true;
            break;
            case 'wen':
             if(schedule.wen==true) flag=true;
            break;
            case 'thu':
             if(schedule.thu==true) flag=true;
            break;
            case 'fri':
             if(schedule.fri==true) flag=true;
            break;
    
        default:
            flag=false;
            break;
    }

    return flag;
     
   })

   if(newdoctor){
    res.status(200).send(newdoctor)
   }else{
    res.status(404).send("not found")
   }
}

// @desc booking  
let booking=async(req,res)=>{
    const day=req.body.day;
    const dayOfWeek = 1; 

    switch (day) {
        case 'sat':
            dayOfWeek = 6;
            break;
        case 'sun':
            dayOfWeek = 0;
            break;
         case 'mon':
            dayOfWeek = 1;
            break;
            case 'tue':
                dayOfWeek = 2;
            break;
            case 'wen':
                dayOfWeek = 3;
            break;
            case 'thu':
                dayOfWeek = 4;
            break;
            case 'fri':
                dayOfWeek = 5;
            break;
    
        default:
            dayOfWeek = 6;
            break;
    }

// Define the current date and time
const currentDate = new Date();

// Calculate the number of milliseconds until the next desired day of the week
const millisecondsPerDay = 24 * 60 * 60 * 1000;  // 1 day in milliseconds
const daysToSaturday = 6 - currentDate.getDay();  // Days until next Saturday
const dayDiff = (dayOfWeek + 7 - daysToSaturday - 1) % 7 + 1;
const nextDay = new Date(currentDate.getTime() + dayDiff * millisecondsPerDay);

// Format the next date as a string
const nextDate = nextDay.toISOString().slice(0, 10);  // YYYY-MM-DD format
const date=new Date(nextDate);


     const doctor=await schedulemodel.findOne({doctormobile:req.body.mobileDoc}).exec();
     const myopj=new Date(nextDate)
     switch (day) {
        case 'sat':
            myopj=doctor.sattime.endTime; 
            break;
        case 'sun':
            myopj=doctor.suntime.endTime;
            break;
         case 'mon':
            myopj=doctor.montime.endTime;
            break;
            case 'tue':
                myopj=doctor.tuetime.endTime;
            break;
            case 'wen':
                myopj=doctor.wentime.endTime;
            break;
            case 'thu':
                myopj=doctor.thutime.endTime;
            break;
            case 'fri':
                myopj=doctor.fritime.endTime;
            break;
    
        default:
            myopj=doctor.sattime.endTime;
            break;
    }


    const {mobileDoc,mobilePat} = req.body
    const book=new bookDocModel({mobileDoc,mobilePat,date:date})
    //mobilepat:req.body.mobilepat
    //date:


    // book.save().then(()=>{
    //     res.status(200).send("booking successfull")
    // })
    
}





module.exports={newaccount,login,getDoctors};

//create startandend schema
const mongoose = require('mongoose')
const startAndEndSchema= new mongoose.Schema(
    {
        startTime:{
            type:Date,
            required:true
        },
        endTime:{
            type:Date,
            required:true
        }
    }
)

//create schedule schema
const scheduleSchema= new mongoose.Schema({
    doctormobile:{
        type:String,
        required:true
    },
    sat:{
        type:Boolean,
     
    },
    sattime:startAndEndSchema,
    sun:{
        type:Boolean,
       
    },
    suntime:startAndEndSchema,
    mon:{
        type:Boolean,
       
    },
    montime:startAndEndSchema,
    tue:{
        type:Boolean,
      
    },
    tuetime:startAndEndSchema,
    wen:{
        type:Boolean,
      
    },
    wentime:startAndEndSchema,
    thu:{
        type:Boolean,
       
    },
    thutime:startAndEndSchema,
    fri:{
        type:Boolean,
      
    },
    fritime:startAndEndSchema
})



const schedulemodel=mongoose.model('schedule',scheduleSchema);
module.exports=schedulemodel;
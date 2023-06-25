//create startandend schema
const startAndEndSchema= new mongoose.schema(
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
const scheduleSchema= new mongoose.schema({
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
    thuime:startAndEndSchema,
    fri:{
        type:Boolean,
      
    },
    fritime:startAndEndSchema
})



const schedulemodel=mongoose.model('schedule',scheduleSchema);
module.exports=schedulemodel;
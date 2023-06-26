// fun for validateEmail
const validateEmail = (email)=> {
    const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return valid.test(email)
};
const mongoose = require('mongoose')




//create shcema for doctor
const doctorSchema= new mongoose.schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        mobile:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate: validateEmail,
        },
        address:{
            type:String,
            required:true,
        },
        dateOfBirth:{
            type:Date,
            required:true
        },
        doctorDepartment:{
            type:String,
            required:true
        },
        specialist:{
            type:String,
            required:true
        },
        doctorImage:{
            type:String,
            required:true
        },
        Nid:{
           type:String,
           required:true,
           unique:true
        },
        NidPhoto:{
            type:String,
            required:true
        },
        shortBiography:{
            type:String,
        },
        gender:{
            enum:["male","female"],
            required:true
        },
        password:{
            type:String,
            required:true
        },
        isadmin:{
            type:Boolean,
            default:false
        },
        isactive:{
            type:Boolean,
            default:false
        }


    }
)
doctorSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const doctormodel=mongoose.model('doctor',doctorSchema);
module.exports=doctormodel;

 
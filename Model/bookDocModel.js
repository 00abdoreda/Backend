const mongoose = require('mongoose')


const bookDoc=new mongoose.Schema({
    mobileDoc:{
        type:String,
        required:true
    },
    mobilePat:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:Date,
        required:true
    }
})


module.exports=mongoose.model('book',bookDoc);
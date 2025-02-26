const mongoose=require('mongoose')
const { type } = require('os')

const userSchema=mongoose.Schema({
email:{
    type:String,
    required:[true,'Email is required'],
    trim:true,
    unique:[true,'Email must be unique'],
    minLength:[5,'Email must have 5 characters'],
    lowercase:true
},
password:{
    type:String,
    required:[true,"Password must be provide"],
    trim:true,
    select:false,
},
verified:{type:Boolean,default:false},
verificationCode:{type:String,select:false},
verificationCodeValidation:{type:String,select:false},
forgotPasswordCode:{type:String,select:false},
forgotPasswordCodeValidation:{type:String,select:false},
},{timestamps:true})


module.exports=mongoose.model("User",userSchema)
const mongoose=require('mongoose')

const userschema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    profilepic:{
        type:String,
        default:""
    }
},{timestamps:true})

const user=mongoose.model('User',userschema)

module.exports=user
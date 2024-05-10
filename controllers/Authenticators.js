const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/user')

module.exports.login=async (req,res)=>{

    const {username,password}=req.body

    const user=await User.findOne({username})
    
    
    if(!user){
        return res.status(401).json({
            success:false,
            msg:"user does not exist!!"
        })
    }

    const comparedpassword=bcrypt.compare(password,user.password)

    if(!comparedpassword){
       return res.status(401).json({
        success:false,
        msg:"Invalid credentials"
       })
    }
    

    res.status(200).json({
        success:true,
        msg:"user logged in successfully",
        token,
        user:{
            username:user.username,
            phonenumber:user.phonenumber
        }
    })
    

}
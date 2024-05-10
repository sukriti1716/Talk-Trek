const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const secretkey=process.env.SECRET_KEY
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

    const token=jwt.sign({id:user._id},secretkey,{expiresIn:"24h"})

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

module.exports.register=async (req,res)=>{

    try{
        const {username,password,email,phonenumber}=req.body

        const hashedpassword= await bcrypt.hash(password,10)
        const user=await User.create({username,password:hashedpassword,email,phonenumber})
        
        // const token=jwt.sign({id:user._id},secretkey,{expiresIn:"24h"})
        
        res.status(200).json({
            success:true,
            msg:"user registered successfully"
        })
    }
    catch(err){
        console.log(error)
    }


    

}
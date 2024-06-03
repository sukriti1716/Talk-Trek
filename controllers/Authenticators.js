const express=require('express')
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

    const userdetails={
        username:user.username,
        phonenumber:user.phonenumber,
        id:user._id
    }

    const token=jwt.sign(userdetails,secretkey,{expiresIn:"24h"})


    res.status(200).json({
        success:true,
        msg:"user logged in successfully",
        token
       
    })
    

}

module.exports.register=async (req,res)=>{

    try{
        const {username,password,email,phonenumber}=req.body

        const hashedpassword= await bcrypt.hash(password,10)
        const usernamearray=username.split(" ")
        const profilepic=`https://avatar.iran.liara.run/username?username=${usernamearray[0]}+${usernamearray[1]}`
        // const profilepic=`https://avatar.iran.liara.run/username?username=${username}&bold=false&length=1`
        const user=await User.create({username,password:hashedpassword,email,phonenumber,profilepic})
        
        // const token=jwt.sign({id:user._id},secretkey,{expiresIn:"24h"})

        
        res.status(201).json({
            success:true,
            msg:"user registered successfully"
        })
    }
    catch(err){
        console.log(err)
    }


    

}

module.exports.verificationuserdetails= (req,res)=>{
    res.status(200).json({
        username:req.user.username,
        phonenumber:req.user.phonenumber,
        email:req.user.email,
        profilepic:req.user.profilepic,
        _id:req.user._id
    })
}
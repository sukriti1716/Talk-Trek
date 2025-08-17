const express=require('express')
const Message=require('../models/messages')
const {io}=require('../app')

// adding a message

module.exports.addmessage=async(req,res)=>{
    try{
        const {message,sender,reciever}=req.body

        if (!message || !sender || !reciever) {
            return res.status(400).json({
                success: false,
                msg: "Message, sender, and receiver are required"
            });
        }

        const newmessage=await Message.create({
            message:message,
            users:[sender,reciever],
            sender:sender,
            messagetime: (new Date()).toLocaleTimeString()
        })
        // console.log(newmessage)

        // io.emit('newmessage', newmessage);

        res.status(200).json({
            success:true,
            msg:"msg added successfully",
            newmessage
        })
    }
    catch(err){
        res.status(401).json({
            success:false,
            msg:"messsage not added",
            err
        })
    }
    
}

// get messages

module.exports.getmsg=async(req,res)=>{

    try{
        const {senderid,recieverid}=req.params

        if ( !senderid || !recieverid) {
            return res.status(400).json({
                success: false,
                msg: " sender, and receiver are required"
            });
        }
        
        const messages=await Message.find({
            users:{$all:[senderid,recieverid]}
        }).populate('sender');

        console.log(messages);
    
        res.status(200).json({
            success:true,
            messages
        })
    }
    catch(err){
        res.status(401).json({
            success:false,
            msg:"no message",
            err
        })
    }

  
}
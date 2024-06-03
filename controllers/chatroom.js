
const Chatroom=require('../models/chatroom')

// create a chatroom

module.exports.createchatroom=async(req,res)=>{
    const {chatroomname}=req.body
    
    const newChatRoom=chatroomname
    const chattingroom=await Chatroom.findOne({chatroomname})
    if(chattingroom){
        return res.status(401).json({
            success:false,
            msg:"Chatroom already exists",
           
           
        })
    }
    await Chatroom.create({chatroomname});

    const chatrooms=await Chatroom.find({});
   

    res.status(200).json({
        success:true,
        msg:"Chatroom created successfully",
        chatrooms,
        newChatRoom
    })

   
}

module.exports.getchatroom=async(req,res)=>{
   
    const chatrooms=await Chatroom.find({});
   
    res.json({
        success:true,
        msg:"all chatrooms",
        chatrooms
        
    })
}
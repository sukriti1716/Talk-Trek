const mongoose=require('mongoose')

const chatroomschema=mongoose.Schema({
    chatroomname:{
        type:String,
        required:true
    }
})

const Chatroom=mongoose.model('Chatroom',chatroomschema)

module.exports=Chatroom;
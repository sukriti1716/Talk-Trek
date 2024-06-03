const mongoose=require('mongoose')


const messageschema=mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    users:[String],
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    messagetime:{
        type:String
    }
})

const Message=mongoose.model('Message',messageschema)

module.exports=Message
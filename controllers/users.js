
const User=require('../models/user')


// getallusers
module.exports.getallusers=async(req,res)=>{
    // getting from query
    // const name=req.query.name;

    const users=await User.find({_id:{$ne:req.user._id}})
    res.status(200).json({
        success:true,
        users
    })
}
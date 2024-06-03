// const jwt=require('jsonwebtoken')
// const User=require('../controllers/users')

// verifyuser=async (req,res,next)=>{

//     let token;
//     try{
//         if(req.headers.authorization && req.headers.authorization.startsWith(Bearer)){

//             token=req.headers.authorization.split(" ")[1]
//             const verifieddata=jwt.verify(token,process.env.SECRET_KEY)
//             console.log(verifieddata)
//             req.user=await User.findById(verifieddata).select("password")
//             console.log(req.user)
//             next()
        
//         }
//     }
//     catch(err){
//         res.status(401).json({
//             success:false,
//             msg:"not authorized",
//             err:err
//         })
//     }
    
  
// }

// module.exports={verifyuser}

const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.verifyuser = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];
            const verifieddata = jwt.verify(token, process.env.SECRET_KEY);
            // console.log("Verified data:", verifieddata);
            req.user = await User.findById(verifieddata.id)
            next();
        } else {
            throw new Error("Authorization header is missing or invalid");
        }
    } catch (err) {
        console.error("Authorization error:", err);
        res.status(401).json({
            success: false,
            msg: "not authorized",
            err: err.message
        });
    }
}

const express=require("express")
const router=express.Router()
const {addmessage,getmsg}=require('../controllers/Message')
const {verifyuser}=require('../middlewares/verifyuser')

router.route('/addmsg').post(verifyuser,addmessage)
router.route('/getmsg/:senderid/:recieverid').get(verifyuser,getmsg)

module.exports=router
const express=require('express')
const router=express.Router()
const {createchatroom,getchatroom}=require('../controllers/chatroom')
const {verifyuser}=require('../middlewares/verifyuser')


router.route('/createchatroom').post(verifyuser,createchatroom);
router.route('/getchatroom').get(verifyuser,getchatroom)

module.exports=router
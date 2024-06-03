const express=require('express')
const router=express.Router()
const {verifyuser}=require('../middlewares/verifyuser')
const {getans}=require('../controllers/GeminiAi')

router.route('/getans').post(verifyuser,getans)

module.exports=router
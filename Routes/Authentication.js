const express=require('express')
const router=express.Router()
const {login,register,verificationuserdetails}=require('../controllers/Authenticators')
const {getallusers}=require('../controllers/users')
const {verifyuser}=require('../middlewares/verifyuser')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/getalluser').get(verifyuser,getallusers)
router.route('/verification').get(verifyuser,verificationuserdetails)

module.exports=router
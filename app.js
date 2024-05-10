require('dotenv').config()
const express=require('express')
const server=express()
const authenticationrouter=require('./Routes/Authentication')
const mongoose=require('mongoose')

mongoose.connect(process.env.DB_URL)
        .then(()=>{ 
            console.log('db connected')
        })
        .catch((err)=>{
            console.log(err)
        })


server.use(express.json())

server.get('/',(req,res)=>{
    res.send('working fine')
})

server.use('/user',authenticationrouter)

const port=process.env.PORT
server.listen(port,()=>{
    console.log(`Server up at ${port}`)
})

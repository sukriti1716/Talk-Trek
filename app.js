require('dotenv').config()
const express=require('express')
const server=express()
const authenticationrouter=require('./Routes/Authentication')
const mongoose=require('mongoose')
const cors=require('cors')

mongoose.connect(process.env.DB_URL)
        .then(()=>{ 
            console.log('db connected')
        })
        .catch((err)=>{
            console.log(err)
        })


server.use(express.json())
server.use(cors('http://localhost:5173'))

server.get('/',(req,res)=>{
    res.send('working fine')
})

server.use('/user',authenticationrouter)

const port=process.env.PORT
server.listen(port,()=>{
    console.log(`Server up at ${port}`)
})

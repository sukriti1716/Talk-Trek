require('dotenv').config()
const express = require('express')
const server = express()
const authenticationrouter = require('./Routes/Authentication')
const chatroomrouter = require('./Routes/Chatroom')
const messagerouter = require('./Routes/Message')
const generativeairouter=require('./Routes/Generativeai')
const Message = require('./models/messages')
const mongoose = require('mongoose')
const cors = require('cors')
const socketIo = require('socket.io')
const http = require('http')
const newserver = http.createServer(server)

const io = socketIo(newserver, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('db connected')

        io.on('connection', (socket) => {
            const userId = socket.handshake.query.userId
            

            console.log(`user ${userId} connected`)

            socket.on('disconnect', () => {
                console.log(`user ${userId} disconnected`)
            })

            socket.on('sendmessage', async (data) => {
                const { messageid,message, sender, reciever } = data;

                // console.log('senderkhdsfkjhsjk:', sender);

                // const myMessage = await Message.find({
                //     users:{$all:[sender,reciever]}
                // }).populate('sender');
                

                const myMessage = await Message.findById(messageid).populate('sender');



                io.emit('message', myMessage);


            })
        })

    })
    .catch((err) => {
        console.log(err)
    })


server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send('working fine')
})


module.exports.io = io
server.use('/user', authenticationrouter)
server.use('/user', chatroomrouter);
server.use('/user', messagerouter)
server.use('/user',generativeairouter)

const port = process.env.PORT
newserver.listen(port, () => {
    console.log(`Server up at ${port}`)
})

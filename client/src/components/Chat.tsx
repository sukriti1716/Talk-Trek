import { useEffect, useState } from "react"
import axios from "../api/axios"
import { Box } from "@mui/material"
import Contacts from "./Contacts"
import Welcome from "./Welcome"
import Chatcontainer from "./Chatcontainer"
import io from "socket.io-client";


const Chat = () => {
    interface userprops{
        username:string,
        phonenumber:number,
        email:string,
        profilepic:string,
        _id:string
    }

    const [usernamedetails,setusernamedetails]=useState<userprops>({
        username:"",
        phonenumber:0,
        email:"",
        profilepic:"",
        _id:""
    })

    const [token,setToken]=useState<string| null>(localStorage.getItem('token'))
    const [socket,setSocket]=useState<any>(null)

    useEffect(()=>{
      const logintoken=localStorage.getItem('token')
      if(logintoken){
          setToken(logintoken)
      }
   },[])

    useEffect(()=>{
      const getuserdetails=async ()=>{
        if(!token){
            return
        }
        const response=await axios.get("/user/verification",{
            headers:{Authorization:`Bearer ${token}`}
        })
        // console.log(response)
        if(response.status===200){
            setusernamedetails({
                username: response.data.username,
                phonenumber: response.data.phonenumber,
                email:response.data.email,
                profilepic:response.data.profilepic,
                _id:response.data._id
            });
            // console.log("hi user")
            // console.log(usernamedetails)
        }
      

    }
    
   getuserdetails()
    
    },[])

    //  socket 

    useEffect(()=>{
      const socket=io(process.env.REACT_APP_SERVERURL as string,{
        query:{userId:usernamedetails._id}
      })
      setSocket(socket)
      
      socket.emit('add-user',usernamedetails._id)

      socket.on('connect', () => {
        console.log('Connected to server');
      });

      return ()=>{
        socket.disconnect()
      }
    },[usernamedetails._id])

    // current chat

    interface contact {
      _id:string,
      username: string,
      profilepic: string,
      password:string,
      email:string,
      phonenumber:number
     
  }
    const [currentchat,setCurrentchat]=useState<contact|null>(null)

    const handlechat=(chat:contact):void=>{
        setCurrentchat(chat)
        // console.log(currentchat)
       
    }


  return (
    <>
      <Box height={"100dvh"} width={"100dvw"} display={"flex"} flexDirection={"column"} justifyContent={"center"}  alignItems={"center"} bgcolor={"#131324"} color={"black"} >
        <Box height={"78dvh"} width={"85dvw"} bgcolor={"rgba(240, 235, 227, .9)"} display={"grid"} gridTemplateColumns={"28% 2% 72%"} >
          <Contacts handlingchat={handlechat}/>
          <div style={{width:"0.5rem",height:"100%",backgroundColor:"rgba(0,0,0,0.6)"}}></div>
          {
            currentchat===null?  <Welcome currentuser={usernamedetails}/> : <Chatcontainer currentuser={usernamedetails} currentchat={currentchat} />
          }
         

        </Box>
      </Box>
 
    </>
  )
}

export default Chat
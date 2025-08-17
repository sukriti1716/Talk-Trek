import { useEffect,useState } from "react"
import Chatinput from "./Chatinput";
import Messages from "./Messages";
import axios from "../api/axios";
import socket from './Socket'



interface currentuserProps {
      _id:string,
      username: string;
      phonenumber: number;
      email: string;
      profilepic: string; 
  }

  interface contact {
    _id:string,
    username: string,
    profilepic: string,
    password:string,
    email:string,
    phonenumber:number
   
}

interface ChatcontainerProps {
    currentuser: currentuserProps;
    currentchat: contact ;
}

interface senderprops{
    _id:string,
    username: string,
    profilepic: string,
    password:string,
    email:string,
    phonenumber:number
  }
  
interface messagesprops{
    message:string,
    messagetime:string,
    sender:senderprops,
    users:string[],
    _id:string
  }


const Chatcontainer = ({ currentuser, currentchat }: ChatcontainerProps) => {
    const token=localStorage.getItem("token")

    useEffect(() => {
        // console.log(currentchat);
      }, [currentchat]); 

      
      

      const [message,setMessage]=useState<string>("")
      const [messages,setMessages]=useState<messagesprops[]>([])

      useEffect(()=>{
        const getmessages=async ()=>{
          const response=await axios.get(`/user/getmsg/${currentuser._id}/${currentchat._id}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
       
          setMessages(response.data.messages)
          
        }
    
        getmessages()
      },[currentuser._id,currentchat._id,token])

        // socket connection
        useEffect(()=>{

            socket.on('message',(newmessage:messagesprops)=>{
                console.log('newmessage',newmessage)
                setMessages((prevMessages)=>[...prevMessages,newmessage])
            })

            return ()=>{
                socket.off('message')
            }
        },[socket]);

        

      const handlesendmessage=async (message:string):Promise<void>=>{
            setMessage(message)
            console.log(message,currentuser._id,currentchat._id)
            const response=await axios.post("/user/addmsg",{
                message:message,
                sender:currentuser._id,
                reciever:currentchat._id
            },{
                headers:{Authorization:`Bearer ${token}`}
            })
            console.log("kiki")
            console.log(response)

           
           
            socket.emit('sendmessage',{
                messageid:response.data.newmessage._id,
                message:response.data.newmessage.message,
                sender:response.data.newmessage.sender,
                reciever:response.data.newmessage.users[1]
                
            })
           
            
      }

  return (
    
    
    <div style={{ color: "white" ,height:"100%",width:"100%"}}>
            <div style={{display:"flex", flexDirection:"column", height:"98%",width:"95%",gap:"1rem"}} >
                <div className="chat-header" style={{ display: "grid", gridTemplateColumns: "10% 90%", alignItems: "center", padding: "1rem" }}>
                    <img src={currentchat.profilepic} alt="" style={{ width: "3rem", height: "2.5rem", textAlign: "center" }} />
                    <p style={{ fontFamily: "serif", fontSize: "1.5rem",color:"black" }}>{currentchat.username}</p>
                </div>
                {/* divider */}
                <div style={{ height: "0.5rem", backgroundColor: "rgba(0,0,0,0.7)", width: "100%", alignSelf: "center" }}>
                    {/* divider */}
                </div>
                <div style={{ height:"20rem", border: "1px solid black", overflowY: "auto",overflowX:"hidden",backgroundColor:"rgba(0,0,0,0.1)" }}>
                        <Messages currentuser={currentuser} currentchat={currentchat} messages={messages} /> 
                </div>
                <Chatinput handlemessage={handlesendmessage}/>
               
            </div>
           

           
        </div>
   

  )
}

export default Chatcontainer
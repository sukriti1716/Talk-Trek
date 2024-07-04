import { useState,useEffect } from "react"
import axios from "../api/axios"
import Chatbotinput from "./Chatbotinput"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
const Chatbot = () => {

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

    interface ChatMessage {
        question: string;
        message: string;
      }
    const token=localStorage.getItem('token')
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

      const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
     

      const getmessage=(message:string,question:string):void=>{
        // setIsLoading(true)
        setChatMessages((prevMessages)=>[...prevMessages,{question,message}])
        // setIsLoading(false)
        // setTimeout(() => {
        //     setChatMessages((prevMessages) => [...prevMessages,{ question, message }]);
        //     setIsLoading(false); // Reset loading state after the simulated delay
        // }, 2000);
       
      }

      
  const backgroundColor = "lightgrey";
    

  return (
    
    

    <div style={{ backgroundColor: "black", width: "100vw", height: "100vh", display: "flex", flexDirection: "column", gap: "0rem", overflowX: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "1rem" }}>
            <h1 style={{ color: "beige", fontFamily: "revert-layer", fontSize: "3rem", marginBottom: "0.5rem" }}>Welcome to <span style={{ color: "lightblue" }}>Talk Trek AI</span></h1>
            <h2 style={{ fontFamily: "revert-layer", fontSize: "2rem", color: "#f1e5d1" }}>Hello, <span style={{ color: "lightblue" }}>{usernamedetails.username}</span> How can I help you?</h2>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem",marginTop:"1rem"}}>
            <Link to="/home"><Button variant="contained" sx={{backgroundColor:"lightblue" ,color:"black"}}>Home</Button></Link>
            <Link to="/chats"><Button variant="contained" sx={{backgroundColor:"lightblue" ,color:"black"}}>Chats</Button></Link>
            <Link to="/logout"><Button variant="contained" sx={{backgroundColor:"lightblue" ,color:"black"}}>Logout</Button></Link>
        </div>
        <div style={{ overflowY: "scroll", width: "92%", height: "25rem", backgroundColor, padding: "1rem", color: "black", margin: "2rem auto", borderRadius: "10px" }}>
            
            { chatMessages.map((chat, index) => (
                    <div key={index} style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "1rem", wordWrap: "break-word" }}>
                        <div style={{ color: "black", fontSize: "1.4rem", display: "flex", alignItems: "center", flexDirection: "row", gap: "1rem" }}>
                            {usernamedetails.profilepic ? <img src={usernamedetails.profilepic} alt="" style={{ width: "2rem", height: "2rem", textAlign: "center" }} /> : "Guest"}
                            <p style={{ fontWeight: "bold", margin: 0 }}>{chat.question}</p>
                        </div>
                        <pre style={{ color: "black", fontSize: "1.2rem", margin: "0", fontFamily: "sans-serif", whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                        <strong>Answer</strong>: {chat.message}
                        </pre>
                    
                    </div>
                    
            ))
            }
        </div>
        <Chatbotinput currentuser={usernamedetails} getmessage={getmessage} />
        
    </div>
    
  )
}

export default Chatbot
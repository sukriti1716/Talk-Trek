import { useEffect, useState } from "react";
import axios from "axios";

interface currentuserProps {
  _id: string,
  username: string;
  phonenumber: number;
  email: string;
  profilepic: string;
}

interface contact {
  _id: string,
  username: string,
  profilepic: string,
  password: string,
  email: string,
  phonenumber: number

}

interface ChatcontainerProps {
  currentuser: currentuserProps;
  currentchat: contact;
  messages: messagesprops[];
  // ismessages:boolean;
  // setIsMessages:React.Dispatch<React.SetStateAction<boolean>>;
}

interface senderprops {
  _id: string,
  username: string,
  profilepic: string,
  password: string,
  email: string,
  phonenumber: number
}

interface messagesprops {
  message: string,
  messagetime: string,
  sender: senderprops,
  users: string[],
  _id: string
}

const Messages = ({ currentuser, currentchat, messages }: ChatcontainerProps) => {
  const token = localStorage.getItem("token")

  

  // const [messages,setMessages]=useState<messagesprops[]>([])


  // useEffect(()=>{
  //   const getmessages=async ()=>{
  //     const response=await axios.get(`http://localhost:5000/user/getmsg/${currentuser._id}/${currentchat._id}`,{
  //       headers:{Authorization:`Bearer ${token}`}
  //   })

  //     // setMessages(response.data.messages)
  //     setIsMessages(true)
  //   }

  //   getmessages()
  // },[currentchat])

  useEffect(() => {
    console.log("Messages component mounted");

  }, [])

  useEffect(() => {
    console.log("Messages updated:", messages);
    // setIsMessages(true)

  }, [messages])

  //console.log(messages)
  return (

    <div >
      {messages.length > 0 && (
        <div>
          {messages.map((message) => (
            <div
              key={message._id}
              className={`${message?.sender?._id === currentuser._id ? "sender" : "reciever"} message_container`}
            >
              <div style={{ display: "grid", gridTemplateColumns: "10% 90%", gap: "1.4rem" }}>
                <div >
                  <img src={message?.sender?.profilepic} height={"30rem"} width={"30rem"} />
                </div>
                <div className="msg" style={{
                  padding: "0.2rem",
                  backgroundColor: message?.sender?._id === currentuser._id ? "lightgrey" : "#e8f4f8", borderRadius: "10px", maxWidth: "80%"
                }}>
                  <p style={{ color: "black" }}>{message?.message}</p>
                  <p style={{ fontSize: "0.75rem", color: "grey" }}>{message?.messagetime}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>

  )
}

export default Messages
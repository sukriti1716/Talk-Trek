import axios from "../api/axios"
import { useState,useEffect } from "react"
import { Box ,Button} from "@mui/material"
import {Link} from "react-router-dom"


interface Contact {
    _id:string,
    username: string,
    profilepic: string,
    password:string,
    email:string,
    phonenumber:number
   
}

interface ContactProps {
    handlingchat: (chat: Contact) => void;
}

const Contacts = ({handlingchat}:ContactProps) => {

    interface userprops{
        _id:string,
        username:string,
        phonenumber:number
        email:string,
        profilepic:string
    }
    

    const [usernamedetails,setusernamedetails]=useState<userprops>({
        username:"",
        phonenumber:0,
        email:"",
        profilepic:"",
        _id:""
    })
    const token=localStorage.getItem('token')

    useEffect(()=>{
        const getuserdetails=async ()=>{
          if(!token){
           
              return
          }
          const response=await axios.get("/user/verification",{
              headers:{Authorization:`Bearer ${token}`}
          })
        //   console.log(response)
          if(response.status===200){
              setusernamedetails({
                  username: response.data.username,
                  phonenumber: response.data.phonenumber,
                  email:response.data.email,
                  profilepic:response.data.profilepic,
                  _id:response.data._id
              });
            //   console.log("hi user")
            //   console.log(usernamedetails)
          }
        
  
      }
      
     getuserdetails()
       
    
      },[])
     
      

    
    
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [chatselected,setChatSelected]=useState<number|null>(null)
    const [currentcontact,setcurrentcontact]=useState<Contact|null>(null)

    useEffect(()=>{
       const getallcontacts=async()=>{
        const response=await axios.get('/user/getalluser',{
          headers:{Authorization:`Bearer ${token}`}
        })
        // console.log(response)
        if(response.status===200){
            // console.log(response.data.users)
          setContacts(response.data.users)
        }
       
       }

       getallcontacts()
    },[])

    // console.log(contacts)

    // changing chat function
    const changechat = (index: number, contact: Contact): void=> {
        setChatSelected(index);
        setcurrentcontact(contact);
        console.log(contact)
        handlingchat(contact);
       
      };
    
  return (
    <div style={{ color: "black", display: "flex", gap: "1.5rem", flexDirection: "column", paddingLeft: "1rem", paddingRight: "1rem", backgroundColor: "rgba(243, 208, 215, 0.1)" }}>
    <div>
        {usernamedetails.username && usernamedetails.profilepic && (
            <Box className="TOP" display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} >
                <img src="talk-trek-logo.png" alt="logo" style={{ width: "9rem", height: "6rem" }} />
                <p style={{ fontFamily: "serif", fontSize: "1.4rem", color: "purple" }}>TALK TREK</p>
            </Box>
        )}
    </div>
    <div>
        <Link to="/chatbot"><Button variant="contained" sx={{width:"100%", backgroundColor:"#f1e5d1" ,color:"black",fontWeight:"bold"}}>ChatAI</Button></Link>
    </div>
    <div style={{ fontSize: "1.6rem", fontFamily: "serif", color: "black" }}>Contacts</div>
    <div style={{ maxHeight: "260px", overflowY: "auto" }}>
        <Box className="contact" display={"flex"} flexDirection={"column"} gap={"1.5rem"}>
            {contacts.map((contact, index) => (
                <div
                    className={`Contact ${index === chatselected ? "selected" : ""}`}
                    key={index}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "17% 83%",
                        backgroundColor: index === chatselected ? "rgba(127, 17, 224, 0.4)" : "rgba(238,247,255)",
                        cursor: "pointer",
                        padding:"0.5rem",
                        borderRadius:"5%"
                    }}
                    onClick={() => changechat(index, contact)}
                >
                    <img src={contact.profilepic} alt="" style={{ width: "2rem", height: "2rem", textAlign: "center" }} />
                    <div style={{ fontSize: "1.5rem" }}>{contact.username}</div>
                </div>
            ))}
        </Box>
    </div>
</div>
//     <div style={{ color: "black", display: "flex", gap: "2rem", flexDirection: "column",paddingLeft:"1rem",paddingRight:"1rem",backgroundColor:"rgba(243, 208, 215, 0.1)"}}>
//     <div>
//         {usernamedetails.username && usernamedetails.profilepic && (
//             <Box className="TOP" display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} >
//                 <img src="talk-trek-logo.png" alt="logo" style={{ width: "9rem", height: "6rem" }} />
//                 <p style={{ fontFamily: "serif", fontSize: "1.4rem", color: "purple" }}>TALK TREK</p>
//             </Box>
//         )}
//     </div>
//     <div style={{ fontSize: "1.6rem", fontFamily: "serif", color: "black" }}>Contacts</div>
//     <div style={{ maxHeight: "320px", overflowY: "auto" }}>
//         <Box className="contact" display={"flex"} flexDirection={"column"} gap={"1.5rem"}>
//             {contacts.map((contact, index) => (
//                 <div className={`Contact ${index === chatselected ? "selected" : ""}`} key={index} style={{ display: "grid", gridTemplateColumns: "15% 85%", backgroundColor: index === chatselected ? "rgba(127, 17, 224, 0.4)" : "rgba(238,247,255)", cursor: "pointer" }} onClick={() => changechat(index,contact)}>
//                 <img src={contact.profilepic} alt="" style={{ width: "2rem", height: "2rem", textAlign: "center" }} />
//                 <div style={{ fontSize: "1.5rem" }}>{contact.username}</div>
//             </div>
//             ))}
//         </Box>
//     </div>
// </div>


  )
}

export default Contacts
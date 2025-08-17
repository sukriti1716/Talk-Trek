import {  Button } from '@mui/material';
import { useState } from 'react';
import Picker,{EmojiClickData} from 'emoji-picker-react'
import axios from '../api/axios';

interface CurrentUserProps {
    _id: string;
    username: string;
    phonenumber: number;
    email: string;
    profilepic: string; 
  }


  
  interface ChatbotinputProps {
    currentuser: CurrentUserProps;
    getmessage: (message: string, question: string) => void;
  }



 


const Chatbotinput = ({ currentuser ,getmessage}: ChatbotinputProps) => {
    const [showhideemoji,setShowHideEmoji]=useState<boolean>(false)
    const [message,setMessage]=useState<string>("")

    const hideshowemojifunction=()=>{
        setShowHideEmoji(!showhideemoji)
    }

    const token=localStorage.getItem('token')

    const handleclickemoji=(emojiobject:EmojiClickData)=>{
        let msg=message
        msg+=emojiobject.emoji
        setMessage(msg)
        // console.log(message)

    }

    const [question,setQuestion]=useState<string>("")

    const handlesubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsLoading(true)  
        const response=await axios.post('/user/getans',{message},{
            headers:{Authorization:`Bearer ${token}`}
        })

        console.log(response.data.text)
        getmessage(response.data.text,question);
        setMessage("");  
        setQuestion("");
        setIsLoading(false)
        
    }
    const [isloading,setIsLoading]=useState<boolean>(false)
  return (

    <div>
        <form onSubmit={handlesubmit}>
            <div
                className="input-container"
                style={{
                    display:"grid",
                    gridTemplateColumns:"5% 85% 10%",
                    alignItems:"center",
                    padding:"1rem",
                    backgroundColor:"#f1e5d1",
                    position: "relative",
                    width:"95%",
                    margin:"1rem"
                }}
            >
                {/* <label htmlFor="chat-textarea">Type Here:</label> */}
                <div className='emoji' style={{position:"relative"}}>
                    <img src="smily.svg" alt="smily" height={"25rem"} width={"25rem"} onClick={hideshowemojifunction}/>
                    {
                        showhideemoji && (
                            <div style={{
                              position: "absolute",
                              bottom: "60px", 
                              zIndex: 1,
                              maxHeight: "300px", 
                              overflowY: "auto" ,
                              boxShadow:"0 5px 10px grey"
                             
                            }}>
                              <Picker onEmojiClick={handleclickemoji} />
                            </div>
                        )
                    }
                </div>
                <textarea
                    rows={3}
                    style={{
                       
                        width: '100%',
                        whiteSpace: 'pre-wrap',
                        overflow: 'auto',
                        fontSize:"1rem",
                        fontFamily:"serif",
                        
                    
                    }}
                    value={message}
                    onChange={(e)=>{setMessage(e.target.value);
                        setQuestion(e.target.value)}}
                    placeholder='Type here'
                >
                   
                </textarea>
                <button style={{backgroundColor:"black",borderRadius:"5%"}} type="submit">
                    {isloading ? (
                        <img src="loading.gif" alt="loading..." height={"50em"} width={"100%"} />
                        ) : (
                        <img src="sendicon.svg" alt="sendicon" height={"50rem"} width={"30rem"} />
                    )}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Chatbotinput
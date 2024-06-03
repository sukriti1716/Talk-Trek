
import {  Button } from '@mui/material';
import { useState } from 'react';
import Picker,{EmojiClickData} from 'emoji-picker-react'


interface messageProps {
    handlemessage: (message: string) =>Promise<void>;
}
const Chatinput = ({handlemessage}:messageProps) => {
    const [showhideemoji,setShowHideEmoji]=useState<boolean>(false)
    const [message,setMessage]=useState<string>("")

    const hideshowemojifunction=()=>{
        setShowHideEmoji(!showhideemoji)
    }

    const handleclickemoji=(emojiobject:EmojiClickData)=>{
        let msg=message
        msg+=emojiobject.emoji
        setMessage(msg)
        // console.log(message)

    }

    const handlesubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(message.length>0){
            handlemessage(message)
            setMessage("")
        }
        
    }
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
                    backgroundColor:"rgba(0,0,0,0.3)",
                    position: "relative"
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
                    onChange={(e)=>{setMessage(e.target.value)}}
                    placeholder='Type here'
                >
                   
                </textarea>
                <Button variant="contained" type="submit">
                    <img src="sendicon.svg" alt="sendicon"  />
                </Button>
            </div>
        </form>
    </div>
  )
}

export default Chatinput
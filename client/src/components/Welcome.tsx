
interface WelcomeProps {
    currentuser: {
      username: string;
      phonenumber: number;
      email: string;
      profilepic: string;
    };
  }

const Welcome = ({currentuser}:WelcomeProps) => {
  return (
    <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"2rem" }}>
       <div>
            <img src="mygif.gif" alt="gif" style={{ borderRadius: '50%' , height:"15rem",width:"15rem"}} />
       </div>
      
       <div  style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"2rem"}}>
        <h2 style={{color:"black",fontFamily:"serif",textAlign:"center",fontSize:"1.5rem"}}>  Welcome {currentuser.username} !</h2>
        <h2 style={{color:"blue", fontFamily:"serif",textAlign:"center"}}>Please select a chat to Start Messaging</h2>
       
       </div>

  
  </div>
    
  )
}

export default Welcome
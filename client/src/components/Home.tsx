import { Button } from "@mui/material"
import { useEffect } from "react"

export interface INavbarProps {
  userLoggedIn: boolean,
  setUserLoggedIn: (value: React.SetStateAction<boolean>) => void
}



const Home = () => {


  return (
    <>
     <div style={{backgroundColor:"#F1E5D1",height:"5vh",width:"100%"}}></div>
    <div style={{backgroundColor:"black",height:"80vh",width:"100vw",display:"flex" ,justifyContent:"space-evenly",alignItems:"center" }}>
        <div className="container" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"3rem",padding:"2rem"}}>
            <div>
                <img src="ttlogo.png" alt="" height={"200rem"} width={"300rem"} />
            </div>
            <p style={{fontSize:"4rem",color:"beige",fontFamily:"revert-layer",fontWeight:"lighter"}}>HAVE YOUR BEST CHAT</p>
            <div style={{display:"flex",justifyContent:"center", alignItems:"center",flexDirection:"row",gap:"2rem"}}>
              {/* {userLoggedIn? "":<Button href="/login" variant="contained" sx={{ backgroundColor: "lightgrey", color: "black" }}>Login</Button>} */}
                <Button href="/login" variant="contained" sx={{ backgroundColor: "lightgrey", color: "black" }}>Login</Button>
                <Button href="/register" variant="contained" sx={{  backgroundColor: "lightgrey", color: "black" }}>Create Account</Button>
                <Button href="/chatbot" variant="contained" sx={{  backgroundColor: "lightgrey", color: "black" }}>ChatAI</Button>
                <Button href="/dashboard" variant="contained" sx={{  backgroundColor: "lightgrey", color: "black" }}>Dashboard</Button>
            </div>
        </div>
        <img src="homelogo.gif" alt="" height={"350rem"} width={"300rem"} style={{border:"2px solid black",borderRadius:"20%",backgroundColor:"black"}}/>
    </div>
    <div style={{backgroundColor:"#F1E5D1",height:"15vh",width:"100%"}}></div>
    </>
   
  )
}

export default Home
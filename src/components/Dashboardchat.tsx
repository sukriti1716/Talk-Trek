import { Button } from "@mui/material"


const Dashboardchat = () => {
  return (
    <div style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#000000",flexDirection:"column",gap:"2rem"}}>
        <div>
            <img src="ttlogo.png" alt="" height={"250rem"} width={"350rem"} />
        </div>
        <div style={{color:"black",backgroundColor:"#F1E5D1",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"1rem",padding:"1rem",fontSize:"1.5rem"}}>
            <p>Welcome To <span style={{color:"blue"}}>Talk-Trek</span> Chats</p>
            <p>Feel Free To Chat And <span style={{color:"blue"}}>Connect</span> With Others</p>
        </div>
        <Button href='/chats' variant="contained"  sx={{  backgroundColor: "lightgrey", color: "black" ,fontSize:"1.2rem"}}>Chats</Button>


    </div>
  )
}

export default Dashboardchat
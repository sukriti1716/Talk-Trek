
import { Button, Toolbar, Typography } from "@mui/material"
import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import {Link} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

const Navbar = () => {

    interface userprops{
        username:string,
        phonenumber:number,
        email:string,
        profilepic:string,
        _id:string
    }

    const [usernamedetails,setusernamedetails]=useState<userprops>({
        username:"GUEST USER",
        phonenumber:0,
        email:"",
        profilepic:"",
        _id:""
    })

    const [token,setToken]=useState<string| null>(localStorage.getItem('token'))
    // const token=localStorage.getItem('token')
   

    const handlelogout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setusernamedetails({ ...usernamedetails, username: "", phonenumber: 0,email:"",profilepic:"",_id:"" });
    };
    

    useEffect(()=>{
       
        const getuserdetails=async ()=>{
            if(!token){
             
                return
            }
            const response=await axios.get("http://localhost:5000/user/verification",{
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
                // console.log(usernamedetails)
            }
          

        }
        
       getuserdetails()
        
        
    },[token])

    useEffect(()=>{
        const logintoken=localStorage.getItem('token')
        if(logintoken){
            setToken(logintoken)
        }
    },[])

 
  return (
    <>
        <div>
            <Box >
            {/* rgba(238,247,255,0.32) */}
                <AppBar sx={{ backgroundColor: '#F1E5D1'}} >
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                       
                       {usernamedetails.profilepic? <img src={usernamedetails.profilepic} height={"40rem"} width={"40rem"}/>:<AccountCircleIcon/>}
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 ,color:"black"}}>{usernamedetails.username}</Typography >
                    {/* {usernamedetails.username==="GUEST USER"? <Typography variant="h6" sx={{ flexGrow: 1 }}>{usernamedetails.username}</Typography >:<Typography variant="h6" sx={{ flexGrow: 1 }}>GUEST USER</Typography>} */}
                    {/* <Button color="inherit" sx={{mr:0}}>Login</Button>
                    {/* <Box marginRight={"0px"}> */}
                    <div style={{display:"flex",gap:"1rem"}}>
                        <Link to="/chats"><Button  variant="outlined" >Chats</Button></Link>
                        <Link to="/chatbot"><Button variant="outlined">ChatAI</Button></Link>
                        <Link to="/home"> <Button variant="outlined">Home</Button></Link>
                        {token? <Link to="/logout"><Button variant="outlined">Logout</Button></Link>:<Link to="/login"><Button variant="outlined">Login</Button></Link>}
                    </div>
                   
                    {/*  */}
                    </Toolbar>
                </AppBar>
            </Box>
          
            
        </div>

        <Outlet />
    </>   
  )
}

export default Navbar
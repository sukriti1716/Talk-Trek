import {  Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'

const Dashboard = () => {
   
   const navigate=useNavigate()

   interface initialvaluesprops{
        chatroomname:string,
       
   }
   

   const initialvalues:initialvaluesprops={
        chatroomname:""
   }

   const chatroomschema=yup.object({
        chatroomname:yup.string().required("Please enter username")
      
   })

   const [chatrooms,setchatrooms]= useState<{ _id: string, chatroomname: string }[]>([]);
   const [showChatrooms, setShowChatrooms] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");

   

   

   const Formik=useFormik({
        initialValues:initialvalues,
        validationSchema:chatroomschema,
        onSubmit: async(values)=>{
            try{
                const token=localStorage.getItem('token')
                const response=await axios.post("http://localhost:5000/user/createchatroom",values,{
                    headers:{Authorization:`Bearer ${token}`}
                })

                if (response.status === 200) {
                    setSuccessMessage("Chatroom created successfully.");
                    // setShowChatrooms(true);
                    fetchchatrooms()
                   
                } else {
                    console.log("Error !! ", response.data.msg);
                }
                navigate('/dashboard')
            }
            catch(err){
                console.log("Error occured in creating chatroom",err)
            }
        }


   })

   const fetchchatrooms=async ()=>{
    const token=localStorage.getItem('token')
    const response=await axios.get("http://localhost:5000/user/getchatroom",{
            headers:{Authorization:`Bearer ${token}`}
    })
    setchatrooms(response.data.chatrooms)

    }

   useEffect(()=>{
       

        fetchchatrooms()
   },[])

   
 

    return (
    <div>
                
        <Box width={"100dvw"} height={"100dvh"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} bgcolor={"#31363F"}>
            <Box  display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"4rem"} flexDirection={"row"} >
                <Box width={"65%"}>
                    <form onSubmit={Formik.handleSubmit}>
                        <Box boxShadow={"box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;"} display={"flex"} flexDirection={"column"} gap={"2rem"} border={"1px solid black"} margin={4} paddingY={2} paddingX={4} borderRadius={"1rem"} bgcolor={"#F5EFE6"}>
                            <Box>
                                <Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>CHAT ROOMS</Typography>
                                <Typography variant="h6" textAlign={"center"}>Welcome to Our Talk Trek </Typography>
                            </Box>
                            <Typography variant="h6" textAlign={"center"}>Create your own Chat Room!! </Typography>
                            <TextField
                                label="Enter ChatRoom Name"
                                variant="outlined"
                                name="chatroomname"
                                error={Boolean(Formik.errors.chatroomname) && Formik.touched.chatroomname}
                                value={Formik.values.chatroomname}
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                                helperText={Formik.errors.chatroomname && Formik.touched.chatroomname ? Formik.errors.chatroomname : ''}
                            />
                            <Button variant="contained" type={"submit"}>Create ChatRoom</Button>
                            {successMessage && <Typography>{successMessage}</Typography>}
                        </Box>
                    </form>
                </Box>
                <Box width={"35%"} textAlign={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={"2rem"} >
                    <Button variant="contained" onClick={() => setShowChatrooms(!showChatrooms)}>
                        {showChatrooms ? "Hide Chatrooms" : "Show Chatrooms"}
                    </Button>
                    {showChatrooms && (
                    <Box width={"100%"} borderRadius={"1rem"}>
                        <div style={{ overflowY: 'auto', overflowX: "hidden" }}>
                            <Box display={"flex"}  flexDirection={"column"} height={"20rem"} width={"100%"} gap={"1rem"} >
                                {chatrooms && chatrooms.map((chatroom) => (        
                                    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", width: "100%", backgroundColor: "#F1F1F1",gap:"1rem" }} key={chatroom._id}>
                                        <p style={{width:"55%"}}>{chatroom.chatroomname}</p>
                                        <Button variant="contained">Join</Button>
                                    </div>
                                ))}
                            </Box>
                        </div>
                    </Box>
                )}
                </Box>
                
            </Box>
        </Box>



      
    </div>
    )
}

export default Dashboard
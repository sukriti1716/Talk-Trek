import {  Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { useNavigate,Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup'

const Login = () => {
   
   const  navigate=useNavigate()

   interface initialvaluesprops{
        username:string,
        password:string
   }
   

   const initialvalues:initialvaluesprops={
        username:"",
        password:""
   }

   const loginschema=yup.object({
        username:yup.string().required("Please enter username"),
        password:yup.string().min(8, "Please Enter Min 8 charachters").max(24).matches(/(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9])/, "Password should contain at least one uppercase letter, one number, and one special character").required("Please Enter Min 8 charachters")
   })

   

   const Formik=useFormik({
        initialValues:initialvalues,
        validationSchema:loginschema,
        onSubmit: async(values)=>{
            try{
                const response=await axios.post("http://localhost:5000/user/login",values)

                if(response.status===200){
                    localStorage.setItem("token",response.data.token);
                    // localStorage.setItem("user",JSON.stringify(response.data.user))
                    navigate('/dashboard')
                }
            }
            catch(err){
                console.log("Error occured in login",err)
            }
        }


   })
 

    return (
    <div>
        <Box width={"100dvw"} height={"100dvh"} display={"flex"} justifyContent={"center"} alignItems={"center"} bgcolor={"#000000"}>
                <Box  paddingX={4}  display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"4rem"} >
                    <Box width={"62%"}>
                        <img src="ttlogo.png" width={"100%"}/>
                    </Box>
                <Box width={"38%"}  >
                  <form  onSubmit={Formik.handleSubmit}  >
                  {/* #F5EFE6 */}
                    <Box boxShadow={"box-shadow:  0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;"} display={"flex"} flexDirection={"column"} gap={"2rem"} border={"1px solid black"} margin={4} paddingY={2} paddingX={4} borderRadius={"1rem"} bgcolor={"#F5EFE6"}>
                       <Box>
                            <Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>LOGIN</Typography>
                            <Typography variant="h6" textAlign={"center"}>Welcome to Our Talk Trek </Typography>
                       </Box>

                        <TextField  
                            label="Enter Username" 
                            variant="outlined" 
                            name="username" 
                            error={Boolean(Formik.errors.username) && Formik.touched.username}
                            value={Formik.values.username}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            helperText={Formik.errors.username && Formik.touched.username ? Formik.errors.username : ''}
                           
                         />
                          
                        
                        <TextField  
                            label="Enter Password" 
                            variant="outlined" 
                            name="password" 
                            type="password"
                            error={Boolean(Formik.errors.password) && Formik.touched.password}
                            value={Formik.values.password}
                            onChange={Formik.handleChange} 
                            onBlur={Formik.handleBlur}
                            helperText={Formik.errors.password && Formik.touched.password ? Formik.errors.password : ''}
                          
                        />

                       
                       
                       
                       
                        <Button variant="contained" type={"submit"}>Login</Button>
                        <p>Haven't registered yet ?  <Link to="/register"><Button variant="outlined">Register</Button></Link></p>
                    </Box>
                </form> 
            </Box>
               
            </Box>
        </Box>
    </div>
    )
}

export default Login
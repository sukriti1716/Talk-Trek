import { Button,   TextField } from "@mui/material"
import axios from "../api/axios";
import {Typography} from "@mui/material";
import Box from '@mui/material/Box';
import { useFormik } from "formik";
import * as yup from 'yup';
import { Link } from "react-router-dom";


import {  useNavigate } from "react-router-dom";

const Register = () => {

    const navigate=useNavigate()
    
    interface valuesprops{
        username:string,
        password:string,
        email:string,
        phonenumber:number
    }

    const initialvalues:valuesprops={
        username:"",
        password:"",
        email:"",
        phonenumber:+91
    }

    const registrationschema=yup.object({
        username:yup.string().required("Please Enter your username"),
        password: yup.string().min(8, "Please Enter Min 8 charachters").max(24).matches(/(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9])/, "Password should contain at least one uppercase letter, one number, and one special character").required("Please Enter Min 8 charachters"),
        email:yup.string().email("Please Enter a valid email").required("Please Enter your email"),
        phonenumber:yup.number().min(10,"Please enter valid phone number").required("Please enter your phonenumber")

    })
    const formik=useFormik({
        initialValues:initialvalues,
        validationSchema:registrationschema,
        onSubmit:async (values)=>{
           
            try {
                const response = await axios.post('/user/register', values);
    
                if (response.status === 201) {
                    // Redirect to login page
                    // return <Navigate to="/login" />;
                    navigate('/login')
                }
            } catch (error) {
                console.error("Error occurred during registration:", error);
            }
    

        }
    })
  

    
    return (
        <div>
           <Box width={"100dvw"} height={"100dvh"} display={"flex"} justifyContent={"center"} alignItems={"center"} bgcolor={"#000000"} overflow={"hidden"} >
                <Box  paddingX={4}  display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"4rem"} overflow={"hidden"}>
                    <Box width={"62%"}>
                        <img src="ttlogo.png" width={"100%"}/>
                    </Box>
                <Box width={"38%"} >
                  <form  onSubmit={formik.handleSubmit}  style={{overflow:"hidden"}}>
                    <Box boxShadow={"box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;"} display={"flex"} flexDirection={"column"} gap={"1.1rem"} border={"1px solid black"} margin={4}  paddingY={2}paddingX={4} borderRadius={"1rem"} bgcolor={"#F5EFE6"} overflow={"hidden"} >
                       <Box>
                            <Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>REGISTER</Typography>
                            <Typography variant="h6" textAlign={"center"}>Welcome to Our Talk Trek </Typography>
                       </Box>

                        <TextField  
                            label="Enter Username" 
                            variant="outlined" 
                            name="username" 
                            error={Boolean(formik.errors.username) && formik.touched.username}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={formik.errors.username && formik.touched.username ? formik.errors.username : ''}
                           
                         />
                          
                        
                        <TextField  
                            label="Enter Password" 
                            variant="outlined" 
                            name="password" 
                            type="password"
                            error={Boolean(formik.errors.password) && formik.touched.password}
                            value={formik.values.password}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            helperText={formik.errors.password && formik.touched.password ? formik.errors.password : ''}
                          
                        />

                        <TextField  
                            label="Enter Email" 
                            variant="outlined" 
                            name="email" 
                            error={Boolean(formik.errors.email) && formik.touched.email}
                            value={formik.values.email}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            helperText={formik.errors.password && formik.touched.email ? formik.errors.email : ''}
                          
                        />

                        <TextField  
                            label="Enter Phone Number" 
                            variant="outlined" 
                            name="phonenumber" 
                            error={Boolean(formik.errors.phonenumber) && formik.touched.phonenumber}
                            value={formik.values.phonenumber}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            helperText={formik.errors.phonenumber && formik.touched.phonenumber ? formik.errors.phonenumber : ''}
                          
                        />
                       
                       
                       
                        <Button variant="contained" type={"submit"}>Register</Button>
                        <p>Have already registered  ?  <Link to="/login"><Button variant="outlined">Login</Button></Link></p>
                    </Box>
                </form> 
            </Box>
               
            </Box>
        </Box>

    </div>
    )
}

export default Register
import { useEffect,useState } from "react"
import axios from "axios"
import { Outlet } from "react-router-dom"
import Login, { ILoginProps } from "./Login";


const Reactrouter = ({setUserLoggedIn}: ILoginProps) => {
    const token=localStorage.getItem('token')
    const [loading, setLoading] = useState(true);

    interface userprops{
        username:string,
        phonenumber:number,
        email:string,
        profilepic:string,
        _id:string
    }

    const [usernamedetails,setusernamedetails]=useState<userprops>({
        username:"",
        phonenumber:0,
        email:"",
        profilepic:"",
        _id:""
    })

    useEffect(()=>{
        const getuserdetails=async ()=>{
          if(!token){
            setLoading(false);
              return
          }
          try {
            const response = await axios.get("http://localhost:5000/user/verification", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                setusernamedetails({
                    username: response.data.username,
                    phonenumber: response.data.phonenumber,
                    email: response.data.email,
                    profilepic: response.data.profilepic,
                    _id: response.data._id,
                });
            }
        } catch (error) {
            console.error("Failed to fetch user details", error);
           
        } finally {
            setLoading(false);
        }
        
  
      }
      
     getuserdetails()
      
      },[token])

      if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div> 
        )
    }

    
  return (
    <>
    {
        usernamedetails.username? <Outlet/> :<Login setUserLoggedIn={setUserLoggedIn}/>
    }
    
    </>
  )
}

export default Reactrouter
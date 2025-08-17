import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

const Logout = () => {
  const navigate=useNavigate();

  useEffect(()=>{
    localStorage.clear();
    navigate('/home')
  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout
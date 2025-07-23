import { createContext, useEffect, useState } from "react";

import { toast } from 'react-hot-toast';
import  axios  from "axios";
// eslint-disable-next-line react-refresh/only-export-components
export let authContext = createContext(null)



export default function AuthContextProvider({children}) {
  
    const [token,setToken] = useState(localStorage.getItem('token'))


async function checkUser() {
  if(localStorage.getItem('token')){
    try {
      let {data} = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
        headers:{
          token: localStorage.getItem('token')
        },
        }
      )
      localStorage.setItem('userId',data.decoded.id)
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
      toast.error('user not found');
      setToken(null);
    }
  }
}
useEffect(()=>{
  if(localStorage.getItem){
    checkUser();
  }
},[])
 
 return (
<authContext.Provider value={{token,setToken,checkUser}}>
    {children}
</authContext.Provider>
  )
}

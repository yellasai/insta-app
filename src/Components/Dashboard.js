import React,{useState,useContext} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";

const Dashboard=()=>{
    const [joke,setJoke]=useState("");
    const {token,setToken}=useContext(UserContext);

    function getJoke(){
        axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{

        headers:{
            "authorization":`Bearer ${token}`
        }
     })
       .then(response=>{
        console.log("joke",response.data.data.message)
        setJoke(response.data.data.message)
       })
       .catch(err=>console.log("Error",err.response.data.message))
      }

              

         
    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={getJoke}>Get joke</button>
            {
                joke && <h2>{joke}</h2>
            }
           
        </div>
    )
}

export default Dashboard;
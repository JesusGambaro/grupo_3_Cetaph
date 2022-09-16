import React from 'react'
import { useNavigate } from 'react-router';
const Home = () => {
    const navigate = useNavigate();
  return (
    <div>Home
        <button onClick={()=>navigate("/AboutUs")}>Click</button>
    </div>
  )
}

export default Home
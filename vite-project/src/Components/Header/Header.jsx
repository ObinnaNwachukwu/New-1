import React, { useState, useEffect, useContext } from 'react'
import "./Header.css"
import ThemeLogo from "../../assets/MoonMoon-removebg-preview.png"
import LightLogo from "../../assets/SunImage-removebg-preview.png"
import Logo from "../../assets/LogoLogo-removebg-preview.png";
import {RiShoppingCartFill} from "react-icons/ri"
import {useNavigate, NavLink} from "react-router-dom"
import Drop from "../Drop/Drop"
import axios from "axios"
import sound from "../../assets/interface-soft-abbreviated-click-131438.mp3";
import {ThemeContext} from "../../api/Context"
import { useSelector } from 'react-redux';

const Header = () => {
    const {changeTheme, theme, theSetter}=useContext(ThemeContext);
    const amount = useSelector((state) => state.commerce.amount)
    const navigate = useNavigate()
    const [drop, updateDrop] = useState(false);
    const handleDropH =()=>{
        updateDrop(true)
    }
    const handleDropO =()=>{
        updateDrop(false)
    }

      
    const [cats, setCats] = useState([]);
    const getCats= async()=>{
        try{
            const res = await axios.get('https://fakestoreapi.com/products/categories');
            setCats(res.data)
        }catch(err){
            console.log(err.message)
        }
    }
    const colorObject ={
        color:theme? "black": "white",
    }
    const activeColorObject ={
        color: "#EC3B6F",
        fontWeight: 900
    }

    function play(){
        new Audio(sound).play()
    }

    useEffect(()=>{
        getCats()
    },[])
  return (
    <div className="Header" 
    style={theSetter}
    >
        <div className="Header-Logo">
            <img src={Logo} alt="Logo-icon" onClick={()=> navigate("/")}/>
        </div>
        <div className="Header-Links">
            <ul>
                <NavLink to="/"  style={({ isActive }) =>
              isActive ? activeColorObject : colorObject}><li className="hvr-bounce-to-right" onMouseOver={handleDropO}>Home</li></NavLink>
                <NavLink style={({ isActive }) =>
              isActive ? activeColorObject : colorObject} to="/category"><li className="hvr-bounce-to-right" onMouseOver={handleDropH} >Category</li></NavLink>
                <NavLink style={({ isActive }) =>
              isActive ? activeColorObject : colorObject} to="cart"><li className="hvr-bounce-to-right" onMouseOver={handleDropO} ><RiShoppingCartFill/>{"  "}Cart{amount}</li></NavLink>
            </ul>
        </div>
        <div className="Header-Toggle" onClick={play}>
            <div className="toggle-button" onClick={()=> changeTheme()} style={{backgroundColor: theme? "grey": "black"}}>
                {theme? <img src={LightLogo} alt="theme" className="right"/>: <img src={ThemeLogo} alt="theme" className="left"/>}
            </div>
        </div>
        {drop && <Drop cats={cats} handleDrop={handleDropH} remove={handleDropO}/>}
    </div>
  )
}

export default Header
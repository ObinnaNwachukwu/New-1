import React, { useContext } from 'react'
import './App.css'
import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Detail from "./Components/Details/Details"
import Category from './Components/Category/Category';
import Cart from './Components/Cart/Cart';
import {ThemeContext} from "./api/Context"


function App() {
  const {theme} = useContext(ThemeContext);
  
  return (
      <div className="App" style={{backgroundColor: theme? "white": "#070214"}}>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Body/>} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/category/:cat" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  )
}


export default App
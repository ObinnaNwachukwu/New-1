import React, { useEffect, useState } from 'react'
import "./Cards.css"
import { useDispatch } from "react-redux"
import { bringProducts } from "../../features/features.jsx"
import  axios  from 'axios';
import {Link} from "react-router-dom"
import Loading from "../Loading/Loading"
import sound from "../../assets/click-21156.mp3"


const Cards = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false)


  async function getProducts(){
    try{
      setLoad(true)
      const res = await axios.get('https://fakestoreapi.com/products')
      // console.log(res.data);
      setProducts(res.data);
      dispatch(bringProducts(res.data))
      setLoad(false)
    }catch(error){
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }

  function play(){
    new Audio(sound).play()
  }

  useEffect(()=>{
    getProducts()
  },[])
  return (
    <div className="Card-Holder">
      <div className="Card-Item-Holder">
      {
        load? Array.from(Array(20).keys())?.map((i, index)=>(
          <div key={index} ><Loading /></div>
        )): products?.map((i)=>(
          <Link key={i.id} className='hvr-float-shadow' to={`/detail/${i.id}`} onClick={play}>
            <div className='Card-Image-holder'>
              <img src={i.image} className='Card-Image'/>
            </div>
            <div className='Card-Details'>
              <p>{i.title}</p>
              <h4>₦ {i.price}</h4>
            </div>
          </Link>
        ))
      }
      </div>
    </div>
  )
}

export default Cards
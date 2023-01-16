import React, {useState, useEffect} from 'react';
import "./Category.css";
import { useParams, Link } from 'react-router-dom';
import axios from "axios"
import Loading from "../Loading/Loading"

const Category = () => {
    const {cat} = useParams();
    const [products, setProducts] = useState([]);
    const [load, setLoad] = useState(false)

  async function getProducts(){
    try{
      setLoad(true)
      const res = await axios.get(`https://fakestoreapi.com/products/category/${cat}`)
      // console.log(res.data);
      setLoad(false)
      setProducts(res.data)
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

  useEffect(()=>{
    getProducts()
  },[cat])
  return (
    <div className='Category' style={{}}>
        <h1>{cat} Category</h1>
        <div className="Category-Holder">
        <div className="Category-Item-Holder">
        {
            load? Array.from(Array(10).keys())?.map((i, index)=>(
          <div key={index} ><Loading theSetter={{}}/></div>
        )): products?.map((i)=>(
            <Link key={i.id} className='hvr-float-shadow' to={`/detail/${i.id}`}>
                <div className='Category-Image-holder'>
                <img src={i.image} className='Category-Image'/>
                </div>
                <div className='Category-Details'>
                <p>{i.title}</p>
                <h4>₦ {i.price}</h4>
                </div>
            </Link>
            ))
        }
        </div>
        </div>
    </div>
  )
}

export default Category
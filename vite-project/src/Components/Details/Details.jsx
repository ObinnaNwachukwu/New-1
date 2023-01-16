import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./Details.css";
import { useParams } from "react-router-dom"
import { addToCart, total } from '../../features/features';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'

const Details = ({ theSetter }) => {
  const { id } = useParams()
  const amount = useSelector ((state)=> state.commerce.amount)
  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
      // console.log(res.data);
      setProducts(res.data)
    } catch (error) {
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

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <div className="Details-Holder" style={theSetter}>
      <div className="Details-Card">
        <div className="Details-Image-Holder">
          <img src={products.image} alt="productImage" className="Detail-Image" />
        </div>
        <div className="Details-details" style={{ color: "black" }}>
          <div>
            <h3>title: {products.title}</h3>
            <p>Category: {products.category}</p>
            <p>Description: {products.description}</p>
            <br />
            <h4>Price: ₦ {products.price}</h4>
            <h5>Rating: 3.5</h5>
          </div>
          <div
            onClick={(amount) => {dispatch(addToCart(products)); dispatch(total())
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your item has been added',
                showConfirmButton: false,
                timer: 2000
              })}}
            className="Detail-button">
            Add to cart
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
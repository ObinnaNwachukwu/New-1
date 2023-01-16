import React, {useContext} from 'react'
import "./Cart.css";
import CartItems from "./CartItems.jsx";
import { useSelector, useDispatch } from 'react-redux';
import {clearCart} from "../../features/features.jsx";
import {ThemeContext} from "../../api/Context"


const Cart = () => {
  const {totalAmount}=useContext(ThemeContext)
  const cart = useSelector((state) => state.commerce.cart);
  
  const dispatch = useDispatch()


  return (
    <div className="Cart-Holder">
      <div className="Cart-Box">
      <div className="Cart-Title">
        <h4>Shopping Cart</h4>
        <h3>Total:  ₦{totalAmount}</h3>
        <p onClick={()=> {dispatch(clearCart())}}>Remove all</p>
      </div>
      <div className="Cart-Items">
      {
        cart?.map((props)=>(
          <CartItems key={props.id} image={props.image} title={props.title} price={props.price} item={props} QTY={props.QTY} />
        ))
      } 
      </div>
      <div className="Cart-Check">
      <button >Check Out</button>
      </div>
      </div>
    </div>
  )
}

export default Cart
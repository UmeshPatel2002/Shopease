import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

function CartItems() {
    const {getTotalCartItem,getTotalCartAmount,cartItems,removeFromcart}=useContext(ShopContext);
    // console.log("cartItems at cart page",cartItems);
    const totalcartItem=getTotalCartItem();
   
  return (

    <div>{totalcartItem===0?<div className='empty-cart'>
      <p>No items have been successfully added to the cart</p>
      <a href='/'><button className='backtohome'>Back to Home</button></a>
      </div>:
    <div className='cartitems'>
        <div className='cartitems-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        
         {
        
         cartItems?.items?.map((product)=>{
          
            return <div key={product._id}>
                   <div className='cartitems-format-main'>
                   <img className='carticon-product-icon' src={product?.item?.image} alt=''/>
                   <p>{product?.item?.name}</p>
                   <p>${product?.item?.new_price}</p>
                   <button className='cartitem-quantity'> {product?.quantity}</button>
                    <p>${product?.item?.new_price*product?.quantity}</p>
                   <img className='cartitem-remove-icon' src={remove_icon}  onClick={()=>{removeFromcart(product)}} alt=''/>
                   </div>
                   <hr/>
            </div>
        })} 
        <div className='cartitem-down'>
          <div className='cartitem-total'>
             <h1> Cart Total</h1>
             <div>
              <div className='cartitem-total-item'>
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>

              </div>
              <hr/>
              <div className='cartitem-total-item'>
                <p>Shipping Fee</p>
                <p>Fee</p>
              </div>
              <hr/>
              <div className='cartitem-total-item'>
                 <p>Total</p>
                 <h3>${getTotalCartAmount()}</h3>
              </div>
             </div>
          <button>PROCEED TO CHECKOUT</button>
          </div>
          <div className='cartitem-promocode'>
            <p>If you a promo code, Enter it here</p>
            <div className='cartitem-promobox'>
                <input type='text' placeholder='promo code'/>
                <button>Submit</button>
            </div>

          </div>
        </div>
        
    </div> }
    </div>
  )
}

export default CartItems
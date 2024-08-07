import './Navbar.css'
import React, { useContext, useRef } from 'react'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar =()=>{
    const [menu ,setMenu]= useState("Shop");
    const {getTotalCartItem}=useContext(ShopContext)
    const menuRef=useRef();

    const dropdown_toogle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
  
    return (
        <div className='navbar'>
            <a href="/">
           <div className='nav-logo'>
               <img src={logo} alt=''/>
               <p>ShopEase</p>
           </div></a>
           <img className='nav-dropdown' onClick={dropdown_toogle} src={nav_dropdown} alt=''/>
           <ul ref={menuRef} className='nav-menu'>
           <li onClick={()=>{setMenu("Shop")}}>
                <Link style={{textDecoration: 'none'}}to='/'>Shop</Link> {menu==="Shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Men")}}>
                <Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="Men"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Women")}}>
                <Link style={{textDecoration: 'none'}} to='/women'>Women</Link> {menu==="Women"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Kids")}}>
                <Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> {menu==="Kids"?<hr/>:<></>}</li>
            </ul>
             
             <div className='nav-login-cart'>
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link style={{textDecoration: 'none'}} to='/login'> <button >Login</button></Link>}
                <Link style={{textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt=''></img></Link>
                <div className='nav-cart-count'>{getTotalCartItem()}</div>
             </div>
           

        </div>
    )
}

export default Navbar
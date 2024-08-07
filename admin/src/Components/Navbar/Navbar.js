import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/frontend_assets/logo.png'
import navProfile from '../../assets/admin_assets/nav-profile.png'

const Navbar=()=> {
  return (
    <div className='navbar'>
         <div className='navbar-container'>
      <div className='navbar-logo'>
      <img src={navlogo} alt='' className='nav-logo'/>
      <h1>SHOPEASE</h1>
      </div>
      <div className='nav-profile'>
      <img src={navProfile} alt='' />
      <p className='nav-text'>Admin</p>
      </div>
      </div>
      

    </div>
  )
}

export default Navbar
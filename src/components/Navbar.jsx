import React from 'react'
import logo1 from "../assets/images/logo.png"
import arrow1 from "../assets/images/Arrow.png"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <nav className="navbar">
      <div className="logo"  data-aos="fade-up" data-aos-duration="800">
        <img src={logo1} className='logou' alt="" />
      </div>
      <ul className="nav-links" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
        <li><Link to="">Home</Link></li>
        <li><a href="#mainabout">About</a></li>
        <li><a href="#mainorganizers">Organizers</a></li>
        <li><a href="#mainjoinus">Join Us</a></li>
        
        <li><a href="#events">Events</a></li>
      </ul>
      <Link to="/login">
      <button className="login-btn"data-aos="fade-up" data-aos-duration="800" data-aos-delay="1000">
        Login <img src={arrow1} alt=""  /></button></Link>
    </nav>
      
    </>
  )
}

export default Navbar




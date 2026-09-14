import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/public/Footer'
//import { Carousele } from 'react-responsive-carousel'
//import Carousel from '../components/Carousel'

function PublicLayout() {
  return (
    <div className='all-navbar-main'>
        <Navbar />
        
        <main className='main'>
            <Outlet />
        </main>
        <Footer/>
    </div>
    
  )
}

export default PublicLayout
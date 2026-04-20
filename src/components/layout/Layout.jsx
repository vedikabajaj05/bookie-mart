import React from "react";
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function Layout({ children }) {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow">
        {children}
      </div>
      
      <Footer />
    </div>
    
  )
}

export default Layout

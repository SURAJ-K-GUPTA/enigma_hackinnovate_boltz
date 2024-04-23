import React from 'react'
import Navbar from './Navbar'
import ShopDetails from '../features/shop/components/ShopDetails'
import Footer from './Footer'

const ShopDetailsPage = () => {
  return (
    <div>
      <Navbar>
        <ShopDetails />
      </Navbar>
      <Footer />
    </div>
  )
}

export default ShopDetailsPage
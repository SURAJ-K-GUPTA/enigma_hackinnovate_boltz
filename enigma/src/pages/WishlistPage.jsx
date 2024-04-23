import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Wishlist from '../features/wishlist/Wishlist'

const WishlistPage = () => {
  return (
    <div>
        <Navbar>
        <h1 style={{margin:'10px'}}>Wishlist</h1>
            <Wishlist />
        </Navbar>
        <Footer />
    </div>
  )
}

export default WishlistPage
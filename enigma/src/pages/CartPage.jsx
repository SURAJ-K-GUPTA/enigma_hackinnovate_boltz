import React from 'react'
import Navbar from './Navbar'
import Cart from '../features/cart/Cart'
import Footer from './Footer'

const CartPage = () => {
  return (
    <div>
        <Navbar>
        <h1 style={{margin:'10px'}}>Cart</h1>
            <Cart />
        </Navbar>
        <Footer />
    </div>
  )
}

export default CartPage
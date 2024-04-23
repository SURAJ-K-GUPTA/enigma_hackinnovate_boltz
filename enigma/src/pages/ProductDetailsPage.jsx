import React from 'react'
import Navbar from './Navbar'
import ProductDetails from '../features/shop/components/ProductDetails'
import Footer from './Footer'

const ProductDetailsPage = () => {
  return (
    <div>
        <Navbar>
            <ProductDetails />
        </Navbar>
        <Footer />
    </div>
  )
}

export default ProductDetailsPage
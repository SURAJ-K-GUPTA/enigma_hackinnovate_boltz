import React from 'react'
import Footer from './Footer'
import SellerNavbar from './SellerNavbar'
import SellerRegister from '../features/seller_auth/components/SellerRegister'

const SellerRegisterPage = () => {
  return (
    <div>
      <SellerNavbar>
      <SellerRegister />
      </SellerNavbar>
      <Footer />
    </div>
  )
}

export default SellerRegisterPage
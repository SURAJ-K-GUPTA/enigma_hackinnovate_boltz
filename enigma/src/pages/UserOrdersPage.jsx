import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import UserOrders from '../features/user/components/UserOrders'

const UserOrdersPage = () => {
  return (
    <div>
        <Navbar>
            <UserOrders />
        </Navbar>
        <Footer />
    </div>
  )
}

export default UserOrdersPage
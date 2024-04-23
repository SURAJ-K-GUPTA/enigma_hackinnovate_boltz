import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import UserProfile from '../features/user/components/UserProfile'

const UserProfilePage = () => {
  return (
    <div>
        <Navbar>
            <UserProfile />
        </Navbar>
        <Footer />
    </div>
  )
}

export default UserProfilePage
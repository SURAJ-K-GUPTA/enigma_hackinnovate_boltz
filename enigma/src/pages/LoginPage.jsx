import React from 'react'
import Navbar from './Navbar'
import Login from '../features/auth/components/Login'
import Footer from './Footer'

const LoginPage = () => {
  return (
    <div>
        <Navbar>
            <Login></Login>
        </Navbar>
        <Footer/>
    </div>
  )
}

export default LoginPage
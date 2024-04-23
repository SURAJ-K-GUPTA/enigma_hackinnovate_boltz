import React from 'react'
import Signup from '../features/auth/components/Signup'
import Navbar from './Navbar'
import Footer from './Footer'

const SignupPage = () => {
  return (
    <div>
        <Navbar>
            <Signup></Signup>
        </Navbar>
        <Footer/>
    </div>
  )
}

export default SignupPage
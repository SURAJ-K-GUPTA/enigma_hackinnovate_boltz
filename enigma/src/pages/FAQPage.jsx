import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import styled from 'styled-components'

const FAQPage = () => {
  return (
    <Container>
        <Navbar>
            <h1 style={{margin:'10px'}}>FREQUNTLY ASKED QUESTIONS</h1>
            
        </Navbar>
        <Footer />
    </Container>
  )
}

const Container = styled.div``

export default FAQPage
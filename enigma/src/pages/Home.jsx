import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import styled from "styled-components";
import ShopPage from './ShopPage';

const Home = () => {
  return (
    <Container>
        <Navbar>
            <ShopPage />
        </Navbar>
        <Footer />
    </Container>
  )
}

const Container=styled.div``;


export default Home
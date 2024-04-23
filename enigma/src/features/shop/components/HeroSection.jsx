import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { HiChevronDoubleDown } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';

const selectedShop = {
  images: {
    gallery: [
      "https://cdn.pixabay.com/photo/2021/08/11/16/06/mountain-6538890_1280.jpg",
      "https://cdn.pixabay.com/photo/2021/02/24/20/53/abstract-6047465_1280.jpg",
      "https://cdn.builder.io/api/v1/image/assets/TEMP/48043fdaf909be00bf33c8b1804933636ec6b2659587d19319520a0b79b2d8ad?apiKey=59522909af314c5d9216d44e43c6783c&width=800",
      "https://cdn.pixabay.com/photo/2015/04/23/12/32/hell-735995_1280.jpg",
      // Add more image URLs here if needed
    ]
  }
};
const HeroSection = () => {
  const user = useSelector(selectLoggedInUser);
  const scrollDown = () => {
    // Calculate the Y coordinate to scroll down by 90vh
    const scrollY = window.innerHeight * 0.1;
  
    // Scroll to the calculated position with smooth behavior
    window.scrollTo({
      top: scrollY,
      behavior: 'smooth'
    });
  };
  
  return (
    <Container>
        <div className="top">
            <div className="top-div-hero">
              <h1>
              Explore breathtaking art at <span>Enigma</span>, with no additional fees
              </h1>
              <h4>Relax on your sofa as we bring the art gallery to you</h4>
            </div>
            <div className="start-buying-btn">
              {!user && <Link to="/login" className="btn">
                Start Buying
              </Link>}
              {user && <HiChevronDoubleDown size={60} onClick={scrollDown} className="ChevronDoubleDown" />}
            </div>
          </div>
          <div className="box">
            <div className="sliderbox">
              <div className="slider">
                {selectedShop &&
                  selectedShop.images.gallery.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt="shopImages" className="img-shop" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
    </Container>
  )
}
const Container = styled.div`


h1,h4{
  color : #fff
}

position: relative;
  .box {
    display: flex;
    justify-content: space-between;
    text-align: center;
    position: relative;
    position: relative;
    display: flex;
    justify-content: space-between;
    text-align: center;
    z-index: 0;
  }

  .sliderbox {
    width: 100%;
    height: 90vh;
    overflow-x: hidden;
  }

  .slider {
    width: 400%;
    height: 100%;
    display: flex;
    position: relative;
    animation: cartoon 24s infinite;
  }

  @keyframes cartoon {
    0% {
      left: 0;
    }

    25% {
      left: -100%;
    }

    50% {
      left: -200%;
    }

    75% {
      left: -300%;
    }
  }

  .img-shop {
    height: 90vh; /* Fixed height */
    width: 100vw; /* Responsive width */
    object-fit: cover; /* Maintain aspect ratio and cover the container */
    display: block; /* Remove any default inline styles that may affect layout */
    margin: 0;
    /* filter: grayscale(1); */
  }



@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
}

.ChevronDoubleDown {
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  animation: bounce 1.5s infinite; /* Add the bounce animation */
}

.ChevronDoubleDown:hover {
  transform: scale(1.2);
  animation: none; /* Disable the bounce animation on hover */
  transition: transform 0.6s ease-in-out; /* Adjust the duration for a slower scale on hover */
}

  .btn {
    cursor: pointer;
    user-select: none;
    background-color: #6933d3;
    color: #f2e3e3;
    padding: 6px;
    margin: 3px;
    border-radius: 10px;
    text-align: center;
  }
  .start-buying-btn-div{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin-bottom: 6vh;
  }
  a {
    text-decoration: none;
    color: #f2e3e3;
  }
  .top {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    padding-top: 20vh;
    height: 75vh;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: top;
    padding-top: 20vh;
    height: 75vh;
    z-index: 1;


    .top-div-hero {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .start-buying-btn {
      margin-top: 10vh;
    }
  }
  .top::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url("../../../image/first-img.png");
    // background: radial-gradient(
    //   100.21% 831.17% at 2.76% -42.7%,
    //   #b9ffe2 0%,
    //   rgba(185, 255, 226, 0.572558) 24.26%,
    //   rgba(185, 255, 226, 0.291387) 54.44%,
    //   rgba(185, 255, 226, 0) 100%
    // );
    transform: rotate(180deg);
    z-index: -1;
  }
  `
export default HeroSection
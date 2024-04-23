import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchShopByIdAsync, selectShopById } from "../shopSlice";
import ProductCard from "./ProductCard";
// const imgurl ="https://media.istockphoto.com/id/1462545505/photo/girl-artist-hand-holds-paint-brush-and-draws-surreal-fairy-tale-portrait-on-white-canvas.jpg?s=2048x2048&w=is&k=20&c=4sy2pvYy81yd4hOXCLCx20M8CpBmrUfkbwOoB7AaRnw=";
const ShopDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShopByIdAsync(shopId));
  },[]);

  const selectedShop = useSelector(selectShopById);
  const { shopId } = useParams();
  return (
    <Container>
      {selectedShop && Object.keys(selectedShop).length !== 0 && (
        <div className="shopDetailsPage">
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
          <div className="hero">
            {selectedShop && (
              <div>
                <div className="name">{selectedShop.storeName}</div>
                <div className="shopDetails">
                  <div className="image">
                    <img src={selectedShop.images.logo} alt="shopLogo" />
                  </div>
                  <div className="shopDetailsRight">
                    <div className="shopDescription">
                      <div>{selectedShop.description}</div>
                      <div>
                        <span>Contact :- </span>
                        {selectedShop.shopkeeper.contact}
                      </div>
                      <div className="discount">
                        <span>
                          {selectedShop.minDiscount}% min off on each item
                        </span>
                        {/* <div className="btn">Order</div> */}
                      </div>
                    </div>
                    <div className="shopRating">{selectedShop.rating}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            {selectedShop && <ProductCard products={selectedShop.products} />}
          </div>
          <div className="reviews">
            <h1>give review</h1>
            <div>stars here</div>
            <div>input here</div>
            <div>submit button here</div>
          </div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  .shopDetailsPage {
    position: relative;
  }
  .box {
    display: flex;
    justify-content: space-between;
    text-align: center;
    position: relative;
  }

  .sliderbox {
    width: 100%;
    height: 400px;
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
    height: 400px; /* Fixed height */
    width: 100vw; /* Responsive width */
    object-fit: cover; /* Maintain aspect ratio and cover the container */
    display: block; /* Remove any default inline styles that may affect layout */
    margin: 0;
    /* filter: grayscale(1); */
  }

  .hero {
    position: absolute;
    z-index: 10;
    top: 25%; /* Adjust this value to vertically center "hi" */
    left: 50%; /* Center "hi" horizontally */
    transform: translate(
      -50%,
      -50%
    ); /* Center "hi" both vertically and horizontally */
    background-color: rgba(
      255,
      255,
      255,
      0.7
    ); /* Optional: Add a semi-transparent background */
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Shadow effect */
    /* background-color: rgba(0, 0, 0, 0.8); Dark background color with 80% opacity */
    /* color: #fff; Text color, change as needed */
    /* padding: 15px; Adjust padding as needed */
    .card {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      max-width: 600px;

      .name {
        background-color: #000000;
        color: #f2e3e3;
        border-radius: 10px 10px 0 0;
      }
    }

    .shopDetails {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      background-color: #d9d9d9;
      color: black;
      border-radius: 0 0 10px 10px;

      .image {
        width: 30%;
        overflow: hidden;
        border-radius: 0 0 0 10px;
        img {
          max-width: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          margin: 0 auto;
        }
      }

      .shopDetailsRight {
        border-radius: 0 0 10px 10px;

        width: 70%;
        .shopDescription {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 85%;
          padding: 0 10px;
          .discount {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

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
          }
        }
        .shopRating {
          background-color: #f2e3e3;
          height: 15%;
          border-radius: 0 0 10px 0;
        }
      }
    }
  }
`;
export default ShopDetails;

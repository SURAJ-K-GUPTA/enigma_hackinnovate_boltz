import React from "react";
import Footer from "./Footer";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CgArrowLongDown } from "react-icons/cg";
import SellerNavbar from "./SellerNavbar";

const ShopkeeperLandingPage = () => {
  return (
    <div>
      <SellerNavbar>
        <Container>
          <div className="top">
            <div className="top-div-hero">
              <h1>
                Start selling your products on <span>enigma</span> with zero
                selling cost
              </h1>
              <h4>Become a seller and grow your business in India</h4>
            </div>
            <div className="start-selling-btn">
              <Link to="/register-seller" className="btn">
                Start Selling
              </Link>
            </div>
          </div>
          <div className="mid">
            <h1>
              Get started in <span>5</span> simple <span>steps</span>
            </h1>
          </div>
          <div className="bottom">
            <div className="step-div">
              <div className="step">
                <div className="step-num">STEP 1</div>
                <div className="arrow-down">
                  <CgArrowLongDown />
                </div>
              </div>
              <div className="step">
                <div className="step-num">STEP 2</div>
                <div className="arrow-down">
                  <CgArrowLongDown />
                </div>
              </div>
              <div className="step">
                <div className="step-num">STEP 3</div>
                <div className="arrow-down">
                  <CgArrowLongDown />
                </div>
              </div>
              <div className="step">
                <div className="step-num">STEP 4</div>
                <div className="arrow-down">
                  <CgArrowLongDown />
                </div>
              </div>
              <div className="step">
                <div className="step-num">STEP 5</div>
                <div className="arrow-down">
                  {/* <CgArrowLongDown /> */}
                </div>
              </div>
              
            </div>
            <div className="step-div">
              
             <div className="step-details">
                <div className="step-name">Create your account</div>
                <div className="step-name-details">All your need is: GSTIN Bank Account</div>
              </div>

              <div className="step-details">
                <div className="step-name">List your products</div>
                <div className="step-name-details"> Upload and list the products you want to sell</div>
              </div>

              <div className="step-details">
                <div className="step-name">Get Orders</div>
                <div className="step-name-details">Start getting orders from customer across India</div>
              </div>

              <div className="step-details">
                <div className="step-name">Ship order</div>
                <div className="step-name-details">Ship the order on same the day for fast delivery</div>
              </div>

              <div className="step-details">
                <div className="step-name">Get your payments</div>
                <div className="step-name-details">Get your payments into your account instantly</div>
              </div>
            </div>
          </div>
          <div className="start-selling-btn-div">
              <Link to="/register-seller" className="btn">
                Start Selling
              </Link>
            </div>
        </Container>
      </SellerNavbar>
      <Footer />
    </div>
  );
};

const Container = styled.div`
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
  .start-selling-btn-div{
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
    .top-div-hero {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .start-selling-btn {
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
    background: radial-gradient(
      100.21% 831.17% at 2.76% -42.7%,
      #b9ffe2 0%,
      rgba(185, 255, 226, 0.572558) 24.26%,
      rgba(185, 255, 226, 0.291387) 54.44%,
      rgba(185, 255, 226, 0) 100%
    );
    transform: rotate(180deg);
    z-index: -1;
  }

  .mid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 20vh;

    /* Get started in 5 simple steps */
    .h1 {
      font-family: "Open Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 48px;
      line-height: 65px;
      display: flex;
      align-items: center;
      letter-spacing: 0.01em;
    }
  }

  .bottom{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #FFF7E9;
    .step-div{
        display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 10px;
    .step{
        display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    .step-num{
        background-color: #11419E;
        color: white;
        padding: 3px;
    }
    }
    .step-details{
        display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 10px;
    .step-name{
        padding: 3px;
        font-weight: bold;
    }
    }
}
  }
  
`;

export default ShopkeeperLandingPage;

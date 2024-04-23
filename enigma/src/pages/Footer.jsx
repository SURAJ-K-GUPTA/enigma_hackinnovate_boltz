import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <div className="footer">
        <div className="div-foot">
          <span className="enigma">
            <Link to="/">Enigma</Link>
          </span>
        </div>
        <div className="div-foot">
          <Link to="/help-center">Visit help center</Link>
          <Link to="/shopkeeper">Register as Artist</Link>
        </div>
        <div className="div-foot div-foot-bottom">
          <div className="div-foot-bottom-inside">
            <span>
              <Link to="/company">Company</Link>
            </span>
            <div>
              <Link to="/about">About</Link>
            </div>
            <div>
              <Link to="/our-offering">Our offering</Link>
            </div>
            <div>
              <Link to="/newsroom">Newsroom</Link>
            </div>
          </div>
          <div className="div-foot-bottom-inside">
            <span>
              <Link to="/products">Products</Link>
            </span>
            <div>
              <Link to="/buy">Buy</Link>
            </div>
            <div>
              <Link to="/deliver">Deliver</Link>
            </div>
            <div>
              <Link to="/digi-shop">Digi Shop</Link>
            </div>
          </div>
          <div className="div-foot-bottom-inside">
            <span>
              <Link to="/contact">Contact</Link>
            </span>
            <div>
              <Link to="/faq">FAQ</Link>
            </div>
            <div>
              <Link to="/phone">Phone</Link>
            </div>
            <div>
              <Link to="/">Email</Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="copyright">
          c 2024-2025 Enigma | All Rights Reserved
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .footer {
    display: flex;
    flex-direction: column;
min-height: 40vh;
width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    background-color: #000000;
    color: #f2e3e3;
    a {
      text-decoration: none;
      color: #f2e3e3;
    }
    .enigma {
      color: #f2e3e3;
      font-size: xx-large;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    }
    .div-foot {
      margin: 10px 0;
      padding: 0 30px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    
    .div-foot-bottom-inside {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      span {
        margin: 30px 0;
        font-size: large;
      }
    }
    hr{
      width: 100%;
      color: #f2e3e3;
      margin-top: 30px;
    }
    .copyright{
      font-size: small;
      margin: 30px 0;
    }
  }
`;

export default Footer;

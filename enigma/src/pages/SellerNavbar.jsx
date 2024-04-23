import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const userNavigationItems = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

const SellerNavbar = ({ children }) => {
  const [userNavigation, setuserNavigation] = useState(false);
  const location = useLocation();

  const pathName = location.pathname;
  const pathNameValue = pathName.split("/")[1];
  useEffect(() => {window.scrollTo(0, 0);}, []);

  return (
    <Container>
      {/* <h1>{pathNameValue}</h1> */}
      <div className="navbar">
          <>
            <div className="left">
              <span className="enigma">
                <Link to="/">enigma</Link>
              </span>
            </div>
            <div className="center">
              <Link to="/register-seller" className="btn">
                Register as Seller
              </Link>
            </div>

            <div className="right">
              <Link to="/login" className="btn">
                Login as Seller
              </Link>
            </div>
          </>
        
      </div>
      <main
        className="child"
        onClick={(e) => {
          setuserNavigation(false);
        }}
      >
        {children}
      </main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .btn {
    cursor: pointer;
    user-select: none;
    background-color: #6933d3;
    color: #f2e3e3;
    padding: 6px;
    margin: 3px;
    border-radius: 10px;
    text-align: center;
    span {
      padding: 0 10px;
      text-align: center;
    }
  }
  .navbar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    background-color: #000000;
    min-height: 10vh;
    position: sticky;
    top: 0;
    z-index: 11;
    box-shadow: 0 5px;
    background-color: #000000;
    color: #f2e3e3;
    a {
      text-decoration: none;
      color: #f2e3e3;
    }
    .icons {
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #f2e3e3;
    }
    .user-nav {
      margin-top: 30px;
      z-index: 10;
      box-shadow: 5px 5px;
      background-color: #000000;
      color: #f2e3e3;
      position: absolute;
      border-radius: 0 20px 20px 20px;
      padding: 10px;
      top: 30px;
      left: 10px;
      display: flex;
      .user-nav-items {
        min-width: 100%;
        .user-nav-item {
          padding: 10px;
          border-radius: 10px;
        }
        .user-nav-item:hover {
          outline: 1px solid #f2e3e3;
        }
      }
    }
    .left,
    .right {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }
    .enigma {
      color: #f2e3e3;
      font-size: xx-large;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
    }
  }
  .child {
    min-height: 90vh;
  }
`;
export default SellerNavbar;

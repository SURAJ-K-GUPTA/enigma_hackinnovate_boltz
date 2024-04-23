import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const userNavigationItems = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

const noUserNavigationItems = [
  // { name: "My Profile", link: "/login" },
  // { name: "My Orders", link: "/login" },
  { name: "Sign In", link: "/login" },
];

const Navbar = ({ children }) => {
  const [userNavigation, setuserNavigation] = useState(false);
  const location = useLocation();
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const pathName = location.pathname;
  const pathNameValue = pathName.split("/")[1];
  useEffect(() => {window.scrollTo(0, 0);}, []);

  return (
    <Container>
      {/* <h1>{pathNameValue}</h1> */}
      <div className="navbar">
          <>
            <div className="left">
            <span className="icons nav-arrow">
                <span  onClick={() => navigate(-1)}>
                  <HiChevronLeft size={30} />
                </span>
              </span>
              <span className="icons">
                <div className="user-icon"
                  onClick={(e) => {
                    setuserNavigation(!userNavigation);
                  }}
                >
                  <FaUser size={30} />
                </div>
                {userNavigation && user &&(
                  <div className="user-nav">
                    <div className="user-nav-items">
                      {userNavigationItems.map((item, index) => (
                        <Link to={item.link} key={index}>
                          <div className="user-nav-item">{item.name}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {userNavigation && !user &&(
                  <div className="user-nav">
                    <div className="user-nav-items">
                      {noUserNavigationItems.map((item, index) => (
                        <Link to={item.link} key={index}>
                          <div className="user-nav-item">{item.name}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </span>
              <span className="icons">
                <Link to="/">
                  <IoMdHome size={30} />
                </Link>
              </span>
              <span className="icons">
                <Link to="/">
                  <MdOutlineSearch size={30} />
                </Link>
              </span>
            </div>
            <div className="center">
              <span className="enigma">
                <Link to="/">Enigma</Link>
              </span>
            </div>
            <div className="right">
              <span className="icons">
                <Link to="/wishlist">
                  <FaRegHeart size={30} />
                </Link>
              </span>
              <span className="icons">
                <Link to="/cart">
                  <MdOutlineShoppingCart size={30} />
                </Link>
              </span>
              <span className="icons nav-arrow">
                <span  onClick={() => navigate(1)}>
                  <HiChevronRight size={30} />
                </span>
              </span>
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
    color: #000000;
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
      a,span,.user-icon{
        cursor: pointer;
        scale: 1;
      }
      a:hover,span:hover,.user-icon:hover{
        scale: 1.2;
      }
    }
    .nav-arrow{
      span{
        scale: 1.5;
      }
      span:hover{
        svg{
          scale: 1.2;
        }
      }
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
      left: 60px;
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
export default Navbar;

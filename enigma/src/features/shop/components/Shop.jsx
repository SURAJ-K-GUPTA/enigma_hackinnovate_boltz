import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShopsByFiltersAsync, selectShops } from "../shopSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShopSearch from "./ShopSearch";
import HeroSection from "./HeroSection";
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchShopsByFiltersAsync({
        filter: {},
        sort: {},
        pagination: {},
        admin: false,
      })
    );
  }, [dispatch]);
  const shops = useSelector(selectShops);

  return (
    <div>
      <HeroSection />
      <ShopSearch />
      <Container>
        {shops &&
          shops.map((shop, index) => (
            <div key={shop.id} className="card">
              <ShopCard key={shop.id} shop={shop} />
            </div>
          ))}
      </Container>
    </div>
  );
};

const ShopCard = ({ shop }) => {
  return (
    <Link to={`/shop/${shop.id}`}>
      <div className="card">
        <div className="image">
          <img src={shop.images.logo} alt="shopLogo" />
          <div className="overlay">
            <div className="btn">Visit Artist Store</div>
          </div>
        </div>
        <div className="details">
          <div className="name">{shop.storeName}</div>
          {/* <div className="shopDescription">
            <div>{shop.description}</div>
            <div>
              <span>Contact: </span>
              {shop.shopkeeper.contact}
            </div>
            <div>{shop.minDiscount}% min off on each item</div>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
//   gap: 16px;
//   margin: 10px;
//   justify-items: center;
//   align-content: center;
//   a {
//     text-decoration: none;
//     color: #f2e3e3;
//   }
//   .card {
//     display: flex;
//     flex-direction: column;
//     flex-wrap: wrap;
//     max-width: 600px;

//     .name {
//       background-color: #000000;
//       color: #f2e3e3;
//       border-radius: 10px 10px 0 0;
//       text-align: center;
//       padding: 3px;
//       font-size: larger;
//     }
//   }
//   .card:hover{
//     cursor: pointer;
//   transition: transform 0.3s ease-in-out;
//   animation: bounce 1.5s infinite; /* Add the bounce animation */

//   }

//   .shopDetails {
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     background-color: #d9d9d9;
//     color: black;
//     border-radius: 0 0 10px 10px;

//     .image {
//       width: 30%;
//       overflow: hidden;
//       border-radius: 0 0 0 10px;
//       img {
//         max-width: 100%;
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         display: block;
//         margin: 0 auto;
//       }
//     }

//     .shopDetailsRight {
//       border-radius: 0 0 10px 10px;

//       width: 70%;
//       .shopDescription {
//         display: flex;
//         flex-direction: column;
//         height: 100%;
//         padding: 0 10px;
//         .discount {
//           display: flex;
//           flex-direction: column;
//         }
//       }
//       .btn {
//         cursor: pointer;
//         user-select: none;
//         background-color: #6933d3;
//         color: #f2e3e3;
//         padding: 6px;
//         margin: 3px;
//         border-radius: 10px;
//         text-align: center;
//       }
//     }
//   }
// `;

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
//   gap: 16px;
//   margin: 10px;
//   justify-items: center;
//   align-content: center;

//   a {
//     text-decoration: none;
//     color: #f2e3e3;
//   }

//   .card {
//     background-color: #fff; 
//     border-radius: 10px;
//     overflow: hidden;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//     transition: transform 0.3s ease-in-out;
//     max-width: 600px;

//     &:hover {
//       cursor: pointer;
//       transform: translateY(-5px);
//     }

//     .name {
//       background-color: #000000;
//       color: #f2e3e3;
//       border-radius: 10px 10px 0 0;
//       text-align: center;
//       padding: 10px;
//       font-size: larger;
//     }

//     .shopDetails {
//       display: flex;
//       flex-direction: row;
//       background-color: #fff /* Darker background color */
//       color: #f2e3e3;
//       border-radius: 0 0 10px 10px;

//       .image {
//         width: 30%;
//         overflow: hidden;
//         border-radius: 0 0 0 10px;

//         img {
//           max-width: 100%;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           display: block;
//           margin: 0 auto;
//         }
//       }

//       .shopDetailsRight {
//         width: 70%;
//         padding: 10px;

//         .shopDescription {
//           display: flex;
//           flex-direction: column;
//           height: 100%;

//           div {
//             margin-bottom: 5px;
//           }

//           .btn {
//             background-color: #6933d3;
//             color: #f2e3e3;
//             padding: 6px;
//             margin: 3px;
//             border-radius: 10px;
//             text-align: center;
//             cursor: pointer;
//           }
//         }
//       }
//     }
//   }
// `;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 16px;
  margin: 10px;
  justify-items: center;
  align-content: center;

  a {
    text-decoration: none;
    color: #f2e3e3;
  }

  .card {
    background-color: #fff; /* Dark background color */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    position: relative;
    transition: transform 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: translateY(-5px);
    }

    .image {
      width: 100%;
      overflow: hidden;
      border-radius: 10px;
      position: relative;

      img {
        max-width: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease-in-out;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;

        &:hover {
          opacity: 1;
        }

        .btn {
          background-color: #6933d3;
          color: #f2e3e3;
          padding: 10px 20px;
          border-radius: 10px;
          text-align: center;
          cursor: pointer;
        }
      }
    }

    .details {
      padding: 20px;

      .name {
        background-color: #000000;
        color: #f2e3e3;
        border-radius: 10px;
        text-align: center;
        padding: 10px;
        font-size: larger;
      }

      .shopDescription {
        margin-top: 10px;
        color: #f2e3e3;
        text-align: center;

        div {
          margin-bottom: 5px;
        }
      }
    }
  }
`;


export default Shop;

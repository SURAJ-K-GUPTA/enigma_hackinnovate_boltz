import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteWishlistItemFromWishlistAsync,
  fetchWishlistItemsByUserIdAsync,
  selectWishlistItems,
  // updateWishlistAsync,
  resetWishlistAsync,
} from "./wishlistSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { selectLoggedInUser } from "../auth/authSlice";
// import { discountedPrice } from "../../app/constants";
import { addToCartAsync, deleteItemFromProductIdAsync, selectCartItems } from "../cart/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems)

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(fetchWishlistItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  const wishlistItems = useSelector(selectWishlistItems);
  // const status = useSelector(selectWishlistStatus);
  // const wishlistLoaded = useSelector(selectWishlistLoaded);

  // const totalAmount = wishlistItems.reduce(
  //   (amount, item) => discountedPrice(item) * item.quantity + amount,
  //   0
  // );
  // const totalItems = wishlistItems.reduce(
  //   (total, item) => item.quantity + total,
  //   0
  // );

  const handleCart = (e, product) => {
    e.preventDefault();
    if (cartItems.findIndex((item) => item.productId === product.id) < 0) {
      let newItem = { ...product };
      delete newItem.id;

      newItem = {
        ...newItem,
        productId: product.productId,
        userId: user.id,
        quantity: 1,
      };

      dispatch(addToCartAsync(newItem));
    }
  };

  const handleDeleteItemFromCart = (e, wishlistItem) => {
    e.preventDefault()
    var res = window.confirm(
      `Do you want to delete "${wishlistItem.name}" from cart`
    );
    const userId = user.id
    console.log(user.id)
    if (res) {
      dispatch(deleteItemFromProductIdAsync( {userId, productId : wishlistItem.productId} ));
    }
  };


  // const handleQuantity = (e, wishlistItem, value) => {
  //   const quant = wishlistItem.quantity + value;
  //   if (quant > 0) {
  //     dispatch(updateWishlistAsync({ id: wishlistItem.id, quantity: +quant }));
  //   }
  // };

  const handleDeleteItemFromWishlist = (e, wishlistItem) => {
    var res = window.confirm(
      `Do you want to delete "${wishlistItem.name}" from wishlist`
    );
    if (res) {
      dispatch(deleteWishlistItemFromWishlistAsync(wishlistItem.id));
    }
  };

  const handleResetWishlist = (e) => {
    e.preventDefault()
    var res = window.confirm(
      `Do you want to delete Reset Wishlist`
    );
    const userId = user.id
    console.log(user.id)
    if (res) {
      dispatch(resetWishlistAsync(userId));
    }
  };


  return (
    <>
      <Container>
        {!wishlistItems.length > 0 && (
          <div className="empty">
            <h1>Wishlist is Empty</h1>
            <div className="goBack" onClick={() => navigate(-1)}>
              {" "}
              &lt; Go back
            </div>
            <Link to="/" className="goBackHome">
              &lt; Go back home
            </Link>
          </div>
        )}
        {wishlistItems &&
          wishlistItems.map((wishlistItem, index) => (
            <div key={wishlistItem.id} className="card">
              <div>
                {/* <div className="name">{wishlistItem.name}</div> */}
                <div className="productDetails">
                  <Link
                    to={`/shop/${wishlistItem.shopId}/wishlistItem/${wishlistItem.id}`}
                    className="image"
                  >
                    <img src={wishlistItem.productImage} alt="productLogo" />
                  </Link>
                  <div className="productDetailsRight">
                    <div className="icons">
                      {/* <div className="veg">
                        <GoDotFill size={20} />
                      </div> */}
                      <div className="fav" onClick={(e)=>{handleDeleteItemFromWishlist(e,wishlistItem)}} >
                        <FaHeart size={30} />
                      </div>
                    </div>
                    <div className="productName">{wishlistItem.name}</div>
                    <div className="rating">
                      {wishlistItem.productRating}({wishlistItem.productRatingCount})
                    </div>
                    <div className="order">
                    <div className="price">{wishlistItem.price}</div>
                    {cartItems.findIndex((item) => item.productId === wishlistItem.productId) < 0 && <div
                      className="btn"
                      onClick={(e) => {
                        handleCart(e, wishlistItem);
                      }}
                    >
                      Add to Cart
                    </div>}
                    {cartItems.findIndex((item) => item.productId === wishlistItem.productId) >= 0 && <div
                      className="btn-danger"
                      onClick={(e) => {
                              handleDeleteItemFromCart(e, wishlistItem);
                            }}
                    >
                      Remove from Cart
                    </div>}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {wishlistItems.length>0 && (
          <div className="subtotal-div">
            <div>
              <p className="btn-danger" onClick={(e)=>{handleResetWishlist(e)}}>Reset Wishlist</p>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 16px;
  padding: 10px 0;
  justify-items: center;
  align-content: center;

  .subtotal-div {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .empty {
    text-align: center;
    line-height: 2rem;
    .goBack,
    .goBackHome {
      cursor: pointer;
      text-decoration: none;
      color: black;
    }
    .goBack:hover,
    .goBackHome:hover {
      color: #000000;
    }
  }
  a {
    text-decoration: none;
    color: #f2e3e3;
  }
  .card {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 10px;

    .name {
      background-color: #000000;
      color: #f2e3e3;
      border-radius: 10px 10px 0 0;
    }
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
    span {
      padding: 0 10px;
      text-align: center;
    }
    .addQuantity {
      border-left: 3px solid green;
      border-right: 3px solid green;
    }
  }
  .btn-danger{
      cursor: pointer;
    user-select: none;
    background-color: #dc3545;
    color: #ffffff;
    padding: 6px;
    margin: 3px;
    border-radius: 10px;
    text-align: center;
    }
  .veg {
    border: 3px solid green;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: green;
  }
  .fav {
    color: #e74f4f;
    height: 30px;
    width: 30px;
  }

  .productDetails {
    display: flex;
    flex-direction: row;
    background-color: white;
    color: black;

    .image {
      width: 30%;
      overflow: hidden;
      border-radius: 10px;
      img {
        max-width: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        margin: 0 auto;
      }
    }

    .productDetailsRight {
      outline: 1px black solid;
      border-radius: 10px;
      margin-left: 10px;
      width: 70%;
      .icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
      }
      .productName,
      .rating {
        text-align: left;
        margin: 10px;
      }
      .order {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
      }
    }
  }
`;
export default Wishlist;

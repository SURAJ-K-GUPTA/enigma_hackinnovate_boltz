import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  fetchItemsByUserIdAsync,
  // selectCartLoaded,
  // selectCartStatus,
  selectCartItems,
  updateCartAsync,
  resetCartAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { selectLoggedInUser } from "../auth/authSlice";
// import ProductCard from "../shop/components/ProductCard";
import { discountedPrice } from "../../app/constants";
import { addToWishlistAsync, deleteWishlistItemFromProductIdAsync, selectWishlistItems } from "../wishlist/wishlistSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems)
  // const status = useSelector(selectCartStatus);
  // const cartLoaded = useSelector(selectCartLoaded);

  const totalAmount = cartItems.reduce(
    (amount, item) => discountedPrice(item) * item.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const handleQuantity = (e, cartItem, value) => {
    const quant = cartItem.quantity + value;
    if (quant > 0) {
      dispatch(updateCartAsync({ id: cartItem.id, quantity: +quant }));
    }
  };

  const handleDeleteItemFromCart = (e, cartItem) => {
    var res = window.confirm(
      `Do you want to delete "${cartItem.name}" from cart`
    );
    if (res) {
      dispatch(deleteItemFromCartAsync(cartItem.id));
    }
  };

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    if (wishlistItems.findIndex((item) => item.productId === product.productId) < 0) {
      let newItem = { ...product };
      delete newItem.id;

      newItem = {
        ...newItem,
        productId: product.productId,
        userId: user.id,
        quantity: 1,
      };

      dispatch(addToWishlistAsync(newItem));
    }
  };

  const handleDeleteItemFromWishlist = (e, product) => {
    e.preventDefault()
    var res = window.confirm(
      `Do you want to delete "${product.name}" from wishlist`
    );
    const userId = user.id
    console.log(user.id)
    if (res) {
      dispatch(deleteWishlistItemFromProductIdAsync( {userId, productId : product.productId} ));
    }
  };

  const handleResetCart = (e) => {
    e.preventDefault()
    var res = window.confirm(
      `Do you want to delete Reset Cart`
    );
    const userId = user.id
    console.log(user.id)
    if (res) {
      dispatch(resetCartAsync(userId));
    }
  };



  return (
    <>
      <Container>
        {!cartItems.length > 0 && (
          <div className="empty">
            <h1>Cart is Empty</h1>
            <div className="goBack" onClick={() => navigate(-1)}>
              {" "}
              &lt; Go back
            </div>
            <Link to="/" className="goBackHome">
              &lt; Go back home
            </Link>
          </div>
        )}
        {cartItems &&
          cartItems.map((cartItem, index) => (
            <div key={cartItem.id} className="card">
              <div>
                {/* <div className="name">{cartItem.name}</div> */}
                <div className="productDetails">
                  <Link
                    to={`/shop/${cartItem.shopId}/product/${cartItem.id}`}
                    className="image"
                  >
                    <img src={cartItem.productImage} alt="productLogo" />
                  </Link>
                  <div className="productDetailsRight">
                    <div className="icons">
                      {/* <div className="veg">
                        <GoDotFill size={20} />
                      </div> */}
                      {wishlistItems.findIndex(
                        (item) => item.productId === cartItem.productId
                      ) < 0 && (
                        <div
                          className="fav"
                          onClick={(e) => {
                            handleAddToWishlist(e, cartItem);
                          }}
                        >
                          <FaRegHeart size={30} />
                        </div>
                      )}
                      {wishlistItems.findIndex(
                        (item) => item.productId === cartItem.productId
                      ) >= 0 && (
                        <div
                          className="fav"
                          onClick={(e) => {
                            handleDeleteItemFromWishlist(e, cartItem);
                          }}
                        >
                          <FaHeart size={30} />
                        </div>
                      )}
                    </div>
                    <div className="productName">{cartItem.name}</div>
                    <div className="rating">
                      {cartItem.productRating}({cartItem.productRatingCount})
                    </div>
                    <div className="order">
                      <div className="price">{cartItem.price}</div>
                      <div className="btn">
                        {cartItem.quantity === 1 && (
                          <span
                            onClick={(e) => {
                              handleDeleteItemFromCart(e, cartItem);
                            }}
                          >
                            <MdDelete />
                          </span>
                        )}
                        {cartItem.quantity > 1 && (
                          <span
                            onClick={(e) => {
                              handleQuantity(e, cartItem, -1);
                            }}
                          >
                            -
                          </span>
                        )}
                        <span className="addQuantity">{cartItem.quantity}</span>
                        <span
                          onClick={(e) => {
                            handleQuantity(e, cartItem, +1);
                          }}
                        >
                          + Add
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {cartItems.length>0 && (
          <div className="subtotal-div">
            <div>
              <p>Subtotal after discount</p>
              <p className="btn">{totalAmount}</p>
              <Link to="/checkout">
                <div className="btn">Buy Now ({totalItems} Items)</div>
              </Link>
              <p className="btn-danger" onClick={(e)=>{handleResetCart(e)}}>Reset Cart</p>
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
export default Cart;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { selectCount } from "./counterSlice";
// import Cart from "../cart/Cart";
import styled from "styled-components";
import { selectLoggedInUser } from "../auth/authSlice";
import {
  deleteItemFromCartAsync,
  fetchItemsByUserIdAsync,
  // selectCartLoaded,
  // selectCartStatus,
  selectCartItems,
  updateCartAsync,
} from "../cart/cartSlice";
import { discountedPrice } from "../../app/constants";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import AddressForm from "../../common/AddressForm";
import { createOrderAsync, selectCurrentOrder } from "../order/orderSlice";

const Checkout = () => {
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
  // const status = useSelector(selectCartStatus);
  // const cartLoaded = useSelector(selectCartLoaded);
  const currentOrder = useSelector(selectCurrentOrder);

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

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        cartItems,
        totalAmount,
        totalItems,
        paymentMethod,
        selectedAddress,
        userId : user.id,
        status: "pending", // other status can be delivered, received.
      };
      dispatch(createOrderAsync(order));
      // need to redirect from here to a new page of order success.
    } else {
      // TODO : we can use proper messaging popup here
      alert("Enter Address and Payment method");
    }
    //TODO : Redirect to order-success page
    //TODO : clear cart after order
    //TODO : on server change the stock number of items
  };

  return (
    <>
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <Container>
        <div className="form">
          <AddressForm address={''} />
          <div className="saved-addresses">
            <fieldset>
              <legend className="">Choose from saved addresses</legend>
              {user.addresses.map((address, index) => (
                <label
                htmlFor={index}
                  key={index}
                  className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                >
                  <div className="flex gap-x-4">
                    <input
                      id={index}
                      onChange={handleAddress}
                      name="address"
                      type="radio"
                      value={index}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.pinCode}
                      </p>
                    </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {address.phoneNumber}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                  </div>
                </label>
              ))}
            </fieldset>
          </div>
          <div className="payment-methods">
            <fieldset>
              <legend className="">Payment Methods</legend>
              <p className="">Choose One</p>
              <div className="">
                <div className="">
                  <input
                    id="cash"
                    name="payments"
                    onChange={handlePayment}
                    value="cash"
                    type="radio"
                    checked={paymentMethod === "cash"}
                    className=""
                  />
                  <label htmlFor="cash" className="">
                    Cash
                  </label>
                </div>
                <div className="">
                  <input
                    id="card"
                    onChange={handlePayment}
                    name="payments"
                    checked={paymentMethod === "card"}
                    value="card"
                    type="radio"
                    className=""
                  />
                  <label htmlFor="card" className="">
                    Card Payment
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="cart">
          <>
            <CartContainer>
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
                          to={`/shop/${cartItem.shopId}/cartItem/${cartItem.id}`}
                          className="image"
                        >
                          <img src={cartItem.productImage} alt="productLogo" />
                        </Link>
                        <div className="productDetailsRight">
                          {/* <div className="icons">
                            <div className="veg">
                              <GoDotFill size={20} />
                            </div>
                            <div className="fav">
                              <FaRegHeart size={30} />
                            </div>
                          </div> */}
                          <div className="productName">{cartItem.name}</div>
                          <div className="rating">
                            {cartItem.productRating}(
                            {cartItem.productRatingCount})
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
                              <span className="addQuantity">
                                {cartItem.quantity}
                              </span>
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
              {cartItems && (
                <div className="subtotal-div">
                  <div>
                    <p>Subtotal after discount</p>
                    <p className="btn">{totalAmount}</p>
                    {/* <Link to='/checkout' ><div className="btn">Buy Now ({totalItems} Items)</div></Link> */}
                    <div
                      className="btn"
                      onClick={(e) => {
                        handleOrder(e);
                      }}
                    >
                      Checkout Now
                    </div>
                    <Link to="/">
                      <div className="btn">Continue Shopping...</div>
                    </Link>
                  </div>
                </div>
              )}
            </CartContainer>
          </>
        </div>
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 60px;
  .form {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  .cart {
    width: 50%;
  }
`;
const CartContainer = styled.div`
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
export default Checkout;

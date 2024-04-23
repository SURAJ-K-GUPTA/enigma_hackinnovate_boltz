import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  // fetchLoggedInUserAsync,
  fetchLoggedInUserOrderAsync,
  // selectUserInfo,
  // selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
// import { discountedPrice } from "../../../app/constants";
import { selectLoggedInUser } from "../../auth/authSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
// import { Grid } from 'react-loader-spinner';

export default function UserOrders() {
  const dispatch = useDispatch();
  // const userInfo = useSelector(selectUserInfo);
  const userOrders = useSelector(selectUserOrders);
  // const status = useSelector(selectUserInfoStatus);
  const loggedInUser = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(loggedInUser.id));
  },[]);

  return (
    <Container>
      {userOrders &&
        userOrders
          .slice()
          .reverse()
          .map((order, index) => (
            <div key={index} className="order">
              <div className="order-info">
                <div className="order-id">
                  <div className="order-id-number">Order ID: {order.id}</div>
                  <div className="order-buttons">
                    <div className="invoice btn-invoice">Invoice</div>
                    <div className="track-order btn-order">Track Order</div>
                  </div>
                </div>
                <div className="order-date">
                  <div>
                    Order date: <span>{order.date}</span>
                  </div>
                  <div className="estimated-delivery">
                    Estimated Delivery: {order.estimatedDeliveryDate}
                  </div>
                </div>
                <div className="order-status">
                  <div className="order-status-items">
                    <div className="status-progress">Order Confirmed</div>
                    <div className="status-indicator"></div>
                    <div className="status-date">Date{order.date}</div>
                    <div className="status-bar"></div>
                  </div>
                  <div className="order-status-items">
                    <div className="status-progress">Shipped</div>
                    <div className="status-indicator"></div>
                    <div className="status-date">Date{order.date}</div>
                    <div className="status-bar"></div>
                  </div>
                  <div className="order-status-items">
                    <div className="status-progress">Out For Delivery</div>
                    <div className="status-indicator"></div>
                    <div className="status-date">Date{order.date}</div>
                    <div className="status-bar"></div>
                  </div>
                  <div className="order-status-items">
                    <div className="status-progress">Delivered</div>
                    <div className="status-indicator"></div>
                    <div className="status-date">Date{order.date}</div>
                    <div className="status-bar"></div>
                  </div>
                </div>
                <div className="cancel-button">
                  <div className="btn-order">Cancel Order</div>
                </div>
              </div>
              <div className="order-items">
                <div className="items-container">
                  {order.cartItems &&
                    order.cartItems.map((cartItem, index) => (
                      <div key={cartItem.id} className="card">
                        <div>
                          {/* <div className="name">{cartItem.name}</div> */}
                          <div className="productDetails">
                            <Link
                              to={`/shop/${cartItem.shopId}/product/${cartItem.id}`}
                              className="image"
                            >
                              <img
                                src={cartItem.productImage}
                                alt="productLogo"
                              />
                            </Link>
                            <div className="productDetailsRight">
                              <div className="icons">
                                <div className="veg">
                                  <GoDotFill size={20} />
                                </div>
                              </div>
                              <div className="productName">{cartItem.name}</div>
                              <div className="rating">
                                {cartItem.productRating}(
                                {cartItem.productRatingCount})
                              </div>
                              <div className="order-item-details">
                                <div className="price">{cartItem.price}</div>
                                <div className="quantity">
                                  Quantity : {cartItem.quantity}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="order-details">
                <div className="order-payment">
                  <span>Payment Details</span>
                  <div>
                    <span className="payment-details">₹ {order.totalAmount}</span><br />
                    <span className="payment-details">{order.paymentMethod}</span><br />
                  </div>
                </div>
                <div className="order-delivery">
                  <span>Delivery Address</span>
                  <div>
                  <span className="delivery-address">{order.selectedAddress.name}</span>
                  <span className="delivery-address">{order.selectedAddress.phoneNumber}</span>
                  <span className="delivery-address">{order.selectedAddress.email}</span><br />
                  <span className="delivery-address">{order.selectedAddress.street}</span>
                  <span className="delivery-address">{order.selectedAddress.addressLine2}</span>
                  <span className="delivery-address">{order.selectedAddress.city}</span>
                  <span className="delivery-address">{order.selectedAddress.state}</span>
                  <span className="delivery-address">{order.selectedAddress.country}</span>
                  <span className="delivery-address">{order.selectedAddress.pinCode}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      {/* {status === 'loading' ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null} */}
    </Container>
  );
}

const Container = styled.div`
  .order {
    display: flex;
    flex-direction: column;
    margin: 30px;
    padding: 30px;
    .order-info {
      width: 100%;
      margin: 10px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .order-id {
        width: 100%;
        margin: 15px 0;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .order-id-number {
          width: 50%;
          font-size: large;
          color: #344054;
        }
        .order-buttons {
          width: 50%;
          display: flex;
          flex-direction: row;
        }
      }
      .order-date {
        width: 100%;
        margin: 15px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        div {
          width: 50%;
          color: #667085;
          span {
            color: #1d2939;
          }
        }
        .estimated-delivery {
          width: 50%;
          color: #6933d3;
        }
      }
      .order-status {
        width: 100%;
        margin: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .order-status-items {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .status-progress {
            font-size: large;
          }
          .status-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 10px;
            border-radius: 10px;
            background-color: #6933d3;
          }
          .status-bar {
            width: 100%;
            height: 10px;
            margin: 30px 0;
            background-color: #d0d5dd;
            color: gray;
          }
        }
      }
      .cancel-button {
        width: 100%;
        margin: 15px 0 30px 0;
        display: flex;
        align-items: flex-start;
      }
    }
  }
  .btn-invoice {
    cursor: pointer;
    user-select: none;
    background-color: #ffffff;
    color: #667085;
    padding: 6px;
    margin: 3px;
    margin-right: 10px;
    border-radius: 10px;
    text-align: center;
    outline: 1px solid #d0d5dd;
  }

  .btn-order {
    cursor: pointer;
    user-select: none;
    background-color: #000000;
    color: #ffffff;
    padding: 6px;
    margin: 3px;
    border-radius: 10px;
    text-align: center;
  }

  .items-container {
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
    .btn-danger {
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
        .order-item-details {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin: 10px;
        }
      }
    }
  }

  .order-details{
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: flex-start;
    .order-payment{
      width: 50%;
      font-size: large;
      .payment-details{
        padding: 3px;
        color: #667085;
      }
    }
    .order-delivery{
      width: 50%;
      font-size: large;
      .delivery-address{
        padding: 3px;
        font-size: small;
        color: #667085;
        word-wrap: break-word;
      }
    }
  }
`;

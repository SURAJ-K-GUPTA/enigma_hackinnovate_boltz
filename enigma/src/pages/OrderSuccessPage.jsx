import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/orderSlice";
import { useEffect } from "react";
import { selectLoggedInUser } from "../features/auth/authSlice";

function OrderSuccessPage() {
    const params = useParams() 
   const dispatch = useDispatch();
   const user = useSelector(selectLoggedInUser)
   
   useEffect(()=>{
    // reset cart
    dispatch(resetCartAsync(user.id))
    // reset currentOrder
    dispatch(resetOrder())
   },[dispatch, user.id])
   
  return (
    <Container>
        <Navbar>
        <main className="main">
      <div className="text-center">
        <p className="order-placed">Order Successfully Placed</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Order Number #{params?.id}
        </h1>
        <p className="">
          You can check your order in My Account {">"} <Link to='/orders' className="go-to-orders">My Orders</Link>
        </p>
        <div className="">
          <Link
            to="/"
            className="go-to-home"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
        </Navbar>
        <Footer />
    </Container>
  );
}

const Container = styled.div`

.main{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    .text-center{
        display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
        text-align: center;
    }
    .order-placed{
        color:#000000;
    }
    .go-to-orders,.go-to-home{
        cursor: pointer;
        text-decoration: underline;
        color: #000000;
    }
    .go-to-orders:hover,.go-to-home:hover{
        text-decoration: none;
    }
}
`
export default OrderSuccessPage;

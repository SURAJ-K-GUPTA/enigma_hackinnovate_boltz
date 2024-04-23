import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Protected from './features/auth/components/Protected';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ShopDetailsPage from './pages/ShopDetailsPage';
import PageNotFound from './pages/PageNotFound';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
// import { selectLoggedInUser } from './features/auth/authSlice';
// import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
// import { useDispatch, useSelector } from 'react-redux';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserProfilePage from './pages/UserProfilePage';
import UserOrdersPage from './pages/UserOrdersPage';
import Logout from './features/auth/components/Logout';
import WishlistPage from './pages/WishlistPage';
import FAQPage from './pages/FAQPage';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchWishlistItemsByUserIdAsync } from './features/wishlist/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import ShopkeeperLandingPage from './pages/ShopkeeperLandingPage';
import SellerRegisterPage from './pages/SellerRegisterPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home></Home>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage></LoginPage>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <SignupPage></SignupPage>
      </>
    ),
  },
  {
    path: "/shop/:shopId",
    element: (
      <>
        <ShopDetailsPage></ShopDetailsPage>
      </>
    ),
  },
  {
    path: "/shop/:shopId/product/:productId",
    element: (
      <>
        <ProductDetailsPage></ProductDetailsPage>
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <CartPage></CartPage>
      </>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <>
        <WishlistPage></WishlistPage>
      </>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/profile/",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/orders/",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/faq",
    element: <FAQPage></FAQPage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/shopkeeper",
    element: <ShopkeeperLandingPage></ShopkeeperLandingPage>,
  },
  {
    path: "/register-seller",
    element: <SellerRegisterPage></SellerRegisterPage>,
  },
  {
    path: "*",
    element: (
      <>
        <PageNotFound></PageNotFound>
      </>
    ),
  },
])

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(fetchWishlistItemsByUserIdAsync(user.id));
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

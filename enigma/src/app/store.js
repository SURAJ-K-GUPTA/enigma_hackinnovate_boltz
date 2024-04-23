import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import shopReducer from '../features/shop/shopSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import sellerAuthReducer from '../features/seller_auth/authSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    shop: shopReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    sellerAuth: sellerAuthReducer

  },
});

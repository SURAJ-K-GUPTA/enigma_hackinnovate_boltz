import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemsByUserId, resetCart, updateCart, fetchCart, deleteItemFromProductId } from './cartAPI';

const initialState = {
  quantity: 0,
  status: 'idle',
  items: [],
  cartLoaded: false
  
};

export const incrementAsync = createAsyncThunk(
  'cart/fetchCart',
  async (amount) => {
    const response = await fetchCart(amount);
    // The quantity we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// export const fetchItemsByUserIdAsync = createAsyncThunk(
//   'cart/fetchItemsByUserId',
//   async () => {
//     const response = await fetchItemsByUserId();
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromProductIdAsync = createAsyncThunk(
  'cart/deleteItemFromProductId',
  async ({userId,productId}) => {
    const response = await deleteItemFromProductId(userId,productId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.quantity += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.quantity += action.payload;
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(deleteItemFromProductIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromProductIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          item => item.productId === action.payload.productId && item.userId === action.payload.userId
        );
      
        if (index !== -1) {
          // Only splice if the item is found
          state.items.splice(index, 1);
        }
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;

export const selectCart = (state) => state.cart.quantity;

export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;

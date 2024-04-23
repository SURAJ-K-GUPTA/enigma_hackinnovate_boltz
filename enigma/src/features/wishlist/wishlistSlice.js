import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToWishlist, deleteWishlistItemFromWishlist, fetchWishlistItemsByUserId, resetWishlist, updateWishlist, fetchWishlist, deleteWishlistItemFromProductId } from './wishlistAPI';

const initialState = {
  quantity: 0,
  status: 'idle',
  items: [],
  wishlistLoaded: false
  
};

export const incrementAsync = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (amount) => {
    const response = await fetchWishlist(amount);
    // The quantity we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlist',
  async (item) => {
    const response = await addToWishlist(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchWishlistItemsByUserIdAsync = createAsyncThunk(
  'wishlist/fetchWishlistItemsByUserId',
  async (userId) => {
    const response = await fetchWishlistItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// export const fetchWishlistItemsByUserIdAsync = createAsyncThunk(
//   'wishlist/fetchWishlistItemsByUserId',
//   async () => {
//     const response = await fetchWishlistItemsByUserId();
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const updateWishlistAsync = createAsyncThunk(
  'wishlist/updateWishlist',
  async (update) => {
    const response = await updateWishlist(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteWishlistItemFromWishlistAsync = createAsyncThunk(
  'wishlist/deleteWishlistItemFromWishlist',
  async (itemId) => {
    const response = await deleteWishlistItemFromWishlist(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteWishlistItemFromProductIdAsync = createAsyncThunk(
  'wishlist/deleteWishlistItemFromProductId',
  async ({userId,productId}) => {
    const response = await deleteWishlistItemFromProductId(userId,productId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const resetWishlistAsync = createAsyncThunk(
  'wishlist/resetWishlist',
  async (userId) => {
    const response = await resetWishlist(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const wishlistSlice = createSlice({
  name: 'wishlist',
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
      .addCase(addToWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchWishlistItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlistItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.wishlistLoaded = true;
      })
      .addCase(fetchWishlistItemsByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.wishlistLoaded = true;
      })
      .addCase(updateWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteWishlistItemFromWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteWishlistItemFromWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(deleteWishlistItemFromProductIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteWishlistItemFromProductIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          item => item.productId === action.payload.productId && item.userId === action.payload.userId
        );
      
        if (index !== -1) {
          // Only splice if the item is found
          state.items.splice(index, 1);
        }
      })
      .addCase(resetWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetWishlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const { increment, decrement, incrementByAmount } = wishlistSlice.actions;

export const selectWishlist = (state) => state.wishlist.quantity;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistStatus = (state) => state.wishlist.status;
export const selectWishlistLoaded = (state) => state.wishlist.wishlistLoaded;

export default wishlistSlice.reducer;

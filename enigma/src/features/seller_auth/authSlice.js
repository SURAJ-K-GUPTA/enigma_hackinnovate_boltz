import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSeller, loginSeller, signOut, updateSeller } from './authAPI';

const initialState = {
  value: 0,
  status: 'idle',
  loggedInSeller:null,
  errors:null,
};

export const createSellerAsync = createAsyncThunk(
  'sellerAuth/createSeller',
  async (sellerData) => {
    const response = await createSeller(sellerData);
    return response.data;
  }
);

export const loginSellerAsync = createAsyncThunk(
  'sellerAuth/loginSeller',
  async (sellerData, { rejectWithValue }) => {
   try {
     const response = await loginSeller(sellerData);
     return response.data;
   } catch (error) {
    return rejectWithValue(error)
   }
  }
);

export const updateSellerAsync = createAsyncThunk(
  'seller/updateSeller',
  async (update) => {
    // this is name mistake
    const response = await updateSeller(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  "seller/signOut",
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'sellerAuth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSellerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSellerAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInSeller = action.payload;
      })
      .addCase(updateSellerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSellerAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInSeller = action.payload;
      })
      .addCase(loginSellerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginSellerAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInSeller = action.payload;
      })
      .addCase(loginSellerAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.errors = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInSeller = null;
      });
  },
});

export const { increment } = authSlice.actions;
export const selectLoggedInSeller = (state) => state.sellerAuth.loggedInSeller;
export const selectLoginError = (state) => state.sellerAuth.errors;

export default authSlice.reducer;

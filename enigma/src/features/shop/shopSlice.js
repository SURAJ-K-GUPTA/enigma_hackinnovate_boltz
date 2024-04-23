import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLocations, fetchShop, fetchShopById, fetchShopsByFilters } from './shopAPI';

const initialState = {
  status: 'idle',
  shops:[],
  locations:[],
  totalItems: 0,
  selectedShop:null,
  value: 0,
};

export const fetchShopByIdAsync = createAsyncThunk(
  'product/fetchShopById',
  async (id) => {
    const response = await fetchShopById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchShopsByFiltersAsync = createAsyncThunk(
  'product/fetchShopsByFilters',
  async ({filter, sort, pagination, admin}) => {
    const response = await fetchShopsByFilters(filter, sort, pagination, admin);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLocationsAsync = createAsyncThunk(
  'product/fetchLocations',
  async () => {
    const response = await fetchLocations();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShopsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.shops = action.payload.shops;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchLocationsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocationsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.locations = action.payload;
      })
      .addCase(fetchShopByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShopByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedShop = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = shopSlice.actions;

export const selectShops = (state) => state.shop.shops;
export const selectLocations = (state) => state.shop.locations;
export const selectShopById = (state) => state.shop.selectedShop;
export const selectTotalItems = (state) => state.shop.totalItems;


export default shopSlice.reducer;

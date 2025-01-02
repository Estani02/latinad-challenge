import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {FormatDate} from '@/types';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  campaignDuration?: FormatDate;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.campaignDuration?.[0] === action.payload.campaignDuration?.[0] &&
          item.campaignDuration?.[1] === action.payload.campaignDuration?.[1],
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeAllItems: (state) => {
      state.items = [];
    },
    updateItemQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {addItem, removeItem, updateItemQuantity, openCart, closeCart, removeAllItems} =
  cartSlice.actions;

export default cartSlice.reducer;

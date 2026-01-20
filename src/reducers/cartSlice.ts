import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: CartItem; quantity: number }>,
    ) => {
      const { product, quantity } = action.payload;
      const itemIndex = state.items.find((item) => item.id === product.id);

      if (itemIndex) {
        itemIndex.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<{ productId: number; change: number }>,
    ) => {
      const { productId, change } = action.payload;
      const item = state.items.find((item) => item.id === productId);

      if (!item) return;

      item.quantity += change;
      if (item.quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== productId);
      }
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
  },
});

export const { addToCart, updateCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;

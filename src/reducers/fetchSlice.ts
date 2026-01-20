import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import ky from "ky";

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductState {
  items: ProductProps[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  ProductProps[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async function (_, { rejectWithValue }) {
  try {
    const response = await ky(
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json",
    ).json<ProductProps[]>();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductProps[]>) => {
          state.loading = false;
          state.items = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка загрузки товаров";
      });
  },
});

export default ProductsSlice.reducer;

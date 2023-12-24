import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
	products: [],
	favorite: [],
	cart: [],
	cartcount: 0,
};

const productSlice = createSlice({
	name: "products",
	initialState: INITIAL_STATE,
	reducers: {
		getProducts: (state, action) => {
			state.products = action.payload;
		},
		setFavorites: (state, action) => {
			state.favorite = action.payload;
		},
		setCartItems: (state, action) => {
			state.cart = action.payload;
		},
		setCartCount: (state, action) => {
			state.cartcount = action.payload;
		},
	},
});

export const {getProducts, setFavorites, setCartItems, setCartCount} =
	productSlice.actions;
export default productSlice.reducer;

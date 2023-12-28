import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
	products: [],
	favorite: [],
	cart: [],
	order: [],
	cartcount: 0,
	filterProducts: [],
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
		setOrder: (state, action) => {
			state.order = action.payload;
		},
		setCartItems: (state, action) => {
			state.cart = action.payload;
		},
		setCartCount: (state, action) => {
			state.cartcount = action.payload;
		},
		setFilterProducts: (state, action) => {
			state.filterProducts = action.payload;
		},
	},
});

export const {
	getProducts,
	setFavorites,
	setOrder,
	setCartItems,
	setCartCount,
	setFilterProducts,
} = productSlice.actions;
export default productSlice.reducer;

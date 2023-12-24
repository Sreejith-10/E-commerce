import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
	userAddress: {
		fname: "",
		lname: "",
		phone: "",
		address: "",
		pincode: "",
		landmark: "",
		city: "",
		hNo: "",
	},
	paymentMethod: "COD",
	cart: [],
};

const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {
		setAddress: (state, action) => {
			state.userAddress = action.payload;
		},
		setPayment: (state, action) => {
			state.paymentMethod = action.payload;
		},
		updateCart: (state, action) => {
			state.cart = action.payload;
		},
	},
});

export const {setAddress, setPayment, updateCart} = userSlice.actions;
export default userSlice.reducer;

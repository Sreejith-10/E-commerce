import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
	currentUser: {},
	isLogged: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState: INITIAL_STATE,
	reducers: {
		updateAddress: () => {},
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
			state.isLogged = state.currentUser ? true : false;
		},
	},
});

export const {updateAddress, setCurrentUser} = authSlice.actions;

export default authSlice.reducer;

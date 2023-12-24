import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
	users: [],
};

const adminSlice = createSlice({
	name: "admin",
	initialState: INITIAL_STATE,
	reducers: {
		setUsers: (state, action) => {
			state.users = action.payload;
		},
	},
});

export const {setUsers} = adminSlice.actions;

export default adminSlice.reducer;

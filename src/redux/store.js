import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import productReducer from "../redux/productSlice";
import userReducer from "../redux/userSlice";
import adminReducer from "../redux/adminSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		user: userReducer,
		admin: adminReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

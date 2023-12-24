import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../admin/admin-pages/Home";
import Users from "../admin/admin-pages/Users";
import Products from "../admin/admin-pages/Products";
import UserOrders from "../admin/admin-pages/UserOrders";

const DashBoardRoute = ({setNav}) => {
	return (
		<Routes>
			<Route index element={<Home setNav={setNav} />} />
			<Route exact path="/users" element={<Users setNav={setNav} />} />
			<Route path="/orders" element={<UserOrders setNav={setNav} />} />
			<Route path="/products" element={<Products setNav={setNav} />} />
		</Routes>
	);
};

export default DashBoardRoute;

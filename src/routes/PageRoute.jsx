import React from "react";
import {Routes, Route} from "react-router-dom";
import Client from "../client/Client";
import Login from "../client/pages/Login";
import SignUp from "../client/pages/SignUp";
import Admin from "../admin/Admin";
import AdminLogin from "../admin/admin-pages/AdminLogin";

const PageRoute = () => {
	return (
		<Routes>
			<Route path="/*" element={<Client />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/admin/*" element={<Admin />} />
			<Route path="/admin-login" element={<AdminLogin />} />
		</Routes>
	);
};

export default PageRoute;

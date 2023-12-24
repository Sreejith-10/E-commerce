import React from "react";
import {Route, Routes} from "react-router-dom";
import Content from "../client/pages/Content";
import AllProduct from "../client/components/AllProduct";
import Orders from "../client/pages/Orders";
import Cart from "../client/pages/Cart";
import Notification from "../client/pages/Notification";
import ProductInfo from "../client/pages/ProductInfo";
import CheckOut from "../client/components/CheckOut";
import Account from "../client/pages/Account";
import Favorites from "../client/pages/Favorites";

const ClientRoute = ({showNav, closeNav, nav, setNav}) => {
	return (
		<Routes>
			<Route
				index
				exact
				element={
					<Content
						showNav={showNav}
						closeNav={closeNav}
						nav={nav}
						setNav={setNav}
					/>
				}
			/>
			<Route path="/all-products" exact element={<AllProduct />} />
			<Route path="/orders" exact element={<Orders />} />
			<Route path="/cart" exact element={<Cart />} />
			<Route path="/notification" exact element={<Notification />} />
			<Route path="/product-info" exact element={<ProductInfo />} />
			<Route path="/checkout" exact element={<CheckOut />} />
			<Route path="/favorites" exact element={<Favorites />} />
			<Route path="/account" exact element={<Account />} />
		</Routes>
	);
};

export default ClientRoute;

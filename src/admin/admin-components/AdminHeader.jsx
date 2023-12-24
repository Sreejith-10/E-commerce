import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import {useLocation} from "react-router-dom";
import SearchBar from "./SearchBar";

const AdminHeader = ({setNav}) => {
	const location = useLocation();
	const [loc, setLoc] = useState("");
	useEffect(() => {
		if (location.pathname === "/admin") {
			setLoc("Home");
		} else if (location.pathname === "/admin/users") {
			setLoc("Users");
		} else if (location.pathname === "/admin/orders") {
			setLoc("Orders");
		} else if (location.pathname === "/admin/products") {
			setLoc("Products");
		}
	}, [location.pathname]);
	return (
		<>
			<div className="w-full h-full flex items-center justify-between md:flex-col md:justify-start bg-blue-50">
				<div className="w-[250px] h-[50px]  ml-4 md:mb-4">
					<h1 className="text-blue-500 text-lg md:mt-2">Dashboard/{loc}</h1>
					<h1 className="text-blue-500 text-3xl font-bold">DashBoard</h1>
				</div>
				<div className="md:w-full md:h-auto md:flex md:items-center md:justify-evenly">
					<div className="hidden md:block md:mt-5 md:ml-3 md:mr-3">
						<AiOutlineMenu
							className="w-10 h-10 fill-blue-500"
							onClick={() => setNav(true)}
						/>
					</div>
					<SearchBar />
				</div>
			</div>
		</>
	);
};

export default AdminHeader;

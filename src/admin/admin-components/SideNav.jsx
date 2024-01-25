import React from "react";
import {Link} from "react-router-dom";
import {
	AiFillHome,
	AiFillPhone,
	AiFillSetting,
	AiFillShopping,
	AiOutlineClose,
} from "react-icons/ai";
import {BsFillPersonFill} from "react-icons/bs";

const SideNav = ({nav, setNav}) => {
	return (
		<>
			{nav && (
				<div className="w-[80%] h-full fixed top-0 left-0 transition-all ease-in-out duration-200 z-[99]">
					<div className="w-[100%] h-[100%] z-50 absolute bg-blue-500 ">
						<div className="w-auto h-[100px] border-b text-center text-4xl font-bold text-white flex items-center justify-evenly">
							<h1>Admin</h1>
							<AiOutlineClose className="ml-5" onClick={() => setNav(false)} />
						</div>
						<nav className="w-full h-screen flex items-center justify-start flex-col mt-6">
							<div className="w-[200px] h-[50px] flex items-center justify-start">
								<AiFillHome className="w-[40px] h-[30px] mr-6 fill-white" />
								<Link
									to={"/admin"}
									onClick={() => setNav(fasle)}
									className="font-bold text-white text-2xl">
									Home
								</Link>
							</div>
							<div className="w-[200px] h-[50px] flex items-center justify-start">
								<BsFillPersonFill className="w-[40px] h-[30px] mr-6 fill-white" />
								<Link
									to={"/admin/users"}
									onClick={() => setNav(fasle)}
									className="font-bold text-white text-2xl">
									Users
								</Link>
							</div>
							<div className="w-[200px] h-[50px] flex items-center justify-start">
								<AiFillPhone className="w-[40px] h-[30px] mr-6 fill-white" />
								<Link
									to={"/admin/products"}
									onClick={() => setNav(fasle)}
									className="font-bold text-white text-2xl">
									Products
								</Link>
							</div>
							<div className="w-[200px] h-[50px] flex items-center justify-start">
								<AiFillShopping className="w-[40px] h-[30px] mr-6 fill-white" />
								<Link
									to={"/admin/orders"}
									onClick={() => setNav(fasle)}
									className="font-bold text-white text-2xl">
									Orders
								</Link>
							</div>
							<div className="w-[200px] h-[50px] flex items-center justify-start">
								<AiFillSetting className="w-[40px] h-[30px] mr-6 fill-white" />
								<Link className="font-bold text-white text-2xl">Settings</Link>
							</div>
						</nav>
					</div>
				</div>
			)}
			<div className="bg-blue-500 h-full md:hidden">
				<div className="w-full h-[100px] border-b text-center text-5xl font-bold text-white flex items-center justify-center">
					<h1>Admin</h1>
				</div>
				<nav className="w-full h-auto flex items-center justify-start flex-col mt-6">
					<div className="w-[200px] h-[50px] flex items-center justify-start">
						<AiFillHome className="w-[40px] h-[30px] mr-6 fill-white" />
						<Link to={"/admin"} className="font-bold text-white text-2xl">
							Home
						</Link>
					</div>
					<div className="w-[200px] h-[50px] flex items-center justify-start">
						<BsFillPersonFill className="w-[40px] h-[30px] mr-6 fill-white" />
						<Link to={"/admin/users"} className="font-bold text-white text-2xl">
							Users
						</Link>
					</div>
					<div className="w-[200px] h-[50px] flex items-center justify-start">
						<AiFillPhone className="w-[40px] h-[30px] mr-6 fill-white" />
						<Link
							to={"/admin/products"}
							className="font-bold text-white text-2xl">
							Products
						</Link>
					</div>
					<div className="w-[200px] h-[50px] flex items-center justify-start">
						<AiFillShopping className="w-[40px] h-[30px] mr-6 fill-white" />
						<Link
							to={"/admin/orders"}
							className="font-bold text-white text-2xl">
							Orders
						</Link>
					</div>
					<div className="w-[200px] h-[50px] flex items-center justify-start">
						<AiFillSetting className="w-[40px] h-[30px] mr-6 fill-white" />
						<Link className="font-bold text-white text-2xl">Settings</Link>
					</div>
				</nav>
			</div>
		</>
	);
};

export default SideNav;

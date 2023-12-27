import React, {useEffect, useState} from "react";
import {
	AiOutlineShoppingCart,
	AiOutlineBell,
	AiOutlineClose,
	AiFillShop,
	AiFillHeart,
} from "react-icons/ai";
import {FaBars} from "react-icons/fa";
import ProfileNav from "./ProfileNav";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {setCartCount, setFavorites} from "../../redux/productSlice";

const Header = ({showNav, nav, closeNav}) => {
	const {currentUser} = useSelector((state) => state.auth);
	const {isLogged} = useSelector((state) => state.auth);
	const {cartcount} = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const [profileNav, setProfileNav] = useState(false);
	const navigate = useNavigate();
	const [favCount, setFavCount] = useState();
	const [notCount, setNotCount] = useState();
	const getCount = () => {
		try {
			onSnapshot(doc(db, "cart", currentUser.uid), (doc) => {
				doc && dispatch(setCartCount(doc.data()?.cart?.length));
			});
		} catch (err) {
			console.log(err);
		}
	};

	const getFav = () => {
		try {
			onSnapshot(doc(db, "favorites", currentUser.uid), (doc) => {
				doc && dispatch(setFavorites(doc?.data().fav));
				setFavCount(doc?.data().fav);
			});
		} catch (err) {
			console.log(err);
		}
	};
	const getNotify = () => {
		try {
			onSnapshot(doc(db, "notificatons", currentUser.uid), (doc) => {
				doc && setNotCount(doc?.data()?.notification);
			});
		} catch (err) {
			console.log(err);
		}
	};
	const updateState = () => {
		setCartCount(0);
		setFavCount(0);
		setNotCount(0);
		dispatch(setFavorites(""));
	};
	useEffect(() => {
		getCount();
		getFav();
		getNotify();
		!currentUser && updateState();
	}, [currentUser, isLogged]);
	console.log(cartcount);
	const navigateHandler = (p) => {
		if (p === "cart") {
			navigate("/cart");
		} else if (p === "notification") {
			navigate("/notification");
		} else if (p === "favorites") {
			isLogged ? navigate("/favorites") : navigate("/login");
		}
	};
	return (
		<>
			<nav className="w-full h-[70px] bg-blue-500">
				<div className="lg:h-full lg:w-full sm:h-[100%] sm:w-full flex items-center justify-between">
					<div className="w-[300px] ml-5 ">
						<div className="flex items-center lg:justify-between sm:justify-normal">
							<div className="w-[40px] h-[40px] lg:hidden sm:mr-2 border-[2px] rounded-md sm:flex sm:items-center sm:justify-center">
								{!nav ? (
									<FaBars
										className="h-[30px] w-[30px] fill-white"
										onClick={showNav}
									/>
								) : (
									<AiOutlineClose
										className="h-[30px] w-[30px] fill-white"
										onClick={closeNav}
									/>
								)}
							</div>
							<div className="lg:w-[75px] lg:h-[45px] md:hidden flex items-center justify-center">
								<Link to={"/"}>
									<AiFillShop className="w-[40px] h-[40px] fill-white" />
								</Link>
							</div>
							<NavLink
								to={"/"}
								className="text-xl text-gray-100 font-semibold p-1 m-5 rounded-md hover:bg-white hover:text-blue-500 md:hidden sm:hidden active:bg-white active:text-blue-500">
								Home
							</NavLink>
							<NavLink
								to={"/all-products"}
								className="text-xl text-gray-100 font-semibold p-1 m-5 rounded-md hover:bg-white hover:text-blue-500 md:hidden sm:hidden active:bg-white active:text-blue-500">
								Products
							</NavLink>
							<NavLink
								to={"/orders"}
								className="text-xl text-gray-100 font-semibold p-1 m-5 rounded-md hover:bg-white hover:text-blue-500 md:hidden sm:hidden active:bg-white active:text-blue-500">
								Orders
							</NavLink>
						</div>
					</div>
					<div className="mr-5 w-[300px] flex items-center justify-between">
						<div
							className="w-[60px] h-[60px] cursor-pointer flex"
							onClick={() => navigateHandler("cart")}>
							<AiOutlineShoppingCart className="w-[40px] h-full fill-white" />
							{cartcount > 0 && (
								<span className="w-[20px] h-[20px] bg-white flex items-center justify-center rounded-full font-bold text-blue-500">
									{cartcount}
								</span>
							)}
						</div>
						<div
							className="w-[60px] h-[60px] cursor-pointer flex"
							onClick={() => navigateHandler("notification")}>
							<AiOutlineBell className="w-[40px] h-full hover:animate-bellRing fill-white" />
							{notCount?.length > 0 && (
								<span className="w-[20px] h-[20px] bg-white flex items-center justify-center rounded-full font-bold text-blue-500">
									{notCount && notCount.length}
								</span>
							)}
						</div>
						<div
							className="w-[60px] h-[60px] cursor-pointer flex"
							onClick={() => navigateHandler("favorites")}>
							<AiFillHeart className="w-[40px] h-full hover:animate-pulse fill-white" />

							{favCount?.length > 0 && (
								<span className="w-[20px] h-[20px] bg-white flex items-center justify-center rounded-full font-bold text-blue-500">
									{favCount?.length}
								</span>
							)}
						</div>
						<div
							className="w-[50px] h-[50px] rounded-[50%] bg-white text-center cursor-pointer"
							onClick={() => setProfileNav(!profileNav)}>
							<img
								src={
									currentUser?.photoURL
										? currentUser?.photoURL
										: "/images/Default_pfp.svg.png"
								}
								alt=""
								className="w-full h-full rounded-[50%]"
							/>
						</div>
					</div>
				</div>
				{nav && (
					<div className="lg:hidden animate-fadeIn w-auto h-[200px] bg-blue-500 sm:flex sm:flex-col sm:items-start sm:z-50 relative transition-opacity ease-in-out duration-1000">
						<Link
							onClick={closeNav}
							to={"/"}
							className="ml-4 mt-5 text-lg text-white font-semibold p-1 rounded-md border-[2px] hover:bg-white hover:text-blue-500 ">
							Home
						</Link>
						<Link
							onClick={closeNav}
							to={"/all-products"}
							className="ml-4 mt-5 text-lg text-white font-semibold p-1 rounded-md border-[2px] hover:bg-white hover:text-blue-500 ">
							Products
						</Link>
						<Link
							onClick={closeNav}
							to={"/orders"}
							className="ml-4 mt-5 text-lg text-white font-semibold p-1 rounded-md border-[2px] hover:bg-white hover:text-blue-500 ">
							Orders
						</Link>
					</div>
				)}
			</nav>
			{profileNav && (
				<ProfileNav profileNav={profileNav} setProfileNav={setProfileNav} />
			)}
		</>
	);
};

export default Header;

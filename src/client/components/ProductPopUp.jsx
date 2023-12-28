import {AiFillStar, AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import Notify from "./Notify";
import {useNotify} from "../../hooks/useNotify";
import {addToCart} from "../../utils/addToCart";
import {BsHeart, BsHeartFill} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorite, removeFromFavorite} from "../../utils/favoriteHandler";
import {useEffect} from "react";
import {setCartCount, setCartItems} from "../../redux/productSlice";

const ProductPopUp = ({currentProduct, setProPreview}) => {
	const dispatch = useDispatch();
	const {isLogged} = useSelector((state) => state.auth);
	const {currentUser} = useSelector((state) => state.auth);
	const {cart} = useSelector((state) => state.product);
	const {favorite} = useSelector((state) => state.product);
	const [showAlert, setShowAlert] = useNotify();
	const navigate = useNavigate();
	const showDetails = () => {
		navigate("/product-info", {state: {currentProduct}});
	};
	const isFound = cart?.some(
		(item) => item.cartItems?.proId === currentProduct.proId
	);
	const addItemsToCart = (currentProduct, currentUser, isLogged) => {
		if (!isLogged) {
			let data = {
				cartItems: currentProduct,
				count: 1,
				total: currentProduct.price,
			};
			let oldEntries = JSON.parse(localStorage.getItem("cart"));
			if (oldEntries === null) oldEntries = [];
			localStorage.setItem("cart", JSON.stringify(data));
			oldEntries.push(data);
			localStorage.setItem("cart", JSON.stringify(oldEntries));
			let count = JSON.parse(localStorage.getItem("cart"));
			let counted = count?.length;
			dispatch(setCartCount(counted));
			dispatch(setCartItems(oldEntries));
		} else {
			addToCart(currentProduct, currentUser, isLogged);
		}
	};
	const favItem = favorite?.some(
		(item) => item.pro.proId === currentProduct.proId
	);
	const addFav = () => {
		isLogged
			? addToFavorite(currentProduct, currentUser.uid)
			: navigate("/login");
	};
	const removeFav = () => {
		isLogged
			? removeFromFavorite(currentProduct, currentUser.uid)
			: navigate("/login");
	};
	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "scroll";
		};
	}, []);
	return (
		<>
			<div className="w-screen h-screen fixed inset-0 z-50 bg-black-rgba overflow-hidden">
				<div className="w-full h-[10%] absolute z-50 flex flex-row items-center justify-end">
					{showAlert && <Notify setShowAlert={setShowAlert} />}
				</div>
				<div className="w-full h-full flex items-center justify-center">
					<div className="w-[50%] h-[50%] md:w-[95%] md:h-[80%] bg-white flex md:flex-col md:items-center p-2 rounded-md shadow-md transition-all duration-1000 ease-linear">
						<AiOutlineClose
							size={70}
							className=" lg:hidden md:block ml-[90%] transition-all ease-in-out duration-700 hover:fill-red-500"
							onClick={() => setProPreview(false)}
						/>
						<div className="w-[40%] h-auto md:w-[60%]">
							<img
								src={currentProduct?.photoURL}
								alt=""
								className="w-auto h-auto max-h-[400px]"
							/>
						</div>
						<div className="w-[60%] h-full md:w-[100%] ml-4 md:mt-2">
							<div className="w-full h-[10%] flex items-center justify-between">
								<h1 className="text-4xl font-medium">
									{currentProduct?.proName}
								</h1>
								<AiOutlineClose
									className="mr-3 w-8 h-8 md:hidden transition-all ease-in-out duration-700 hover:fill-red-500 hover:border hover:border-red-500 rounded-md"
									onClick={() => setProPreview(false)}
								/>
							</div>
							<div className="w-full h-[10%]  font-medium text-md flex items-center justify-between">
								<s>Rs {currentProduct?.price} /-</s>
							</div>
							<div className="w-full h-[10%]  font-medium text-xl flex items-center justify-between">
								Rs {currentProduct?.offer} /-
							</div>
							<div className="w-full h-[10%] flex items-center text-2xl">
								3.9 <AiFillStar className="fill-yellow-300 ml-2" />
								<AiFillStar className="fill-yellow-300" />
								<AiFillStar className="fill-yellow-300" />
								<AiFillStar className="fill-yellow-300" />
								<AiFillStar className="fill-yellow-300" />
								<AiFillStar className="fill-yellow-300" />
							</div>
							<div className="w-full h-[30%] flex items-center justify-between">
								<div className="flex">
									<h1 className="font-medium text-lg">Stocks left</h1>
									<div className="bg-red-500 font-bold px-3 rounded-md ml-2 text-white grid place-content-center">
										{currentProduct.qty}
									</div>
								</div>
								<div className="p-6">
									{favItem ? (
										<BsHeartFill
											onClick={removeFav}
											size={35}
											className="fill-blue-500"
										/>
									) : (
										<BsHeart
											onClick={addFav}
											size={35}
											className="fill-blue-500"
										/>
									)}
								</div>
							</div>
							{currentProduct.qty != 0 ? (
								!isFound ? (
									<div
										className="w-full h-[10%]"
										onClick={() =>
											addItemsToCart(currentProduct, currentUser, isLogged)
										}>
										<button className="w-[95%] h-full bg-green-500 rounded-md font-bold text-white text-lg shadow-sm transition-all ease-in duration-500 hover:shadow-md hover:bg-green-600">
											Add to cart
										</button>
									</div>
								) : (
									<div
										className="w-full h-[10%]"
										onClick={() => navigate("/cart")}>
										<button className="w-[95%] h-full bg-green-500 rounded-md font-bold text-white text-lg shadow-sm transition-all ease-in duration-500 hover:shadow-md hover:bg-green-600">
											Go to cart
										</button>
									</div>
								)
							) : (
								<div className="w-full h-[10%]">
									<button className="w-[95%] h-full bg-green-700 rounded-md font-bold text-white text-lg shadow-sm transition-all ease-in duration-500 hover:shadow-md hover:bg-green-600">
										Out of stock
									</button>
								</div>
							)}
							<div className="w-full h-[20%]">
								<button
									onClick={showDetails}
									className="w-[95%] h-full flex items-center justify-center hover:text-purple-500 font-medium text-lg transition-all duration-700">
									View full details
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductPopUp;

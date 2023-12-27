import React, {useEffect, useState} from "react";
import {
	AiFillDislike,
	AiFillLike,
	AiFillStar,
	AiOutlineDislike,
	AiOutlineLike,
	AiOutlineStar,
} from "react-icons/ai";
import {BsHeart, BsHeartFill, BsStarFill} from "react-icons/bs";
import {useLocation, useNavigate} from "react-router-dom";
import RatingForms from "../components/RatingForms";
import {addToFavorite, removeFromFavorite} from "../../utils/favoriteHandler";
import {useSelector} from "react-redux";
import {
	arrayUnion,
	doc,
	getDoc,
	onSnapshot,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import {db} from "../../firebase";
import {addToCart} from "../../utils/addToCart";
import {useNotify} from "../../hooks/useNotify";
import Notify from "../components/Notify";

const ProductInfo = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {currentUser} = useSelector((state) => state.auth);
	const {isLogged} = useSelector((state) => state.auth);
	const {users} = useSelector((state) => state.admin);
	const {favorite} = useSelector((state) => state.product);
	const {cart} = useSelector((state) => state.product);
	const [product, setProduct] = useState(location.state?.currentProduct);
	const [ratingsForms, setRatingsForm] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [showAlert, setShowAlert] = useNotify();

	const favItem = favorite?.some((item) => item?.pro.proId === product?.proId);
	const isFound = cart.some((item) => item.cartItems?.proId === product.proId);

	useEffect(() => {
		const unSub = onSnapshot(doc(db, "reviews", product.proId), (doc) => {
			setReviews(doc?.data()?.review);
		});
		return () => {
			unSub();
		};
	}, [currentUser.uid]);
	const instantBuy = async () => {
		await setDoc(doc(db, "instantBuy", currentUser.uid), {
			buy: product,
		});
		navigate("/checkout", {state: {product, method: "instantBuy"}});
	};
	const notifyUser = async (pro, user) => {
		await setDoc(doc(db, "notifyUser", pro.proId), {
			user: arrayUnion(user.uid),
		});
		setShowAlert(true);
	};
	return (
		<>
			{showAlert && (
				<Notify setShowAlert={setShowAlert} value={"Notify you if available"} />
			)}
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-[80%] h-full md:w-[90%] mt-6">
					<div className="w-full h-full flex md:flex-col">
						<div className="w-1/2 md:w-full h-full md:">
							<div className="w-full h-[50%] flex items-center justify-center flex-col">
								<div className="w-[50%] md:w-[90%] h-[600px] md:h-[400px] md:relative flex items-center justify-center">
									{favItem ? (
										<BsHeartFill
											onClick={() =>
												removeFromFavorite(product, currentUser.uid)
											}
											size={35}
											className="fill-blue-500"
										/>
									) : (
										<BsHeart
											onClick={() => addToFavorite(product, currentUser.uid)}
											size={35}
											className="fill-blue-500"
										/>
									)}
									<img
										src={product?.photoURL}
										alt=""
										className="w-auto h-auto"
									/>
								</div>
							</div>
						</div>
						<div className="w-1/2 h-full md:w-full">
							<div className="font-medium text-5xl p-5">{product?.proName}</div>
							<div className="font-medium text-lg ml-5">{product?.brand}</div>
							<div className="font-medium text-lg p-5">
								<s className="text-slate-700">Rs {product?.price} /-</s>
								<h1 className="font-medium text-2xl">Rs {product?.offer} /-</h1>
							</div>
							<div className="w-full h-[10%] p-5 flex items-center text-2xl">
								3.9 <AiFillStar className="fill-yellow-300 ml-2" />
								<AiFillStar className="fill-yellow-300" />
								<AiFillStar className="fill-yellow-300" />
								<AiFillStar className="fill-yellow-300" />
								<AiFillStar className="fill-yellow-300" />
								<AiOutlineStar className="fill-yellow-300" />
							</div>
							<div className="w-full h-[10%] p-5 flex items-center">
								<h1 className="font-medium text-lg">Stocks left</h1>
								<div className="bg-red-500 font-bold px-3 rounded-md ml-2 text-white grid place-content-center">
									{product.qty}
								</div>
							</div>
							<div className="font-medium p-5 text-slate-600 text-lg">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Molestiae inventore, reprehenderit quod dolore illum hic cum
								natus veritatis temporibus sapiente. Odit excepturi totam aut
								non quam molestias incidunt, sequi doloremque. Architecto
								asperiores sunt animi veritatis aspernatur libero voluptatibus,
								quo accusantium.
							</div>

							<div className="w-full h-auto p-5 flex items-center justify-start">
								{isFound ? (
									<button
										onClick={() => {
											navigate("/cart");
										}}
										className="w-1/2 h-14 md:h-12 bg-white border border-green-500 rounded-md font-bold text-green-500 text-lg shadow-sm ">
										Go to cart
									</button>
								) : product.qty === 0 ? null : (
									<button
										onClick={() => addToCart(product, currentUser, isLogged)}
										className="w-1/2 h-14 md:h-12 bg-white border border-green-500 rounded-md font-bold text-green-500 text-lg shadow-sm ">
										Add to cart
									</button>
								)}
								{product.qty === 0 ? (
									<button
										onClick={() => notifyUser(product, currentUser)}
										className="w-1/2 h-14 ml-3 md:h-12 bg-green-500 rounded-md font-bold text-white text-lg shadow-sm ">
										Notify me
									</button>
								) : (
									<button
										onClick={instantBuy}
										className="w-1/2 h-14 ml-3 md:h-12 bg-green-500 rounded-md font-bold text-white text-lg shadow-sm ">
										Buy now
									</button>
								)}
								{favItem ? (
									<BsHeartFill
										onClick={() => {
											isLogged
												? removeFromFavorite(product, currentUser.uid)
												: navigate("/login");
										}}
										size={40}
										className="ml-5 fill-blue-500"
									/>
								) : (
									<BsHeart
										onClick={() =>
											isLogged
												? addToFavorite(product, currentUser.uid)
												: navigate("/login")
										}
										size={40}
										className="ml-5 fill-blue-500"
									/>
								)}
							</div>
						</div>
					</div>
					<div className="w-full h-auto mb-6 border border-black rounded-md border-opacity-30 relative">
						{ratingsForms && (
							<div className=" w-full h-full flex items-start absolute left-[30%]">
								<RatingForms
									setRatingsForm={setRatingsForm}
									product={product}
								/>
							</div>
						)}
						<div className="w-full h-full rounded-sm">
							<div className="w-full h-auto flex items-center justify-between p-3 ">
								<h1 className="text-2xl font-medium">Ratings & Reviews</h1>
								<button
									onClick={() => {
										isLogged ? setRatingsForm(true) : navigate("/login");
									}}
									className="py-3 px-5 md:px-3 md:py-2 font-medium text-lg rounded-md shadow-sm shadow-black">
									Rate Product
								</button>
							</div>
							<div className="w-full h-auto flex">
								<div className="w-1/2 h-auto flex items-center justify-center flex-col">
									<h1 className="text-3xl font-medium">4.4</h1>
									<span className="font-medium text-2xl">
										{reviews?.length === 0 ? 0 : reviews?.length} Ratings
									</span>
								</div>
								<div className="w-1/2 h-auto flex flex-col">
									<div className="flex items-center justify-center">
										5
										<BsStarFill className="mr-5 fill-yellow-500" />
										<input type="range" className="w-1/2" value={90} />
									</div>
									<div className="flex items-center justify-center">
										4
										<BsStarFill className="mr-5 fill-yellow-500" />
										<input type="range" className="w-1/2" value={75} />
									</div>
									<div className="flex items-center justify-center">
										3
										<BsStarFill className="mr-5 fill-yellow-500" />
										<input type="range" className="w-1/2" value={50} />
									</div>
									<div className="flex items-center justify-center">
										2
										<BsStarFill className="mr-5 fill-yellow-500" />
										<input type="range" className="w-1/2" value={45} />
									</div>
									<div className="flex items-center justify-center">
										1
										<BsStarFill className="mr-5 fill-yellow-500" />
										<input type="range" className="w-1/2" value={30} />
									</div>
								</div>
							</div>
						</div>
						<div className="w-full h-auto mt-5 p-4 grid grid-cols-2 md:grid-cols-1">
							{reviews?.map((item, id) => {
								return (
									<div
										key={id}
										className="border  p-2 border-opacity-30 border-black">
										<div className="p-3 flex">
											{Array(5)
												.fill()
												.map((v, i) => {
													if (i + 1 <= item.star) {
														return (
															<AiFillStar
																size={25}
																className="fill-yellow-500"
															/>
														);
													} else {
														return (
															<AiOutlineStar
																size={25}
																className="fill-yellow-500"
															/>
														);
													}
												})}
										</div>
										<div className=" w-full h-auto flex items-center">
											{users.map((v, i) => {
												if (v.uid === item.user) {
													return (
														<>
															<div
																key={i}
																className="bg-purple-500 rounded-full w-10 h-10 grid place-content-center font-bold text-2xl">
																{v?.photoURL ? (
																	<img
																		src={v.photoURL}
																		className="w-10 h-10 rounded-full"
																	/>
																) : (
																	v.displayName[0].toUpperCase()
																)}
															</div>
															<h1 className="font-medium text-2xl p-3">
																{v.displayName}
															</h1>
														</>
													);
												}
											})}
										</div>
										<p className="font-medium p-3">{item?.comment}</p>
										<div className="flex p-3">
											<div className="w-auto h-10 p-2 bg-slate-50 border border-black rounded-[2.5rem] flex items-center justify-center border-opacity-50">
												<AiOutlineLike size={30} />
												{item.like?.length >= 1 && (
													<h1 className="font-medium ml-4">
														{item.like?.length}
													</h1>
												)}
											</div>
											<div className="w-auto ml-5 h-10 p-2 bg-slate-50 border border-black rounded-[2.5rem] flex items-center justify-center border-opacity-50">
												<AiOutlineDislike size={30} />
												{item.dislike?.length >= 1 && (
													<h1 className="font-medium ml-4">
														{item.dislike?.length}
													</h1>
												)}
											</div>
										</div>
										<h1 className="font-semibold p-3">{item.date}</h1>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductInfo;

import React, {useEffect, useState} from "react";
import {BsHeart, BsHeartFill} from "react-icons/bs";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Tile = ({currentProduct}) => {
	const {favorite} = useSelector((state) => state.product);
	const {isLogged} = useSelector((state) => state.auth);
	const [favItem, setFavItem] = useState();
	const navigate = useNavigate();
	const navigateHandler = () => {
		navigate("/product-info", {state: {currentProduct}});
	};
	useEffect(() => {
		const callFunc = () => {
			let fav = favorite?.some(
				(item) => item?.pro.proId === currentProduct?.proId
			);
			setFavItem(fav);
		};
		isLogged && callFunc();
	}, [currentProduct]);
	return (
		<>
			<div
				className="w-2/5 h-[200px] md:w-[98%] md:h-[280px] bg-slate-100 border-2 rounded-md mb-2 flex"
				onClick={navigateHandler}>
				<div className="w-[200px] h-full md:w-[500px] p-2">
					<img
						src={currentProduct?.photoURL}
						alt=""
						className="w-full h-full"
					/>
				</div>
				<div className="w-[200px] ml-2 h-full p-2 flex flex-col items-start justify-between">
					<div>
						<h1 className="font-medium text-lg">{currentProduct?.proName}</h1>
						<h1 className="font-medium mt-1 bg-green-600 w-8 flex items-center justify-center rounded-md text-white">
							4.6
						</h1>
					</div>
					<div className="font-medium uppercase">
						<p>{currentProduct.description}</p>
					</div>
				</div>
				<div className="w-[330px] h-auto p-2 flex items-end justify-between flex-col">
					{favItem ? (
						<BsHeartFill size={30} fill="lightgreen" />
					) : (
						<BsHeart size={30} fill="lightgreen" />
					)}
					<div>
						<s className="font-medium text-base">
							Rs {currentProduct.price} /-
						</s>
						<h1 className="font-bold text-lg">Rs {currentProduct.offer} /-</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tile;

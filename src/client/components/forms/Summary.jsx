import React, {useEffect, useState} from "react";
import FormWrapper from "../FormWrapper";
import {BsTrash3Fill} from "react-icons/bs";
import {useSelector} from "react-redux";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {removeItem} from "../../../utils/handleCartOperations";

const Summary = ({method}) => {
	const {currentUser} = useSelector((state) => state.auth);
	const [cartItems, setCartItems] = useState();
	const [instant, setInstant] = useState();
	const getCartItems = async () => {
		try {
			if (method === "instantBuy") {
				const cartRef = await getDoc(doc(db, "instantBuy", currentUser.uid));
				cartRef && setInstant(cartRef.data().buy);
			} else {
				const cartRef = await getDoc(doc(db, "cart", currentUser.uid));
				cartRef && setCartItems(cartRef.data().cart);
			}
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getCartItems();
	}, [cartItems]);
	const totalP = cartItems?.reduce((acc, value) => {
		return parseInt(acc) + parseInt(value.total);
	}, 0);
	const proCard = (val, id) => {
		return (
			<div
				key={id}
				className="w-full h-auto flex bg-white-rgba border-b-4 rounded-md">
				<div className="w-[30%] h-auto">
					<img
						src={val?.cartItems ? val?.cartItems.photoURL : val?.photoURL}
						alt=""
						className="w-40 h-40 p-2 border border-slate-300 rounded-sm"
					/>
				</div>
				<div className="w-[20%] h-auto">
					<h1 className="pt-4 font-bold text-lg">
						{val?.cartItems ? val?.cartItems.proName : val?.proName}
					</h1>
					<h1 className="font-medium text-slate-500">
						Rs {val?.cartItems ? val?.cartItems.price : val?.price} Rs
					</h1>
				</div>
				<div className="w-[50%] h-auto p-3 flex justify-end flex-row">
					<h1 className="w-6 h-6 flex mr-3 rounded-md justify-center items-center text-white bg-slate-500 border border-slate-500">
						{val?.cartItems ? val?.count : 1}
					</h1>
					<BsTrash3Fill onClick={removeItem} className="w-5 h-5 fill-red-500" />
				</div>
			</div>
		);
	};
	return (
		<FormWrapper title={"Order Summary"}>
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-full h-full p-4">
					<div className="w-full h-[380px]  rounded-md overflow-scroll relative">
						{method === "instantBuy"
							? proCard(instant)
							: cartItems?.map((val, key) => {
									return proCard(val, key);
							  })}
					</div>
					<div className="w-full h-[20%] mt-7 flex flex-col items-center justify-center">
						<div className="w-full h-8 flex items-center justify-between border-b border-slate-300 p-3">
							<p className="font-bold text-base text-slate-700">Subtotal</p>
							<p className="font-bold text-base text-slate-700">
								Rs {instant ? instant?.price : totalP} /-
							</p>
						</div>
						<div className="w-full h-8 flex items-center justify-between border-b border-slate-300 p-3">
							<p className="font-bold text-base text-slate-700">
								Delivery charge
							</p>
							<p className="font-bold text-base text-slate-700">Rs 30 /-</p>
						</div>
						<div className="w-full h-8 flex items-center justify-between border-b border-slate-300 px-3 my-3">
							<p className="font-bold text-lg text-slate-700">Grand total</p>
							<p className="font-bold text-lg text-slate-700">
								Rs {instant ? parseInt(instant.price) + 30 : totalP + 30} /-
							</p>
						</div>
					</div>
				</div>
			</div>
		</FormWrapper>
	);
};

export default Summary;

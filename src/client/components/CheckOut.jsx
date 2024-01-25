import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useMultiStepForm} from "../../hooks/useMultiStepForm";
import ShippingInfo from "./forms/ShippingInfo";
import Delivery from "./forms/DeliveryMethod";
import Summary from "./forms/Summary";
import {useDispatch, useSelector} from "react-redux";
import {setAddress, updateCart} from "../../redux/userSlice";
import {
	arrayUnion,
	deleteField,
	doc,
	onSnapshot,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import {db} from "../../firebase";

const CheckOut = () => {
	const {state} = useLocation(location.state);
	const {currentUser} = useSelector((state) => state.auth);
	const {userAddress, paymentMethod} = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		fname: "",
		lname: "",
		phone: "",
		address: "",
		pincode: "",
		landmark: "",
		city: "",
		hNo: "",
	});
	const [cart, setCart] = useState([]);
	const {currentStepIndex, steps, step, next, back, isLastStep, isFirstStep} =
		useMultiStepForm([
			<ShippingInfo form={form} setForm={setForm} />,
			<Delivery />,
			<Summary method={state?.method} />,
		]);
	const setFormData = () => {
		dispatch(setAddress(form));
		next();
	};
	const getCart = () => {
		try {
			onSnapshot(doc(db, "cart", currentUser.uid), (doc) => {
				setCart(doc.data().cart);
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getCart();
	}, [currentUser]);
	const totalP = cart?.reduce((acc, value) => {
		return parseInt(acc) + parseInt(value.total);
	}, 0);
	const onStock = async (p, c) => {
		//p -> state.product
		//c -> cart products
		if (p) {
			let updatedProduct = {
				...p,
				qty: p.qty - 1,
			};
			await setDoc(doc(db, "products", p.proId), {...updatedProduct});
			return true;
		}
	};
	const placeOrder = async () => {
		const response = onStock(state.product, cart);
		if (response) {
			const currentDate = new Date();
			const RecievingDate = new Date(currentDate);
			RecievingDate.setDate(RecievingDate.getDate() + 5);
			try {
				if (state.method === "instantBuy") {
					await updateDoc(doc(db, "orders", currentUser.uid), {
						order: arrayUnion({
							orderId: crypto.randomUUID(),
							products: [state?.product],
							deliveryDetails: userAddress,
							paymentMethod: "COD",
							orderPlacedOn: currentDate.toLocaleString(),
							deliveryExpected: RecievingDate.toLocaleDateString(),
							count: 1,
							totalPrice: state?.product.price,
							orderStatus: "Order placed",
							userId: currentUser.uid,
						}),
					})
						.then((res) => console.log("====", res))
						.catch((err) => console.log("===", err));
				} else {
					await updateDoc(doc(db, "orders", currentUser.uid), {
						order: arrayUnion({
							orderId: crypto.randomUUID(),
							products: cart,
							deliveryDetails: userAddress,
							paymentMethod: paymentMethod,
							orderPlacedOn: currentDate.toLocaleString(),
							deliveryExpected: RecievingDate.toLocaleDateString(),
							totalPrice: totalP,
							orderStatus: "Order placed",
							userId: currentUser.uid,
						}),
					});
					await updateDoc(doc(db, "cart", currentUser.uid), {
						cart: deleteField(),
					});
				}
				state.product.forEach(async (item) => {
					await updateDoc(doc(db, "products", item.cartItems.proId), {
						qty: parseInt(item.cartItems.qty - item.count),
					});
				});
				navigate("/");
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<>
			<div className="w-full h-[90%] flex items-center justify-center">
				<div className="w-[700px] h-[700px] md:w-[380px] mt-20 md:m-0 bg-slate-100 shadow-md">
					<div className="w-full h-[10%]">
						<div className="w-full h-full flex flex-col items-end p-4">
							<p className="text-lg font-bold text-blue-500">
								{currentStepIndex + 1}/{steps.length}
							</p>
						</div>
					</div>
					<div className="w-full h-[80%] flex items-center justify-center flex-col">
						{step}
					</div>
					<div className="w-full h-[10%] flex">
						<div className="w-1/2 h-full p-3">
							<button
								onClick={back}
								className={`px-2 py-1 font-bold text-white text-lg rounded-md shadow-md bg-blue-500 ${
									isFirstStep ? "opacity-0" : "opacity-100"
								}`}>
								Back
							</button>
						</div>
						<div className="w-1/2 h-full flex items-center justify-end p-3">
							{isLastStep ? (
								<button
									onClick={placeOrder}
									className="px-2 py-1 font-bold text-white text-lg rounded-md shadow-md bg-blue-500">
									Place Order
								</button>
							) : (
								<button
									onClick={setFormData}
									className="px-2 py-1 font-bold text-white text-lg rounded-md shadow-md bg-blue-500">
									Next
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CheckOut;

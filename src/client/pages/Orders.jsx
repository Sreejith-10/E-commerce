import React, {useEffect, useState} from "react";
import Stepper from "../components/Stepper";
import {doc, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {useSelector} from "react-redux";

const Orders = () => {
	const {currentUser} = useSelector((state) => state.auth);
	const [order, setOrder] = useState([]);
	const fetchOrders = async () => {
		onSnapshot(doc(db, "orders", currentUser.uid), (res) => {
			setOrder(res.data().order);
		});
	};
	const cancelOrder = async (orderId) => {
		const cancel = confirm("Do you want to cancel the order");
		if (cancel) {
			let updatedOrder = order.filter((v) => {
				if (v.orderId != orderId) return v;
			});
			await setDoc(doc(db, "orders", currentUser.uid), {
				order: updatedOrder,
			});
		}
	};
	useEffect(() => {
		fetchOrders();
	}, [currentUser.uid]);
	return (
		<>
			<div className="w-full h-full">
				<h1 className="font-bold text-6xl ml-72 md:m-0 p-2 md:p-0 md:ml-2">
					Orders
				</h1>
				{order?.map((item, idx) => {
					return (
						<div
							key={idx}
							className="w-full h-auto lg:mt-10 md:mt-4 flex justify-center items-center">
							<div className="w-[70%] h-[700px] md:w-[95%] bg-slate-100 shadow-md rounded-md mx-auto md:m-0">
								<div className="w-full h-4/5 flex flex-col">
									<div className="w-[100%] h-1/2 flex overflow-scroll p-5 relative">
										{item?.products?.map((val, id) => {
											return (
												<div className="w-auto h-full flex flex-col items-center justify-center">
													<img
														key={id}
														src={
															val.cartItems
																? val.cartItems?.photoURL
																: val.photoURL
														}
														alt=""
														className="w-auto h-60 m-2"
													/>
													<h1 className="w-full h-auto text-center font-medium text-lg">
														{val?.cartItems
															? val.cartItems?.proName
															: val?.proName}
													</h1>
												</div>
											);
										})}
										{item.orderStatus === "Order placed" && (
											<button
												onClick={() => cancelOrder(item?.orderId)}
												className="absolute right-3 top-4 bg-red-500 font-medium py-2 px-2 rounded-md text-white">
												Cancel Order
											</button>
										)}
									</div>
									<div className="w-full h-1/2 flex p-4 md:flex-col">
										<div className="w-1/2 h-full  flex flex-col items-start justify-center">
											<h1 className="font-medium text-2xl">
												{item?.deliveryDetails?.address}
											</h1>
											<h1 className="font-medium text-xl">
												{item?.deliveryDetails?.city}
											</h1>
											<h1 className="font-medium text-xl">
												{item?.deliveryDetails?.pincode}
											</h1>
											<h1 className="font-medium text-xl mt-4">
												{item?.deliveryDetails?.phone}
											</h1>
										</div>
										<div className="w-1/2 h-full flex flex-col items-center justify-center">
											<h1 className="font-medium text-2xl text-slate-700">
												Order placed on
											</h1>
											<h1 className="font-bold text-slate-600">
												{item?.orderPlacedOn}
											</h1>
										</div>
									</div>
								</div>
								<div className="w-full h-1/5 mx-auto border-t-2 border-slate-300 flex items-center justify-center md:mt-3">
									<Stepper item={item.orderStatus} />
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Orders;

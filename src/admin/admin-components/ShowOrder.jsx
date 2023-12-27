import {arrayUnion, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import React, {useState} from "react";
import {BsXSquare} from "react-icons/bs";
import {db} from "../../firebase";

const ShowOrder = ({data, setS}) => {
	const [steps, setSteps] = useState([
		"Order placed",
		"Shipped",
		"Outfordelivery",
		"Deliverd",
	]);
	// const verifyOrder = async () => {
	// 	await setDoc(doc(db, "notificatons", data.userId), {
	// 		notification: arrayUnion({
	// 			message: "Order placed",
	// 			time: data?.orderPlacedOn,
	// 		}),
	// 	});
	// };
	const procedToNextStep = async () => {
		let orderRef = await getDoc(doc(db, "orders", data.userId));
		let order = orderRef.data().order;
		let newOrder = order.map((item) => {
			let curretntStep = item.orderStatus;
			let currentStepIndex = steps.indexOf(curretntStep);
			if (item.orderId === data.orderId) {
				return {...item, orderStatus: steps[currentStepIndex + 1]};
			} else return item;
		});
		await updateDoc(doc(db, "orders", data.userId), {order: newOrder});
	};
	return (
		<>
			<div className="w-full h-full">
				<div className="w-full h-[10%] p-4 md:p-0 flex items-center justify-between">
					<h1 className="font-bold text-lg text-slate-700 flex">
						Order Id : <p className="ml-2 text-slate-900">{data.orderId}</p>
					</h1>
					<BsXSquare
						onClick={() => setS(false)}
						size={40}
						className="float-right hover:fill-red-500"
					/>
				</div>
				<div className="w-full h-[50%] p-4 flex">
					<div className="w-full h-full flex">
						{data?.products?.map((v, i) => {
							return (
								<div
									key={i}
									className="w-auto m-4 h-full flex flex-col items-center justify-center">
									<img
										src={v.cartItems ? v.cartItems?.photoURL : v?.photoURL}
										alt=""
										className="w-auto h-[95%]"
									/>
									<h1 className="w-auto font-medium text-xl h-[5%]">
										{v.cartItems ? v.cartItems?.proName : v?.proName}
									</h1>
								</div>
							);
						})}
					</div>
				</div>
				<div className="w-full h-[40%] p-4 grid grid-cols-3 md:grid-cols-1 divide-x-0">
					<div className="md:mb-4">
						<h1 className="font-bold text-2xl">Delivery Address</h1>
						<h1 className="font-medium text-2xl mt-4 text-slate-800">
							{data.deliveryDetails.fname + " " + data.deliveryDetails.lname}
						</h1>
						<h1 className="font-semibold max-w-[350px]">
							{data.deliveryDetails.address}
						</h1>
						<h1 className="font-medium md:font-thin">
							{data.deliveryDetails.phone}
						</h1>
						<h1 className="font-medium md:font-thin">
							{data.deliveryDetails.phone}
						</h1>
						<h1 className="font-medium md:font-thin text-slate-700">
							{data.deliveryDetails.pincode}
						</h1>
					</div>
					<div className="md:mb-4">
						<h1 className="font-bold text-2xl">Payment method</h1>
						<h1 className="font-medium md:font-normal text-xl text-slate-900 mt-4">
							{data.paymentMethod}
						</h1>
						<h1 className="font-bold text-xl md:font-normal text-slate-800">
							Total price : Rs {data.totalPrice}/-
						</h1>
					</div>
					<div className="w-auto md:mb-4">
						<h1 className="font-bold text-2xl">Order status</h1>
						<h1 className="font-bold text-lg text-slate-700 flex">
							Order placed on :{" "}
							<p className="ml-2 md:font-normal text-slate-900">
								{data.orderPlacedOn}
							</p>
						</h1>{" "}
						<div className="w-11/12 p-2 mt-4 bg-blue-500 flex items-center justify-between rounded-md">
							<h1
								className="font-bold
               text-white">
								{data.orderStatus}
							</h1>
							<button
								onClick={procedToNextStep}
								className="font-bold bg-green-500 border border-white px-1 rounded-md hover:text-blue-500 text-white">
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShowOrder;

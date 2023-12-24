import {collection, getDocs} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {db} from "../../firebase";
import {useSelector} from "react-redux";
import ShowOrder from "../admin-components/ShowOrder";

const UserOrders = () => {
	const [orders, setOrders] = useState([]);
	const [data, setData] = useState();
	const [s, setS] = useState(false);
	const getOrders = async () => {
		try {
			const res = await getDocs(collection(db, "orders"));
			let arr = [];
			let f = res?.docs
				?.map((v) => {
					return v.data().order;
				})
				?.flatMap((innerArr) => innerArr);

			f.map((v) => {
				arr.push(v);
			});
			setOrders(arr);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getOrders();
	}, []);
	const showItems = (data) => {
		setData(data);
		setS(true);
	};
	return (
		<div className="w-full h-full md:h-auto p-6">
			<div className="w-full h-full md:h-auto">
				<h1 className="font-bold text-2xl text-blue-500 mb-4">Orders</h1>
				<div className="w-full h-[95%] bg-white md:bg-transparent shadow-md rounded-xl flex flex-col items-center">
					{s ? (
						<ShowOrder data={data} setS={setS} />
					) : (
						<>
							<div className="w-[98%] h-[10%] md:w-full flex items-center justify-between">
								<input
									type="text"
									placeholder="search users..."
									className="w-[200px] h-[40px] md:w-auto bg-slate-100 shadow-md font-bold outline-slate-300 p-2"
								/>
							</div>
							<div className="w-[98%] h-[80%] md:h-auto overflow-scroll">
								<table className="w-full">
									<thead className="bg-slate-100 h-12">
										<tr>
											<th
												scope="col"
												className="py-3 px-6 border-b uppercase text-slate-700">
												Name
											</th>
											<th
												scope="col"
												className="py-3 px-6 border-b uppercase text-slate-700">
												Order ID
											</th>
											<th
												scope="col"
												className="py-3 px-6 border-b uppercase text-slate-700">
												Actions
											</th>
										</tr>
									</thead>
									{orders?.map((v, i) => {
										return (
											<tbody key={i}>
												<tr>
													<td className="py-4 px-6 border-b text-center font-medium">
														{v?.deliveryDetails.fname +
															v?.deliveryDetails.lname}
													</td>
													<td className="py-4 px-6 border-b text-center font-medium">
														{v?.orderId}
													</td>
													<td className="py-4 px-6 border-b text-center">
														<button
															onClick={() => showItems(v)}
															className="md:h-auto px-1 h-[30px] text-white rounded-md shadow-md bg-red-500">
															View Orders
														</button>
													</td>
												</tr>
											</tbody>
										);
									})}
								</table>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserOrders;

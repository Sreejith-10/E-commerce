import {collection, getDocs} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {db} from "../../firebase";
import {useDispatch} from "react-redux";
import {setUsers} from "../../redux/adminSlice";

const Users = () => {
	const dispatch = useDispatch();
	const [user, setUser] = useState();
	const getUsers = async () => {
		try {
			const querySnapShot = await getDocs(collection(db, "users"));
			let arr = [];
			querySnapShot?.docs?.forEach((doc) => {
				arr.push(doc.data());
			});
			setUser(arr);
		} catch (err) {
			console.log(err);
		}
		user && dispatch(setUsers(user));
	};
	useEffect(() => {
		getUsers();
	}, []);
	return (
		<>
			<div className="w-full h-full md:h-auto p-6">
				<div className="w-full h-full md:h-auto">
					<h1 className="font-bold text-2xl text-blue-500 mb-4">All Users</h1>
					<div className="w-full h-[95%] bg-white md:bg-transparent shadow-md rounded-xl flex flex-col items-center">
						<div className="w-[98%] h-[10%] md:w-full flex items-center justify-between">
							<input
								type="text"
								placeholder="search users..."
								className="w-[200px] h-[40px] md:w-auto bg-slate-100 shadow-md font-bold outline-slate-300 p-2"
							/>
							<button className="w-[80px] h-[40px] bg-blue-500 rounded-md shadow-md font-sans font-bold text-white">
								Register
							</button>
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
											Email
										</th>
										<th
											scope="col"
											className="py-3 px-6 border-b uppercase text-slate-700">
											UID
										</th>
										<th
											scope="col"
											className="py-3 px-6 border-b uppercase text-slate-700">
											Actions
										</th>
									</tr>
								</thead>
								{user?.map((v, i) => {
									return (
										<tbody key={i}>
											<tr>
												<th
													scope="row"
													className="py-4 px-6 border-b text-center text-slate-800 flex items-center justify-evenly">
													<img
														src={
															v.photoURL
																? v.photoURL
																: "/images/Default_pfp.svg.png"
														}
														alt=""
														className="w-10 h-10 rounded-full"
													/>
													{v.displayName}
												</th>
												<td className="py-4 px-6 border-b text-center font-medium">
													{v.email}
												</td>
												<td className="py-4 px-6 border-b text-center font-medium">
													{v.uid}
												</td>
												<td className="py-4 px-6 border-b text-center">
													<button className="w-[75px] h-[30px] text-white rounded-md shadow-md bg-red-500">
														Block
													</button>
												</td>
											</tr>
										</tbody>
									);
								})}
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Users;

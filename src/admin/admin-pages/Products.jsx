import React, {useEffect, useState} from "react";
import ProductUpdate from "../admin-components/ProductUpdate";
import {db} from "../../firebase";
import {collection, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import Loader from "../../client/components/Loader";
import AddProducts from "../admin-components/AddProducts";

const Products = () => {
	const [showLoader, setShowLoader] = useState(false);
	const [item, setItem] = useState([]);
	const [id, setId] = useState();
	const [addFrom, setAddForm] = useState(false);
	const [updateForm, setUpdateForm] = useState(false);
	const [close, setClose] = useState(true);

	const getAllProducts = async () => {
		const arr = [];
		onSnapshot(collection(db, "products"), (doc) => {
			doc?.docs?.forEach((doc) => {
				arr.push(doc.data());
			});
			setItem(arr);
		});
	};
	useEffect(() => {
		getAllProducts();
	}, []);
	const removeProduct = async (p) => {
		const s = confirm("Do you want to remove the project");
		if (s) {
			try {
				await deleteDoc(doc(db, "products", p.proId));
			} catch (err) {
				console.log(err);
			}
		}
	};
	const showAddForm = () => {
		setAddForm(true);
		setUpdateForm(false);
		setClose(false);
	};
	const showUpdateForm = (id) => {
		setAddForm(false);
		setUpdateForm(true);
		setClose(false);
		setId(id);
	};
	const proTable = () => {
		return (
			<div className="w-full h-[95%] bg-white md:bg-transparent shadow-md rounded-xl flex flex-col items-center">
				<>
					<div className="w-[98%] h-[10%] flex items-center justify-between">
						<input
							type="text"
							placeholder="search product..."
							className="w-[200px] h-[40px] bg-slate-100 shadow-md font-bold outline-none p-2"
						/>
						<button
							onClick={showAddForm}
							className="w-auto h-[40px] px-2 bg-blue-500 rounded-md shadow-md font-sans font-bold text-white ">
							Add Product
						</button>
					</div>
					<div className="w-[98%] h-[80%] overflow-scroll">
						<table className="w-full">
							<thead className="bg-slate-100 h-12">
								<tr>
									<th
										scope="col"
										className="py-3 px-6 border-b uppercase text-slate-700">
										Product
									</th>
									<th
										scope="col"
										className="py-3 px-6 border-b uppercase text-slate-700">
										Category
									</th>
									<th
										scope="col"
										className="py-3 px-6 border-b uppercase text-slate-700">
										Price
									</th>
									<th
										scope="col"
										className="py-3 px-6 border-b uppercase text-slate-700">
										Offer
									</th>
									<th
										scope="col"
										className="py-3 px-6 border-b uppercase text-slate-700">
										Actions
									</th>
								</tr>
							</thead>
							{item.map((val, id) => {
								return (
									<tbody key={id}>
										<tr>
											<th
												scope="row"
												className="py-4 px-6 border-b text-center text-slate-800 flex items-center justify-center">
												<img src={val.photoURL} alt="" className="w-12 h-12" />
												{val.proName}
											</th>
											<td className="py-4 px-6 border-b text-center font-medium">
												{val.cat}
											</td>
											<td className="py-4 px-6 border-b text-center font-medium">
												{val.price} /-
											</td>
											<td className="py-4 px-6 border-b text-center font-medium">
												{val.offer} /-
											</td>
											<td className="py-4 px-6 border-b text-center md:flex md:items-center md:justify-center">
												<button
													className="w-[75px] h-[30px] text-white rounded-md shadow-md bg-red-500"
													onClick={() => removeProduct(val)}>
													Remove
												</button>
												<button
													className="w-[75px] h-[30px] ml-2 text-white rounded-md shadow-md bg-green-500"
													onClick={() => showUpdateForm(val)}>
													Update
												</button>
											</td>
										</tr>
									</tbody>
								);
							})}
						</table>
					</div>
				</>
			</div>
		);
	};
	return (
		<>
			<div className="w-full h-full p-6">
				<div className="w-full h-full">
					<h1 className="font-bold text-2xl text-blue-500 mb-4"></h1>

					{close
						? proTable()
						: (addFrom && (
								<AddProducts setAddForm={setAddForm} setClose={setClose} />
						  )) ||
						  (updateForm && (
								<ProductUpdate
									id={id}
									setUpdateForm={setUpdateForm}
									setClose={setClose}
								/>
						  ))}
				</div>
			</div>
		</>
	);
};

export default Products;

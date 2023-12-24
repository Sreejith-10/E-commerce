import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, {useRef, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {db, storage} from "../../firebase";
import {doc, setDoc} from "firebase/firestore";

const AddProducts = ({setAddForm, setClose}) => {
	const [proName, setProductName] = useState();
	const [brand, setBrand] = useState();
	const [price, setPrice] = useState();
	const [offer, setOffer] = useState();
	const [qty, setQty] = useState(1);
	const [description, setDescription] = useState();
	const [cat, setCat] = useState();
	const [subCat, setSubCat] = useState();
	const [img, setImg] = useState();
	const [imgRef, setImgRef] = useState();
	const inputFile = useRef(null);
	const showFile = () => {
		inputFile.current.click();
	};
	const upadteImg = (e) => {
		setImgRef(e.target.files[0]);
		setImg(URL.createObjectURL(e.target.files[0]));
	};
	const closeCurrentForm = () => {
		setAddForm(false);
		setClose(true);
	};
	const addProduct = async () => {
		const proId = crypto.randomUUID();
		const storageRef = ref(storage, proName);

		const uploadTask = uploadBytesResumable(storageRef, imgRef);

		try {
			uploadTask.on(
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then(async (downloadURL) => {
							console.log(downloadURL);
							await setDoc(doc(db, "products", proId), {
								proId,
								proName,
								brand,
								price,
								offer,
								description,
								cat,
								subCat,
								qty,
								photoURL: downloadURL,
							});
							await setDoc(doc(db, "reviews", proId), {
								review: [],
							});
						})
						.catch((err) => console.log(err));
				}
			);
			closeCurrentForm();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<div className="w-full h-[95%] flex bg-slate-200 shadow-md rounded-md">
				<div className="w-[40%] h-full flex flex-col items-center justify-evenly">
					<h1 className="font-bold text-2xl text-slate-700">Product Image</h1>
					<div className="w-[500px] h-[500px] relative bg-blue-200">
						<img src={img} alt="" className="w-full h-full" />
						<input
							type="file"
							ref={inputFile}
							style={{display: "none"}}
							onChange={upadteImg}
						/>
						<button
							onClick={showFile}
							className="py-1 px-2 rounded-md font-bold text-white bg-blue-500 absolute bottom-4 right-4">
							Add
						</button>
					</div>
				</div>
				<div className="w-[30%] flex flex-col justify-center items-start">
					<div className="flex flex-col mb-5 mt-3">
						<label htmlFor="name" className="mb-3 font-bold text-slate-700">
							Product Name
						</label>
						<input
							required
							type="text"
							value={proName}
							onChange={(e) => setProductName(e.target.value)}
							className="w-[400px] h-8 p-3 rounded-sm font-bold  outline-blue-500 border border-slate-800 border-opacity-50"
						/>
					</div>
					<div className="flex flex-col mb-5 mt-3">
						<label htmlFor="name" className="mb-3 font-bold text-slate-700">
							Brand
						</label>
						<input
							required
							type="text"
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
							className="w-[400px] h-8 p-3 rounded-sm font-bold  outline-blue-500 border border-slate-800 border-opacity-50"
						/>
					</div>
					<div className="flex flex-col mb-5 mt-3">
						<label
							htmlFor="description"
							className="mb-3 font-bold text-slate-700">
							Description
						</label>
						<textarea
							name=""
							id=""
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-[400px] h-20 p-3 font-bold  outline-blue-500 border border-slate-800 border-opacity-50"
							cols="30"
							rows="30"></textarea>
					</div>
					<div className="flex flex-col mb-5 mt-3">
						<label htmlFor="price" className="mb-3 font-bold text-slate-700">
							Price
						</label>
						<input
							required
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="w-[400px] h-8 p-3 font-bold  outline-blue-500 border border-slate-800 border-opacity-50"
						/>
					</div>
					<div className="flex flex-col mb-5 mt-3">
						<label htmlFor="offer" className="mb-3 font-bold text-slate-700">
							Offer
						</label>
						<input
							required
							type="text"
							value={offer}
							onChange={(e) => setOffer(e.target.value)}
							className="w-[400px] h-8 p-3 font-bold  outline-blue-500 border border-slate-800 border-opacity-50"
						/>
					</div>
					<div className="flex flex-col mb-5 mt-3">
						<label htmlFor="name" className="mb-3 font-bold text-slate-700">
							Quantity
						</label>
						<input
							required
							type="number"
							value={qty}
							onChange={(e) => setQty(e.target.value)}
							className="w-20 h-8 p-3 rounded-sm font-bold  outline-blue-500 border border-slate-800 border-opacity-50"
						/>
					</div>
				</div>
				<div className="w-[30%] h-full flex flex-col items-end justify-between">
					<div className="p-5 cursor-pointer">
						<AiOutlineClose
							className="w-10 h-10 fill-red-500 border-red-500 border-2 rounded-md"
							onClick={closeCurrentForm}
						/>
					</div>
					<div className="w-full h-full">
						<div className="flex flex-col mb-5 mt-3">
							<label
								htmlFor="category"
								className="mb-3 font-bold text-slate-700">
								Category
							</label>
							<input
								required
								type="text"
								value={cat}
								onChange={(e) => setCat(e.target.value)}
								className="w-[400px] h-8 p-3 rounded-sm font-bold  outline-blue-500 border border-slate-800 border-opacity-50"
							/>
						</div>
						<div className="flex flex-col mb-5 mt-3">
							<label htmlFor="sub" className="mb-3 font-bold text-slate-700">
								Sub Category
							</label>
							<input
								required
								type="text"
								value={subCat}
								onChange={(e) => setSubCat(e.target.value)}
								className="w-[400px] h-8 p-3 rounded-sm font-bold  outline-blue-500 border border-slate-800 border-opacity-50"
							/>
						</div>
					</div>
					<div className="p-5">
						<button
							onClick={addProduct}
							className="bg-green-500 py-2 px-5 rounded-md text-xl font-bold text-white">
							Add
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddProducts;

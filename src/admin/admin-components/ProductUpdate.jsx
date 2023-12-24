import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, {useRef, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {db, storage} from "../../firebase";
import {doc, setDoc, updateDoc} from "firebase/firestore";

const ProductUpdate = ({id, setUpdateForm, setClose}) => {
	const [proName, setProductName] = useState(id?.proName);
	const [brand, setBrand] = useState(id?.brand);
	const [price, setPrice] = useState(id?.price);
	const [offer, setOffer] = useState(id?.offer);
	const [qty, setQty] = useState(id ? id.qty : 1);
	const [description, setDescription] = useState(id?.description);
	const [cat, setCat] = useState(id?.cat);
	const [subCat, setSubCat] = useState(id?.subCat);
	const [currentImg, setCurrentImg] = useState(id?.photoURL);
	const [uploadImg, setUploadImg] = useState();
	const [imgRef, setImgRef] = useState(id?.photoURL);
	const inputFile = useRef(null);
	const showFile = () => {
		inputFile.current.click();
	};
	const upadteImg = (e) => {
		setUploadImg(e.target.files[0]);
		setCurrentImg(URL.createObjectURL(e.target.files[0]));
	};
	const updateProduct = async () => {
		if (imgRef && imgRef !== currentImg) {
			const storageRef = ref(storage, proName);

			const uploadTask = uploadBytesResumable(storageRef, uploadImg);

			try {
				uploadTask.on(
					(error) => {
						console.log(error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(
							async (downloadURL) => {
								await updateDoc(doc(db, "products", id.proId), {
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
							}
						);
					}
				);
				setClose(true);
				setUpdateForm(false);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				await updateDoc(doc(db, "products", id.proId), {
					proName,
					brand,
					price,
					offer,
					description,
					cat,
					subCat,
					qty,
				});
				setClose(true);
				setUpdateForm(false);
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<>
			<div className="w-full h-[95%] flex bg-slate-200 shadow-md rounded-md">
				<div className="w-[40%] h-full flex flex-col items-center justify-evenly">
					<h1 className="font-bold text-2xl text-slate-700">Product Image</h1>
					<div className="w-[500px] h-[500px] relative bg-blue-200">
						<img src={currentImg} alt="" className="w-full h-full" />
						<input
							type="file"
							ref={inputFile}
							style={{display: "none"}}
							onChange={upadteImg}
						/>
						<button
							onClick={showFile}
							className="absolute bottom-4 right-4 py-1 px-2 rounded-md font-bold text-white bg-blue-500">
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
							type="text"
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
							onClick={() => {
								setClose(true);
								setUpdateForm(false);
							}}
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
							onClick={updateProduct}
							className="bg-green-500 py-2 px-5 rounded-md text-xl font-bold text-white">
							Update
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductUpdate;

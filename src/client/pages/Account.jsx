import {updateProfile} from "firebase/auth";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, {useRef, useState} from "react";
import {BsCameraFill} from "react-icons/bs";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {db, storage} from "../../firebase";
import {doc, updateDoc} from "firebase/firestore";

const Account = () => {
	const {currentUser} = useSelector((state) => state.auth);
	const {isLogged} = useSelector((state) => state.auth);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const fileRef = useRef(null);
	const [userName, setUserName] = useState(currentUser.displayName);
	const [img, setImg] = useState(currentUser.photoURL);
	const [imgRef, setImgRef] = useState();

	const showFile = () => {
		fileRef.current.click();
	};
	const upadateAccount = () => {
		const storageRef = ref(storage, currentUser.displayName);
		const uploadTask = uploadBytesResumable(storageRef, imgRef);

		try {
			uploadTask.on(
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then(async (downloadURL) => {
							await updateProfile(currentUser, {
								photoURL: downloadURL,
							});
							await updateDoc(doc(db, "users", currentUser.uid), {
								photoURL: downloadURL,
							});
						})
						.catch((err) => console.log(err));
				}
			);
			setShowUpdateForm(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="w-3/5 h-[600px] md:w-full md:h-[700px] md:mt-2 m-auto mt-32 bg-slate-100 flex md:flex-col rounded-md shadow-md items-center justify-center">
				{isLogged ? (
					<>
						{showUpdateForm ? (
							<div className="w-full h-full  lg:grid lg:grid-cols-2 md:flex md:flex-col md:items-center md:justify-center">
								<div className="w-auto h-full md:w-full md:h-1/2 flex flex-col items-center justify-between">
									<div className="w-[60%] h-[60%] mt-10 relative">
										<img
											src={img ? img : "/images/Default_pfp.svg.png"}
											alt=""
											className="w-full h-full rounded-full"
										/>
										<input
											type="file"
											ref={fileRef}
											style={{display: "none"}}
											onChange={(e) => {
												setImgRef(e.target.files[0]);
												setImg(URL.createObjectURL(e.target.files[0]));
											}}
										/>
										<div className="absolute right-4 bottom-8 w-12 h-12 bg-blue-500 rounded-full grid place-content-center">
											<BsCameraFill onClick={showFile} size={30} fill="white" />
										</div>
									</div>
									<button
										onClick={() => {
											setShowUpdateForm(false);
										}}
										className="bg-red-500 text-xl text-white px-4 py-1 rounded-md mb-8">
										Cancel
									</button>
								</div>
								<div className="w-auto h-full md:w-full md:h-1/2 flex flex-col items-center justify-between">
									<div className="p-20 md:p-0">
										<div className="p-10">
											<h1 className="font-medium text-xl">Name:</h1>
											<input
												className="h-8 w-full p-2 font-medium outline-none border border-slate-500 rounded-md"
												type="text"
												value={userName}
												onChange={(e) => setUserName(e.target.value)}
											/>
										</div>
									</div>
									<button
										onClick={upadateAccount}
										className="bg-green-500 text-xl text-white px-4 py-1 rounded-md mb-8">
										Update
									</button>
								</div>
							</div>
						) : (
							<div className="w-full h-full  lg:grid lg:grid-cols-2 md:flex md:flex-col md:items-center md:justify-center">
								<div className="w-auto h-full md:w-full md:h-1/2 flex flex-col items-center justify-between">
									<img
										src={
											currentUser
												? currentUser.photoURL
												: "/images/Default_pfp.svg.png"
										}
										alt=""
										className="w-[60%] h-[60%] rounded-full mt-10"
									/>
									<button
										onClick={() => {
											setShowUpdateForm(true);
										}}
										className="lg:mb-52 md:m-0 bg-blue-500 py-1 px-2 font-bold text-white rounded-md">
										Update profile
									</button>
								</div>
								<div className="w-auto h-full md:w-full md:h-1/2">
									<div className="p-20 md:p-0">
										<div className="p-10">
											<h1 className="font-medium text-xl">Name:</h1>
											<h1 className="font-bold text-2xl">
												{currentUser.displayName}
											</h1>
										</div>
										<div className="p-10">
											<h1 className="font-medium text-xl">Email:</h1>
											<h1 className="font-bold text-2xl">
												{currentUser.email}
											</h1>
										</div>
									</div>
								</div>
							</div>
						)}
					</>
				) : (
					<Link
						to={"/login"}
						className="bg-green-500 px-2 py-3 rounded-md text-white font-bold 
					text-xl hover:bg-green-600 hover:text-slate-100 transi ease duration-300">
						Please Login
					</Link>
				)}
			</div>
		</>
	);
};

export default Account;

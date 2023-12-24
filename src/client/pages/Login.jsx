import {signInWithEmailAndPassword} from "firebase/auth";
import React, {useState} from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import {auth, db} from "../../firebase";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";

const Login = () => {
	const navigate = useNavigate();
	const [pass, setPass] = useState(false);
	const [toggle, setToggle] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userExist, setUserExist] = useState(false);
	const [weakPass, setWeakPass] = useState(false);
	const showPass = (val) => {
		if (val === "0") {
			setToggle(true);
			setPass(true);
		} else {
			setToggle(false);
			setPass(false);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			const localCart = JSON.parse(localStorage.getItem("cart"));
			if (localCart) {
				try {
					const cartRef = doc(db, "cart", res.user.uid);
					await updateDoc(cartRef, {
						cart: arrayUnion(localCart),
					});
				} catch (err) {
					console.log(err);
				}
				localStorage.removeItem("cart");
			}
			navigate("/");
		} catch (err) {
			const errorCode = err.code;
			if (errorCode === "auth/invalid-email") {
				setUserExist(true);
			} else if (errorCode === "auth/invalid-login-credentials") {
				setWeakPass(true);
			}
			console.log(err);
		}
	};
	return (
		<>
			<div className="w-full h-screen flex items-center justify-center">
				<div className="w-[400px] h-[400px] sm:w-[300px] sm:h-[350px] sm:mx-auto bg-slate-200 rounded-md shadow-md flex items-center justify-center">
					<form>
						<h1 className="mb-6 font-bold text-blue-600 text-[25px]">LogIn</h1>

						<div className="flex flex-col mb-5 mt-3">
							<label
								htmlFor="name"
								className={`mb-3 font-bold ${
									userExist ? "text-red-500" : "text-slate-700"
								}`}>
								{userExist ? "invalid Email" : "Email"}
							</label>
							<input
								required
								type="email"
								placeholder="Email . . . "
								className={`h-8 p-3 font-bold w-full border-2  rounded-md ${
									userExist
										? "text-red-500 outline-red-500 border-red-500 placeholder:text-red-500"
										: "text-slate-700 outline-blue-500 border-slate-300"
								}`}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col mb-5">
							<label
								htmlFor="name"
								className={`mb-3 font-bold ${
									weakPass ? "text-red-500" : "text-slate-700"
								}`}>
								{weakPass ? "password is wrong" : "Password"}
							</label>
							<div className="w-full bg-white flex items-center border rounded-md border-slate-300">
								<input
									required
									type={pass ? "text" : "password"}
									placeholder="Password . . . "
									className={`h-8 p-3 font-bold w-full border-2  rounded-md ${
										weakPass
											? "text-red-500 outline-red-500 border-red-500 placeholder:text-red-500"
											: "text-slate-700 outline-blue-500 border-slate-300"
									}`}
									onChange={(e) => setPassword(e.target.value)}
								/>
								{!toggle ? (
									<BsEye
										className="w-5 h-5 ml-1 mr-1"
										onClick={() => showPass("0")}
									/>
								) : (
									<BsEyeSlash
										className="w-5 h-5 ml-1 mr-1"
										onClick={() => showPass("1")}
									/>
								)}
							</div>
						</div>
						<div className="flex items-center justify-between mt-8">
							<div>
								<button
									onClick={handleSubmit}
									className="bg-blue-500 p-1 font-bold text-white rounded-md shadow-md hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
									Log In
								</button>
							</div>
							<div>
								<Link
									to={"/signup"}
									className="font-sans text-slate-600 font-medium hover:text-blue-500 border-2 border-blue-500 p-1 rounded-md bg-white">
									New user ?
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;

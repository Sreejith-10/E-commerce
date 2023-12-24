import React, {useState} from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {auth, db} from "../../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

const AdminLogin = () => {
	const [pass, setPass] = useState(false);
	const [toggle, setToggle] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const showPass = (val) => {
		if (val === "0") {
			setToggle(true);
			setPass(true);
		} else {
			setToggle(false);
			setPass(false);
		}
	};
	const changePage = async (e) => {
		e.preventDefault();
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			// const res = await createUserWithEmailAndPassword(auth, email, password);
			console.log(res.user);
			navigate("/admin");
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<div className="w-screen h-screen flex items-center justify-center">
				<div className="w-[400px] h-[400px] sm:w-[300px] sm:h-[400px] sm:mx-auto mx-auto my-auto bg-slate-200 rounded-md shadow-md flex items-center justify-center">
					<form>
						<h1 className="mb-6 font-bold text-blue-600 text-[25px]">
							Admin LogIn
						</h1>

						<div className="flex flex-col mb-5 mt-3">
							<label htmlFor="name" className="mb-3 font-bold text-slate-700">
								Admin Email
							</label>
							<input
								required
								type="email"
								placeholder="Email . . . "
								className="h-8 p-3 font-bold w-full border-2 text-slate-700 outline-blue-500 border-slate-300 rounded-md"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col mb-5">
							<label htmlFor="name" className="mb-3 font-bold text-slate-700">
								Admin Password
							</label>
							<div className="w-full bg-white flex items-center border rounded-md border-slate-300">
								<input
									required
									type={pass ? "text" : "password"}
									placeholder="Password . . . "
									className="h-8 p-3 font-bold w-full border-2 text-slate-700  border-none outline-blue-500 rounded-md"
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
									onClick={changePage}
									className="bg-blue-500 p-1 font-bold text-white rounded-md shadow-md hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500">
									Log In
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AdminLogin;

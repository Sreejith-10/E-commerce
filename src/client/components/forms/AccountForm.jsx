import React, {useEffect, useState} from "react";
import FormWrapper from "../FormWrapper";
import {BsEye, BsEyeSlash} from "react-icons/bs";

const AccountForm = ({
	emailErr,
	passErr,
	email,
	password,
	setEmail,
	setPassword,
	setIsEmpty,
}) => {
	const [toggle, setToggle] = useState(false);
	useEffect(() => {
		email && password === "" ? setIsEmpty(false) : setIsEmpty(true);
	}, [email, password]);
	return (
		<FormWrapper title={"AccountDetails"}>
			<div className="flex flex-col mb-5 mt-3">
				<label
					htmlFor="email"
					className={`mb-3 font-bold  ${
						emailErr ? "text-red-500" : "text-slate-700"
					}`}>
					{emailErr ? "Email already in use" : "Email"}
				</label>
				<input
					required
					type="email"
					placeholder="Email . . . "
					value={email}
					className={`h-8 p-3 font-bold w-full border-2 outline-blue-500 rounded-md  ${
						emailErr
							? "outline-red-500 border-2 rounded-md text-red-500 border-red-500"
							: "outline-blue-500  text-slate-700 border-slate-300 "
					}`}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="flex flex-col mb-5">
				<label
					htmlFor="password"
					className={`mb-3 font-bold  ${
						passErr ? "text-red-500" : " text-slate-700"
					}`}>
					{passErr ? "Weak password " : "Password"}
				</label>
				<div className="w-full bg-white flex items-center  border-2 border-slate-300 rounded-md">
					<input
						required
						type={toggle ? "text" : "password"}
						placeholder="Password . . . "
						value={password}
						className={`h-8 p-3 font-bold w-full outline-blue-500 rounded-md ${
							passErr
								? "outline-red-500 border-2 rounded-md text-red-500 border-red-500"
								: "outline-blue-500  text-slate-700 border-slate-300 "
						}`}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{toggle ? (
						<BsEye
							className="w-5 h-5 ml-1 mr-1"
							onClick={() => setToggle(false)}
						/>
					) : (
						<BsEyeSlash
							className="w-5 h-5 ml-1 mr-1"
							onClick={() => setToggle(true)}
						/>
					)}
				</div>
			</div>
		</FormWrapper>
	);
};

export default AccountForm;

import React from "react";
import FormWrapper from "../FormWrapper";

const UserForm = ({fname, lname, age, setFname, setLname, setAge}) => {
	return (
		<FormWrapper title={"UserDetails"}>
			<div className="flex flex-col mb-5 mt-3">
				<label htmlFor="fname" className="mb-3 font-bold text-slate-700">
					First Name
				</label>
				<input
					type="text"
					placeholder="First Name . . . "
					value={fname}
					className="h-8 p-3 font-bold w-full border-2 text-slate-700 outline-blue-500 border-slate-300 rounded-md"
					onChange={(e) => setFname(e.target.value)}
				/>
			</div>
			<div className="flex flex-col mb-5 mt-3">
				<label htmlFor="lname" className="mb-3 font-bold text-slate-700">
					Last Name
				</label>
				<input
					type="text"
					placeholder="Last Name . . . "
					value={lname}
					className="h-8 p-3 font-bold w-full border-2 text-slate-700 outline-blue-500 border-slate-300 rounded-md"
					onChange={(e) => setLname(e.target.value)}
				/>
			</div>
			<div className="flex flex-col mb-5 mt-3">
				<label htmlFor="age" className="mb-3 font-bold text-slate-700">
					Age
				</label>
				<input
					type="date"
					placeholder="Age . . . "
					value={age}
					className="h-8 p-3 font-bold w-full border-2 text-slate-700 outline-blue-500 border-slate-300 rounded-md"
					onChange={(e) => setAge(e.target.value)}
				/>
			</div>
		</FormWrapper>
	);
};

export default UserForm;

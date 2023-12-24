import React from "react";
import FormWrapper from "../FormWrapper";

const AddressForm = ({
	address,
	phone,
	pincode,
	setAddress,
	setPhone,
	setPincode,
}) => {
	return (
		<FormWrapper title={"AddressDetails"}>
			<div className="flex flex-col mb-5 mt-3">
				<label htmlFor="address" className="mb-3 font-bold text-slate-700">
					Address
				</label>
				<textarea
					cols="30"
					rows="10"
					value={address}
					className="h-20 p-3 font-bold w-full border-2 text-slate-700 outline-blue-500 border-slate-300 rounded-md"
					onChange={(e) => setAddress(e.target.value)}></textarea>
			</div>
			<div className="flex flex-col mb-5 mt-3">
				<label htmlFor="phone" className="mb-3 font-bold text-slate-700">
					Phone Number
				</label>
				<input
					type="text"
					placeholder="Phone Number . . . "
					value={phone}
					className="h-8 p-3 font-bold w-full border-2 text-slate-700 outline-blue-500 border-slate-300 rounded-md"
					onChange={(e) => setPhone(e.target.value)}
				/>
			</div>
			<div className="flex flex-col mb-5 mt-3">
				<label htmlFor="pincode" className="mb-3 font-bold text-slate-700">
					Pincode
				</label>
				<input
					type="text"
					placeholder="Pincode . . . "
					value={pincode}
					className="h-8 p-3 font-bold w-full border-2 text-slate-700  border-slate-300 rounded-md  outline-blue-500"
					onChange={(e) => setPincode(e.target.value)}
				/>
			</div>
		</FormWrapper>
	);
};

export default AddressForm;

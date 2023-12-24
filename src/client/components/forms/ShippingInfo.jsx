import FormWrapper from "../FormWrapper";

const ShippingInfo = ({form, setForm}) => {
	const onChangeHanlder = (e) => {
		const {name, value} = e.target;
		setForm({...form, [name]: value});
	};
	return (
		<FormWrapper title={"Shipping Information"}>
			<div className="w-[100%] h-auto flex">
				<div className="flex flex-col w-full p-4">
					<label htmlFor="" className="text-slate-600 font-medium">
						First name
					</label>
					<input
						onChange={onChangeHanlder}
						type="text"
						name="fname"
						className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
					/>
				</div>
				<div className="flex flex-col w-full p-4">
					<label htmlFor="" className="text-slate-600 font-medium">
						Last name
					</label>
					<input
						onChange={onChangeHanlder}
						type="text"
						name="lname"
						className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
					/>
				</div>
			</div>
			<div className="flex flex-col w-full p-4">
				<label htmlFor="" className="text-slate-600 font-medium">
					Address
				</label>
				<input
					onChange={onChangeHanlder}
					type="text"
					name="address"
					id=""
					className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
				/>
			</div>
			<div className="w-[100%] h-auto flex">
				<div className="flex flex-col w-full p-4">
					<label htmlFor="" className="text-slate-600 font-medium">
						City
					</label>
					<input
						onChange={onChangeHanlder}
						type="text"
						name="city"
						id=""
						className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
					/>
				</div>
				<div className="flex flex-col w-full p-4">
					<label htmlFor="" className="text-slate-600 font-medium">
						House number,flat number
					</label>
					<input
						onChange={onChangeHanlder}
						type="text"
						name="hNo"
						id=""
						className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
					/>
				</div>
			</div>
			<div className="w-[100%] h-auto flex">
				<div className="flex flex-col w-full p-4">
					<label htmlFor="" className="text-slate-600 font-medium">
						Pincode
					</label>
					<input
						onChange={onChangeHanlder}
						type="text"
						name="pincode"
						id=""
						className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
					/>
				</div>
				<div className="flex flex-col w-full p-4">
					<label htmlFor="" className="text-slate-600 font-medium">
						Landmark
					</label>
					<input
						onChange={onChangeHanlder}
						type="text"
						name="landmark"
						id=""
						className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
					/>
				</div>
			</div>
			<div className="flex flex-col w-full p-4">
				<label htmlFor="" className="text-slate-600 font-medium">
					Phone
				</label>
				<input
					onChange={onChangeHanlder}
					type="text"
					name="phone"
					id=""
					className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
				/>
			</div>
		</FormWrapper>
	);
};

export default ShippingInfo;

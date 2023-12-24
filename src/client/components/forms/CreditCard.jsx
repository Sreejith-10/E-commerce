import {useState} from "react";

const CreditCart = () => {
	const [stand, setStand] = useState(true);
	const [fast, setFast] = useState(false);
	const radioChange = (id) => {
		if (id === 2) {
			setFast(true);
			setStand(false);
		} else {
			setFast(false);
			setStand(true);
		}
	};
	return (
		<div className="md:w-full md:h-full">
			<div className="flex flex-col w-full p-4 md:p-2">
				<label htmlFor="" className="text-slate-600 font-medium">
					Card number
				</label>
				<input
					type="text"
					name=""
					id=""
					className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
				/>
			</div>
			<div className="flex flex-col w-full p-4 md:p-2">
				<label htmlFor="" className="text-slate-600 font-medium">
					Name on card
				</label>
				<input
					type="text"
					name=""
					id=""
					className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
				/>
			</div>
			<div className="flex">
				<div className="flex flex-col w-[70%] p-4 md:p-2">
					<label htmlFor="" className="text-slate-600 font-medium">
						Expiration date (MM/YY)
					</label>
					<input
						type="text"
						name=""
						id=""
						className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
					/>
				</div>
				<div className="flex flex-col w-[30%] p-4 md:p-2">
					<label htmlFor="" className="text-slate-600 font-medium">
						CVC
					</label>
					<input
						type="text"
						name=""
						id=""
						className="w-full border-2 p-1 font-semibold text-slate-700 outline-none border-slate-300 rounded-md"
					/>
				</div>
			</div>
			<div className="w-auto h-auto flex items-center justify-evenly">
				<div
					className={`w-80 h-40 md:w-64 md:mr-2 bg-white mt-2 rounded-md shadow-md transition-all ease-in-out delay-75 ${
						stand && "border-2 border-blue-500"
					}`}>
					<div className="w-full flex items-center justify-between">
						<h1 className="font-semibold p-3">Standard</h1>
						<input
							type="radio"
							className="w-4 h-4 mr-3 transition-all ease-in-out delay-75"
							checked={stand ? true : false}
							onChange={() => radioChange(1)}
						/>
					</div>
					<h1 className="text-slate-700 font-medium pl-3">
						Zero delivery charge
					</h1>
					<h1 className="text-slate-700 font-medium pl-3">
						Delivered in 5 days
					</h1>
					<h1 className="font-bold text-slate-800 p-3 pt-8">90.50 /-</h1>
				</div>
				<div
					className={`w-80 h-40 md:w-64 bg-white mt-2 rounded-md shadow-md transition-all ease-in-out delay-75 ${
						fast && "border-2 border-blue-500"
					}`}>
					<div className="w-full flex items-center justify-between">
						<h1 className="font-semibold p-3">Fast</h1>
						<input
							type="radio"
							className="w-4 h-4 mr-3 transition-all ease-in-out delay-75"
							checked={fast ? true : false}
							onChange={() => radioChange(2)}
						/>
					</div>
					<h1 className="text-slate-700 font-medium pl-3">
						Delivey charge : 30 Rs
					</h1>
					<h1 className="text-slate-700 font-medium pl-3">
						Delivered in 2 days
					</h1>
					<h1 className="font-bold text-slate-800 p-3 pt-8">90.50 /-</h1>
				</div>
			</div>
		</div>
	);
};

export default CreditCart;

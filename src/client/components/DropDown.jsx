import React, {useState} from "react";
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";

const DropDown = () => {
	const [dropDown, setDropDown] = useState([
		"Phone",
		"Laptop",
		"Clothes",
		"Furniture",
		"TV",
		"Speaker",
	]);
	const [showDropDown, setShowDropDown] = useState(false);
	const [dropValue, setDropvalue] = useState("");
	const setFunction = (v) => {
		setDropvalue(v);
		setShowDropDown(false);
	};
	const drop = dropDown?.map((val, id) => {
		return (
			<div
				key={id}
				onClick={() => setFunction(val)}
				className="w-[98%] h-12 flex items-center justify-center hover:bg-slate-200">
				<p className="font-bold text-xl text-slate-700">{val}</p>
			</div>
		);
	});
	return (
		<>
			<div className="w-80 h-14">
				<h1 className="font-medium text-2xl p-2 text-slate-700">Category</h1>
				<div
					className="w-80 h-14 bg-white flex items-center justify-center rounded-md shadow-md "
					onClick={() => setShowDropDown(!showDropDown)}>
					<label
						htmlFor=""
						className="w-[90%] h-16 flex items-center justify-center">
						<p className="font-bold text-xl text-slate-700">
							{dropValue ? dropValue : "Select"}
						</p>
					</label>
					{!showDropDown ? (
						<AiOutlineArrowDown
							className="w-8 h-8 fill-slate-600"
							onClick={() => setShowDropDown(true)}
						/>
					) : (
						<AiOutlineArrowUp
							className="w-8 h-8 fill-slate-600"
							onClick={() => setShowDropDown(false)}
						/>
					)}
				</div>
				{showDropDown && (
					<div className="w-80 h-auto mt-3 bg-white cursor-pointer flex flex-col items-center justify-center rounded-md shadow-md overflow-x-scroll">
						{drop}
					</div>
				)}
			</div>
		</>
	);
};

export default DropDown;

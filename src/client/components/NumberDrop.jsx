import React from "react";
import {useState} from "react";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

const NumberDrop = () => {
	const [showDropDown, setShowDropDown] = useState(false);
	const [defValue, setDefValue] = useState(1);
	const [number, setNumber] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	const chengeValue = (v) => {
		setDefValue(v + 1);
		setShowDropDown(false);
	};
	const num = number.map((val, idx) => {
		return (
			<div
				onClick={() => chengeValue(idx)}
				key={idx}
				className=" w-10 h-8 rounded-md flex flex-row items-center cursor-pointer text-slate-700 font-bold hover:bg-white">
				<h1>{val}</h1>
			</div>
		);
	});
	return (
		<>
			<div className="w-14 h-8 bg-inherit border-2 border-slate-400 flex flex-col items-center rounded-md shadow-md absolute">
				<div className="w-full h-full flex items-center flex-row justify-center">
					<h1 className="w-1/2 grid place-content-center font-bold text-slate-900">
						{defValue}
					</h1>
					{!showDropDown ? (
						<FaAngleDown
							className="w-1/2 grid place-content-center fill-slate-500"
							onClick={() => setShowDropDown(true)}
						/>
					) : (
						<FaAngleUp
							className="w-1/2 grid place-content-center fill-slate-500"
							onClick={() => setShowDropDown(false)}
						/>
					)}
				</div>
				{showDropDown && (
					<div className="w-full h-48 z-50 absolute flex items-center justify-center flex-col bg-slate-400 border-2 border-slate-400 rounded-md shadow-md top-10 scroll-smooth">
						{num}
					</div>
				)}
			</div>
		</>
	);
};

export default NumberDrop;

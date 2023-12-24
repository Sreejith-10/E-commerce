import React, {useState} from "react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

const Accordian = ({data, filterItems, setFilterItems, setChangeed}) => {
	const [showFil, setShowFil] = useState(false);
	const [itemCount, setItemCount] = useState(0);
	const setFilter = (e, item) => {
		if (!e) {
			const removerItem = filterItems.filter((v) => {
				if (v !== item.toLowerCase()) return v;
			});
			setFilterItems(removerItem);
			setChangeed(true);
			setItemCount((prev) => {
				return prev - 1;
			});
		} else {
			setFilterItems([...filterItems, item.toLowerCase()]);
			setChangeed(false);
			setItemCount((prev) => {
				return prev + 1;
			});
		}
	};
	return (
		<>
			<div className="w-4/5 mb-2">
				<div className="w-4/5 h-14 bg-slate-100 border-2 border-slate-300 rounded-md flex items-center justify-between font-medium text-lg text-slate-700 p-3">
					<div className="w-auto flex items-center">
						<div
							className={`mr-4 font-bold bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center ${
								itemCount > 0 ? "visible" : "invisible"
							}`}>
							{itemCount}
						</div>
						{data.cat}
					</div>
					<div>
						{!showFil ? (
							<AiOutlinePlus size={20} onClick={() => setShowFil(true)} />
						) : (
							<AiOutlineMinus size={20} onClick={() => setShowFil(false)} />
						)}
					</div>
				</div>
				<div
					className={`${
						showFil
							? "bg-slate-100 rounded-md visible w-4/5 h-auto border-2 border-slate-300 mb-2"
							: "hidden"
					} `}>
					{data.fil.map((v, idx) => {
						return (
							<div
								key={idx}
								className="font-medium text-lg text-slate-700 p-3 flex items-center">
								<input
									type="checkbox"
									className="w-5 h-5 ml-2 mr-2 "
									onChange={(e) => setFilter(e.target.checked, v)}
								/>
								{v}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Accordian;

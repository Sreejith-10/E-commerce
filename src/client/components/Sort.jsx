import React from "react";
import {useState} from "react";

const Sort = ({showSort, setRadio,filterResult,setFilterResult}) => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [sortList, setSortList] = useState([
		"Price Low to High",
		"Price High to Low",
		"Relevance",
		"Popularity",
	]);
	const sortAlgo = (radio) => {
		let sorted = [];
		if (radio === 0) {
			sorted = filterResult?.sort((a, b) => {
				return parseInt(a.offer) - parseInt(b.offer);
			});
		} else if (radio === 1)
			sorted = filterResult?.sort((a, b) => {
				return parseInt(b.offer) - parseInt(a.offer);
			});
		setFilterResult(sorted);
	};
	const onChangeHandler = (i) => {
		setSelectedItem(i)
		setRadio(i);
		sortAlgo(i)
	};
	const sortL = sortList?.map((val, id) => {
		return (
			<div
				key={id}
				className="w-11/12 h-10 font-bold text-lg text-slate-700  border-b-2 border-slate-300 flex items-center justify-between">
				{val}
				<input
					type="radio"
					checked={selectedItem===id}
					className="w-4 h-4"
					onChange={() => onChangeHandler(id)}
				/>
			</div>
		);
	});
	return (
		<>
			<div
				className={` w-1/2 h-40 md:w-2/3 absolute ${
					showSort ? "animate-fadeIn" : "opacity-0"
				} ease-in duration-1000 mt-2 rounded-md bg-slate-100 border-2 z-50 border-slate-300 flex flex-col items-center justify-center overflow-hidden`}>
				{sortL}
			</div>
		</>
	);
};

export default Sort;

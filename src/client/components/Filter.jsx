import {useState} from "react";
import {BsX} from "react-icons/bs";
import Accordian from "./Accordian";

const Filter = ({
	showFilter,
	setShowFilter,
	filterResult,
	setFilterResult,
	dataRef,
}) => {
	const [filterItems, setFilterItems] = useState([]);
	const [filter, setFilter] = useState([
		// {
		// 	cat: "Price",
		// 	fil: ["Rs 1000 and below", "Rs 1000 - Rs 10000", "Rs 10000 and Above"],
		// },
		{cat: "Brand", fil: ["Asus", "Samsung", "Apple"]},
		{cat: "Category", fil: ["Laptop", "Phone", "Tablet"]},
	]);
	const [changed, setChanged] = useState(false);

	const accordian = filter.map((val, idx) => {
		return (
			<Accordian
				data={val}
				key={idx}
				filterItems={filterItems}
				setFilterItems={setFilterItems}
				setChangeed={setChanged}
			/>
		);
	});
	const itemsFilterHandler = () => {
		if (filterItems.length > 0) {
			let filterHandlerResult = [];
			if (changed) {
				filterHandlerResult = dataRef?.filter((v) => {
					return filterItems?.every((k) => {
						return Object.values(v).includes(k);
					});
				});
			} else {
				filterHandlerResult = filterResult?.filter((v) => {
					return filterItems?.every((k) => {
						return Object.values(v).includes(k);
					});
				});
			}
			setFilterResult(filterHandlerResult);
		} else {
			setFilterResult(dataRef);
		}
	};
	return (
		<>
			<div
				className={`w-full h-[93%] fixed z-[99] bg-black-rgba ${
					showFilter ? "visible" : "ease-in translate-x-full"
				}`}>
				<div
					className={`w-1/3 h-full md:w-3/4 bg-slate-200 float-right ${
						showFilter ? "animate-slideIn" : "opacity-0"
					}`}>
					<div
						className="w-full h-[10%] flex items-center justify-between"
						onClick={() => setShowFilter(false)}>
						<h1 className="text-5xl font-semibold md:mt-5 text-blue-500 p-3">
							Filter Items
						</h1>
						<BsX className="w-20 h-20 hover:fill-red-500 transition-all ease-in duration-100" />
					</div>
					<div className="w-full h-[80%] md:h-auto flex flex-col items-center mt-8">
						{accordian}
					</div>
					<div className="w-full h-auto">
						<button
							onClick={itemsFilterHandler}
							className="bg-orange-600 px-7
						py-2 font-bold text-lg float-right mr-5 rounded-sm text-white">
							Apply
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Filter;

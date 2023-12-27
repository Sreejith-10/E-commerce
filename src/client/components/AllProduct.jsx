import React, {useEffect, useState} from "react";
import SearchBox from "./SearchBox";
import Sort from "./Sort";
import Filter from "./Filter";
import Tile from "./Tile";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

const AllProduct = () => {
	const {state} = useLocation(location.state);
	const {products} = useSelector((state) => state.product);
	const [showSort, setShowSort] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [searchKey, setSearchKey] = useState("");
	const [filterResult, setFilterResult] = useState();
	const [dataRef, setDataRef] = useState([]);
	const [navItem, setNavItem] = useState(state?.data);
	const [radio, setRadio] = useState();

	const onKeyDownHandler = async (e) => {
		let key = searchKey.split(" ");
		if (e.key === "Enter") {
			const result = products.filter((v) => {
				if (key.length === 1) {
					return (
						v.proName.toLowerCase().includes(searchKey.toLowerCase()) ||
						v.cat.toLowerCase().includes(searchKey.toLowerCase()) ||
						v.subCat.toLowerCase().includes(searchKey.toLowerCase()) ||
						v.brand.toLowerCase().includes(searchKey.toLowerCase())
					);
				} else {
					if (searchKey) {
						return v.proName.toLowerCase() === searchKey.toLowerCase();
					}
					return key.every((k) => {
						return Object.values(v).includes(k);
					});
				}
			});
			setFilterResult(result);
			setDataRef(result);
		}
	};
	const getOneItem = () => {
		if (navItem === "all") {
			setFilterResult(products);
		} else {
			let itemsFiltered = products?.filter((item) => {
				return item?.cat?.toLowerCase() === navItem?.toLowerCase();
			});
			setFilterResult(itemsFiltered);
		}
	};
	useEffect(() => {
		getOneItem();
	}, [navItem]);
	return (
		<>
			<Filter
				showFilter={showFilter}
				setShowFilter={setShowFilter}
				filterResult={filterResult}
				setFilterResult={setFilterResult}
				dataRef={dataRef}
			/>
			<div className="w-auto h-auto justify-center">
				<div className="flex items-center justify-center mt-10">
					<SearchBox
						setSearchKey={setSearchKey}
						onKeyDownHandler={onKeyDownHandler}
					/>
				</div>
				<div className="w-full h-auto flex items-center justify-center flex-col ">
					<div className="w-[400px] md:w-[300px] h-full">
						<div className="mt-10 w-[400px] h-[60px] md:w-[300px] md:h-[50px] bg-slate-100 shadow-md rounded-sm flex cursor-pointer">
							<div
								className="w-[50%] h-full grid place-content-center border-2 rounded-l-md border-slate-300 hover:cursor-pointer hover:bg-slate-300 hover:rounded-l-md hover:text-slate-600 text-xl text-slate-800 font-medium "
								onClick={() => setShowSort(!showSort)}>
								Sort
							</div>
							<div
								className="w-[50%] h-full grid place-content-center border-y-2 border-r-2 rounded-r-md border-slate-300 hover:cursor-pointer hover:bg-slate-300 hover:rounded-md hover:rounded-l-none hover:text-slate-600 text-xl text-slate-800 font-medium"
								onClick={() => setShowFilter(!showFilter)}>
								Filter
							</div>
						</div>
						<div className="flex relative mb-5">
							<Sort
								showSort={showSort}
								setRadio={setRadio}
								filterResult={filterResult}
								setFilterResult={setFilterResult}
							/>
						</div>
					</div>
				</div>
				<div className="w-full h-auto flex flex-col lg:items-center lg:justify-center">
					{filterResult?.length === 0 ? (
						<h1>No items found</h1>
					) : (
						filterResult?.map((v, i) => {
							return (
								<div key={i} className="md:w-[98%] h-auto">
									<Tile currentProduct={v} />;
								</div>
							);
						})
					)}
				</div>
			</div>
		</>
	);
};

export default AllProduct;

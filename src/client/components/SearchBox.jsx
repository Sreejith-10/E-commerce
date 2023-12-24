import React from "react";
import {BsSearch} from "react-icons/bs";

const SearchBox = ({searchKey,setSearchKey,onKeyDownHandler}) => {
	return (
		<>
			<div className="lg:w-[400px] lg:h-[60px] sm:w-[350px] border-2 border-slate-300 bg-slate-200 shadow-md flex items-center justify-around rounded-md">
				<input
					type="text"
					value={searchKey && searchKey}
					onChange={(e) => setSearchKey(e.target.value)}
					onKeyDown={onKeyDownHandler}
					className="lg:w-[350px] lg:h-[45px] sm:w-[300px] p-2 rounded-md outline-none font-sans text-lg font-medium"
				/>
				<BsSearch className="w-6 h-6 fill-blue-500" />
			</div>
		</>
	);
};

export default SearchBox;

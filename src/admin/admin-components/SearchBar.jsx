import React from "react";
import {useState} from "react";
import {AiOutlineSearch, AiFillBell} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
	const navigate = useNavigate();
	const [searchKey, setSearchKey] = useState("");
	const onChangeHandler = (e) => {
		setSearchKey(e.target.value);
	};
	const keyDownHandler = (e) => {
		if (e.keyCode === 13) {
			switch (searchKey) {
				case "/":
					navigate("/admin");
					return;
				case "/orders":
					navigate("/admin/orders");
					return;
				case "/users":
					navigate("/admin/users");
					return;
				case "/products":
					navigate("/admin/products");
					return;
				default:
					return;
			}
		}
	};
	return (
		<>
			<div className=" w-[400px] h-[60px] md:w-[300px] md:h-[50px] md:mt-4 flex bg-white shadow-md rounded-[2.5rem] mr-8 items-center justify-evenly">
				<div className="w-[255px] h-[45px] mr-8 md:mr-4 md:w-[200px] md:h-[40px] bg-slate-100 rounded-[1.75rem] flex items-center justify-evenly">
					<AiOutlineSearch className="w-[30px] h-[30px] md:w-[20px] md:h-[20px]" />
					<input
						type="text"
						placeholder="Search. . ."
						onChange={onChangeHandler}
						onKeyDown={keyDownHandler}
						className="w-[200px] h-[40px] md:w-[150px] md:h-[30px] rounded-3xl bg-slate-100 p-3 text-lg font-bold outline-none"
					/>
				</div>
				<AiFillBell className="w-[30px] h-[30px] fill-blue-500" />
				<div className="w-[45px] h-[45px] md:w-[30px] md:h-[30px] rounded-[50%] bg-blue-500 text-center text-white flex items-center justify-center">
					A
				</div>
			</div>
		</>
	);
};

export default SearchBar;

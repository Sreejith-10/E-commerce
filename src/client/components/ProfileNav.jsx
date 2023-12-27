import {signOut} from "firebase/auth";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../../redux/authSlice";
import {setCartItems} from "../../redux/productSlice";

const ProfileNav = ({profileNav, setProfileNav}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {isLogged} = useSelector((state) => state.auth);
	const [keys, setKeys] = useState(["Account", "Something"]);
	const NavigationHandler = (v) => {
		if (v === "Account") navigate("/account");
		setProfileNav(false);
	};
	const logOut = () => {
		signOut(auth);
		dispatch(setCurrentUser(""));
		dispatch(setCartItems(""));
	};
	return (
		<>
			<div
				className={`w-[200px] h-[200px] cursor-pointer bg-slate-100 rounded-md absolute z-10 right-[50px] top-[80px] ${
					profileNav ? "animate-slideIn" : "animate-slideOut"
				}`}>
				<div className="w-full h-[160px]">
					{keys.map((val, id) => {
						return (
							<div
								onClick={() => NavigationHandler(val)}
								className="w-full h-auto hover:border-2  border-slate-300 text-center p-2 rounded-md"
								key={id}>
								<h1 className="font-bold text-lg">{val}</h1>
							</div>
						);
					})}
				</div>
				{isLogged ? (
					<button
						className="w-full h-auto py-2 rounded-md font-bold hover:border-2 hover:border-red-500 hover:text-red-500 ease-in duration-150"
						onClick={logOut}>
						LogOut
					</button>
				) : (
					<button
						className="w-full h-auto py-2 rounded-md font-bold hover:border-2 hover:border-blue-500 hover:text-blue-500 ease-in duration-150"
						onClick={() => navigate("/login")}>
						LogIn
					</button>
				)}
			</div>
		</>
	);
};

export default ProfileNav;

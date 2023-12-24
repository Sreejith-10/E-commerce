import {doc, setDoc} from "firebase/firestore";
import {
	decrementCount,
	incrementCount,
	removeItem,
} from "../../utils/handleCartOperations";
import {useDispatch, useSelector} from "react-redux";
import {db} from "../../firebase";
import {useNavigate} from "react-router-dom";
import {setCartCount, setCartItems} from "../../redux/productSlice";

const CartCard = ({val}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {currentUser} = useSelector((state) => state.auth);
	const {isLogged} = useSelector((state) => state.auth);
	const instantBuy = async (items) => {
		await setDoc(doc(db, "instantBuy", currentUser.uid), {
			buy: items,
		});
		navigate("/checkout", {
			state: {product: val.cartItems, method: "instantBuy"},
		});
	};
	const removeItemHandler = (currentUser, val, isLogged) => {
		if (!isLogged) {
			let oldEntries = JSON.parse(localStorage.getItem("cart"));
			oldEntries = oldEntries.filter((v) => {
				return v?.cartItems.proId != val?.cartItems.proId;
			});
			localStorage.setItem("cart", JSON.stringify(oldEntries));
			let cartLength = oldEntries.length;
			dispatch(setCartItems(oldEntries));
			dispatch(setCartCount(cartLength));
		} else {
			removeItem(currentUser, val, isLogged);
		}
	};
	return (
		<>
			<div className="w-full h-[200px] md:h-auto shadow-md rounded-md mb-5 flex flex-row bg-slate-100 md:border md:border-black md:border-opacity-30 md:grid md:grid-cols-2 md:place-content-center">
				<div className="w-[25%] md:w-full h-full flex items-center justify-center">
					<img
						src={val?.cartItems?.photoURL}
						alt=""
						className="w-[80%] h-[95%] md:w-[70%]"
					/>
				</div>
				<div className="w-[25%] md:w-1/2 text-lg font-semibold mt-2 cursor-pointer">
					{val?.cartItems?.proName}
				</div>
				<div className="w-[25%] h-full md:w-full flex flex-col items-center justify-center">
					<div className="flex items-center justify-center">
						<button
							onClick={() => incrementCount(currentUser, val, isLogged)}
							className="w-8 h-8 mr-4 border-2 border-slate-500 rounded-md hover:bg-blue-500 hover:text-white hover:border-white hover:shadow-md bg-white text-blue-500 font-bold flex items-center justify-center">
							+
						</button>
						<p className="mr-4 font-bold">{val?.count}</p>
						<button
							onClick={() => decrementCount(currentUser, val, isLogged)}
							className="w-8 h-8 mr-4 border-2 border-slate-500 rounded-md hover:bg-blue-500 hover:text-white hover:border-white hover:shadow-md bg-white text-blue-500 font-bold flex items-center justify-center">
							-
						</button>
					</div>
					<button
						onClick={() => removeItemHandler(currentUser, val, isLogged)}
						className="mr-2 p-1 mt-3 font-bold text-white rounded-md shadow-md bg-red-500">
						Remove
					</button>
				</div>
				<div className="w-[25%] md:w-full flex items-center flex-col justify-between">
					<h1 className="text-lg mt-5 font-bold text-slate-700">
						Rs {val?.cartItems?.price}/-
					</h1>
					<button
						onClick={() => instantBuy(val.cartItems)}
						className="w-1/2 h-9 md:h-12 mb-6 bg-green-500 rounded-md font-bold text-white text-lg shadow-sm ">
						Buy now
					</button>
				</div>
			</div>
		</>
	);
};

export default CartCard;

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
import {useNotify} from "../../hooks/useNotify";
import Notify from "./Notify";

const CartCard = ({val, setOutOfStock}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showAlert, setShowAlert] = useNotify();
	const {currentUser} = useSelector((state) => state.auth);
	const {isLogged} = useSelector((state) => state.auth);
	const {products} = useSelector((state) => state.product);
	const instantBuy = async (items) => {
		await setDoc(doc(db, "instantBuy", currentUser.uid), {
			buy: items,
		});
		navigate("/checkout", {
			state: {product: val.cartItems, method: "instantBuy"},
		});
	};
	const showDetails = () => {
		navigate("/product-info", {state: {currentProduct: val.cartItems}});
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
	const incrementCartCount = (currentUser, val, isLogged) => {
		if (val.cartItems.qty <= val.count) {
			setShowAlert(true);
			return;
		}
		if (!isLogged) {
			let oldEntries = JSON.parse(localStorage.getItem("cart"));
			let oldEntriesUpdate = oldEntries?.map((v) => {
				if (v.cartItems.proId === val.cartItems.proId)
					return {...v, count: v.count + 1};
				return v;
			});
			dispatch(setCartItems(oldEntriesUpdate));
			localStorage.setItem("cart", JSON.stringify(oldEntriesUpdate));
		}
		incrementCount(currentUser, val);
	};
	const decrementCartCount = (currentUser, val, isLogged) => {
		if (!isLogged) {
			let oldEntries = JSON.parse(localStorage.getItem("cart"));
			let oldEntriesUpdate = oldEntries
				?.map((v) => {
					if (v.cartItems.proId === val.cartItems.proId) {
						return {...v, count: v.count - 1};
					}
					return v;
				})
				.filter((v) => {
					if (v.count >= 1) return v;
				});
			dispatch(setCartItems(oldEntriesUpdate));
			oldEntriesUpdate.length === 0
				? localStorage.removeItem("cart")
				: localStorage.setItem("cart", JSON.stringify(oldEntriesUpdate));
		}
		decrementCount(currentUser, val);
	};
	return (
		<>
			{showAlert && (
				<div className="absolute top-10 right-0">
					<Notify
						setShowAlert={setShowAlert}
						value={"This product stock limit is reached"}
					/>
				</div>
			)}
			<div className="w-full h-[200px] md:h-auto shadow-md rounded-md mb-5 flex flex-row bg-slate-100 md:border md:border-black md:border-opacity-30 md:grid md:grid-cols-2 md:place-content-center">
				<div
					className="w-[25%] md:w-full h-full flex items-center justify-center"
					onClick={showDetails}>
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
							onClick={() => incrementCartCount(currentUser, val, isLogged)}
							className="w-8 h-8 mr-4 border-2 border-slate-500 rounded-md hover:bg-blue-500 hover:text-white hover:border-white hover:shadow-md bg-white text-blue-500 font-bold flex items-center justify-center">
							+
						</button>
						<p className="mr-4 font-bold">{val?.count}</p>
						<button
							onClick={() => decrementCartCount(currentUser, val, isLogged)}
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
					{products
						?.filter((item) => {
							return item.proId === val?.cartItems?.proId;
						})
						.map((item) => {
							if (item?.qty > 0) {
								return (
									<button
										key={item.proId}
										onClick={() => instantBuy(val.cartItems)}
										className="w-1/2 h-9 md:h-12 mb-6 bg-green-500 rounded-md font-bold text-white text-lg shadow-sm ">
										Buy now
									</button>
								);
							} else {
								setOutOfStock(true);
								return (
									<button
										key={item.proId}
										className="w-1/2 h-9 md:h-12 mb-6 bg-green-500 rounded-md font-bold text-white text-lg shadow-sm ">
										Out of stock
									</button>
								);
							}
						})}
				</div>
			</div>
		</>
	);
};

export default CartCard;

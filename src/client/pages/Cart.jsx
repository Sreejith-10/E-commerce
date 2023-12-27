import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import CartCard from "../components/CartCard";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import {useDispatch, useSelector} from "react-redux";
import {setCartItems} from "../../redux/productSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const {currentUser} = useSelector((state) => state.auth);
	const {isLogged} = useSelector((state) => state.auth);
	const {cart} = useSelector((state) => state.product);
	const [cartProduct, setCartProduct] = useState();
	const [outOfStock, setOutOfStock] = useState(false);
	const navigate = useNavigate();
	const checkoutProducts = () => {
		isLogged
			? navigate("/checkout", {
					state: {product: cartProduct, method: "checkout"},
			  })
			: navigate("/login");
	};
	const totalP = cartProduct?.reduce((acc, value) => {
		return parseInt(acc) + parseInt(value?.total);
	}, 0);
	const localCart = () => {
		const local = JSON.parse(localStorage.getItem("cart"));
		dispatch(setCartItems(local));
	};
	const onSnap = () => {
		onSnapshot(doc(db, "cart", currentUser.uid), (doc) => {
			setCartProduct(doc.data()?.cart);
		});
	};
	useEffect(() => {
		isLogged ? onSnap() : localCart();
	}, []);
	return (
		<>
			<div className="w-full h-full">
				<div className="w-4/5 md:w-full h-4/5 mx-auto">
					<div className="w-full h-1/6 mt-10 mb-4 md:ml-3">
						<h1 className="font-semibold text-5xl text-slate-800">Cart</h1>
					</div>
					{cartProduct?.length || cart?.length > 0 ? (
						<div className="w-full h-full flex md:flex-col md:items-center md:justify-center">
							<div className="w-[70%] md:w-[98%] h-auto">
								{isLogged
									? cartProduct?.map((val, id) => {
											return (
												<CartCard
													val={val}
													key={id}
													setOutOfStock={setOutOfStock}
												/>
											);
									  })
									: cart?.map((val, id) => {
											return <CartCard val={val} key={id} />;
									  })}
							</div>
							<div className="w-[30%] h-[300px] md:w-[98%] md:m-0 ml-4 bg-slate-100 rounded-md shadow-md border border-slate-400 border-opacity-30">
								<div className="w-full h-auto">
									<div className="w-full h-12 p-3 flex items-center justify-between border border-x-0 border-t-0 border-b-slate-300">
										<h1 className="font-semibold text-lg text-slate-500">
											Subtotal
										</h1>
										<h1 className="font-semibold">Rs {totalP} /-</h1>
									</div>
									<div className="w-full h-12 p-2 flex items-center justify-between border border-x-0 border-t-0 border-b-slate-300">
										<h1 className="font-semibold text-lg text-slate-500">
											tax
										</h1>
										<h1 className="font-semibold">20 /-</h1>
									</div>
									<div className="w-full h-12 p-2 flex items-center justify-between mb-5">
										<h1 className="font-semibold text-xl">Grand total</h1>
										<h1 className="font-semibold text-xl">
											Rs {totalP + 20} /-
										</h1>
									</div>
								</div>
								<div className="w-full h-20 flex items-center flex-col justify-center">
									{outOfStock ? (
										<button
											onClick={() => alert("Some item are out of stock")}
											className="w-4/5 h-full rounded-md shadow-md bg-blue-500 text-white font-bold text-lg">
											Checkout
										</button>
									) : (
										<button
											onClick={checkoutProducts}
											className="w-4/5 h-full rounded-md shadow-md bg-blue-500 text-white font-bold text-lg">
											Checkout
										</button>
									)}
									<p>
										or{" "}
										<Link
											to={"/"}
											className="text-blue-500 font-semibold cursor-pointer">
											Continue shopping
										</Link>
									</p>
								</div>
							</div>
						</div>
					) : (
						<h1 className="md:ml-3">Cart is empty</h1>
					)}
				</div>
			</div>
		</>
	);
};

export default Cart;

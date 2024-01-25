import React, {useEffect, useState} from "react";
import Card from "../components/Card";
import ProductPopUp from "../components/ProductPopUp";
import Hero from "../components/Hero";
import {AiOutlineArrowRight} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import "/src/App.css";
import {useDispatch, useSelector} from "react-redux";
import Footer from "../components/Footer";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase";
import {setCartItems} from "../../redux/productSlice";

const Content = ({closeNav}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {products} = useSelector((state) => state.product);
	const {currentUser} = useSelector((state) => state.auth);
	const {cart} = useSelector((state) => state.product);
	const [proPreview, setProPreview] = useState(false);
	const [currentProduct, setCurrentProduct] = useState("");

	const showProductPop = (p) => {
		setProPreview(true);
		setCurrentProduct(p);
	};
	useEffect(() => {
		const getCart = () => {
			try {
				onSnapshot(
					doc(db, "cart", currentUser.uid),
					(doc) => doc && dispatch(setCartItems(doc.data().cart))
				);
			} catch (err) {
				console.log(err);
			}
		};
		return () => {
			getCart();
		};
	}, []);
	return (
		<>
			<div onClick={closeNav}>
				<div className="lg:w-full lg:h-full sm:w-full sm:h-full flex items-center justify-center">
					<Hero />
				</div>
				<div className="lg:w-full lg:h-full sm:w-full sm:h-full flex flex-col items-center justify-center mt-12 ">
					<h1 className="font-medium lg:text-3xl sm:text-lg uppercase text-blue-500">
						Find your favorite gadgets
					</h1>
					<div className="lg:ml-[800px] sm:m-0 flex items-center justify-center mt-4">
						<div
							onClick={() => navigate("/all-products", {state: {data: "all"}})}
							className="text-blue-500 font-bold sm:text-sm cursor-pointer">
							Show all Products
						</div>
						<AiOutlineArrowRight className="lg:w-6 lg:h-8 sm:w-4 sm:h-6 fill-blue-500" />
					</div>
					{proPreview && (
						<ProductPopUp
							currentProduct={currentProduct}
							setProPreview={setProPreview}
						/>
					)}
					<div className="lg:w-[1000px] lg:h-[220px] sm:w-full overflow-x-scroll flex flex-row mt-8 ">
						{products?.map((val, idx) => {
							return (
								<Card key={idx} item={val} showProductPop={showProductPop} />
							);
						})}
					</div>
				</div>

				<div className="mt-14">
					<div className="lg:w-full lg:h-full sm:w-full sm:h-full flex items-center justify-center mb-10">
						<img
							src="/images/lapdesk.jpg"
							alt=""
							className="lg:w-[50%] lg:h-[50%] sm:w-[85%] rounded-md"
						/>
						<div className="absolute text-center">
							<h1 className="font-bold lg:text-3xl sm:text-2xl text-blue-500 ">
								Level upyour productivity
							</h1>
							<p className="font-sans text-white lg:text-lg sm:text-sm sm:text-ellipsis">
								Find your choice of laptops from the available lists.
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center lg:w-[1000px] sm:w-full mx-auto h-auto">
						<div className="flex items-center justify-between w-full mb-6">
							<h1 className="lg:ml-7 text-lg font-bold text-blue-500 ">
								Laptops
							</h1>
							<div
								onClick={() =>
									navigate("/all-products", {state: {data: "laptop"}})
								}
								className="text-blue-500 font-bold sm:text-md cursor-pointer flex items-center justify-center">
								Show laptop
								<AiOutlineArrowRight className="lg:w-6 lg:h-8 sm:w-6 sm:h-6 sm:mr-3 fill-blue-500" />
							</div>
						</div>
						<div className="flex overflow-auto lg:w-full sm:w-full">
							{products?.map((v, i) => {
								if (v.cat === "laptop")
									return (
										<Card key={i} item={v} showProductPop={showProductPop} />
									);
							})}
						</div>
					</div>
					<div className="w-full h-full mt-20">
						<div className="lg:w-[50%] lg:h-[50%] sm:w-full sm:h-full lg:mx-auto sm:mx-auto flex items-center justify-between">
							<h1 className="text-lg font-bold text-blue-500 sm:ml-6">
								Shop by category
							</h1>
						</div>

						<div className="lg:w-[980px] lg:h-[670px] sm:w-[350px] sm:h-[450px] my-10 lg:mx-auto grid grid-cols-2 grid-rows-2">
							<div className="row-span-2 h-full relative p-2">
								<img
									src="/images/catphone.webp"
									alt=""
									className="h-full object-cover object-[50%,50%] rounded-md"
								/>
								<div
									onClick={() =>
										navigate("/all-products", {state: {data: "phone"}})
									}
									className="absolute bottom-4 right-4 md:right-1 md:bottom-1 p-2 font-medium text-white hover:text-blue-500 cursor-pointer">
									<h1 className="text-2xl">Smartphones</h1>
									<p>Show now</p>
								</div>
							</div>
							<div
								className="w-full h-full relative p-2"
								onClick={() =>
									navigate("/all-products", {state: {data: "furniture"}})
								}>
								<img
									src="/images/furniture.webp"
									alt=""
									className="w-full h-full rounded-md"
								/>
								<div className="absolute bottom-4 right-4 md:right-12 md:bottom-1 p-2 font-medium text-white hover:text-blue-500 cursor-pointer">
									<h1 className="text-2xl">Furniture</h1>
									<p>Show now</p>
								</div>
							</div>
							<div
								className="col-start-2 w-full h-full relative p-2 font-medium text-white"
								onClick={() =>
									navigate("/all-products", {state: {data: "clothes"}})
								}>
								<img
									src="/images/clothes.jpeg"
									alt=""
									className=" w-full h-full object-cover object-[50%,50%] rounded-md"
								/>
								<div className="absolute bottom-4 right-4 md:right-7 md:bottom-1 p-2 hover:text-blue-500 cursor-pointer">
									<h1 className="text-2xl">Mens wear</h1>
									<p>Show now</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full h-auto">
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Content;

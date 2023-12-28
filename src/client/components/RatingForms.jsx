import {arrayUnion, doc, setDoc, updateDoc} from "firebase/firestore";
import React, {useState} from "react";
import {BsStar, BsStarFill, BsX} from "react-icons/bs";
import {db} from "../../firebase";
import {useSelector} from "react-redux";

const RatingForms = ({setRatingsForm, product}) => {
	const {currentUser} = useSelector((state) => state.auth);
	const [number, setNumber] = useState(0);
	const [hoverStar, setHoverStar] = useState(undefined);
	const [text, setText] = useState("");
	const addRating = async () => {
		try {
			await updateDoc(doc(db, "reviews", product.proId), {
				review: arrayUnion({
					user: currentUser.uid,
					star: number,
					comment: text,
					date: new Date().toLocaleDateString(),
					likes: [],
					dislikes: [],
				}),
			});
			setRatingsForm(false);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<div className="lg:w-[500px] lg:h-[300px] bg-slate-100 flex flex-col border border-slate-400 border-opacity-30">
				<div className="w-full h-[20%] flex flex-col items-end justify-center">
					<BsX
						onClick={() => setRatingsForm(false)}
						className="fill-red-500"
						size={60}
					/>
				</div>
				<div className="w-full h-[80%] flex flex-col justify-center items-center">
					<h1 className="font-medium text-2xl mb-2">Rate the product</h1>
					<div className="flex mb-3">
						{Array(5)
							.fill()
							.map((v, i) => {
								return number >= i + 1 || hoverStar >= i + 1 ? (
									<BsStarFill
										key={i}
										className="ml-2 fill-yellow-500"
										size={25}
										onMouseOver={() => !number && setHoverStar(i + 1)}
										onMouseLeave={() => setHoverStar(undefined)}
										onClick={() => setNumber(i + 1)}
									/>
								) : (
									<BsStar
										key={i}
										className="ml-2 fill-yellow-500"
										size={25}
										onMouseOver={() => !number && setHoverStar(i + 1)}
										onMouseLeave={() => setHoverStar(undefined)}
										onClick={() => setNumber(i + 1)}
									/>
								);
							})}
					</div>
					<div className="w-4/5 h-10 mb-4 rounded-sm border border-slate-300 flex items-center justify-center bg-white">
						<input
							onChange={(e) => setText(e.target.value)}
							className="w-full h-full outline-none p-2 
							font-medium"
							type="text"
							placeholder="Comment here . . . "
						/>
					</div>
					<button
						onClick={addRating}
						className="font-medium py-1 px-3 rounded-md bg-green-500 text-white">
						Submit
					</button>
				</div>
			</div>
		</>
	);
};

export default RatingForms;

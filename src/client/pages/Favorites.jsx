import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase";
import {useSelector} from "react-redux";

const Favorites = () => {
	const [list, setList] = useState([]);
	const {currentUser} = useSelector((state) => state.auth);
	const unSub = async () => {
		await getDoc(doc(db, "favorites", currentUser.uid)).then((doc) => {
			setList(doc.data().fav);
		});
	};
	useEffect(() => {
		unSub();
	}, [currentUser]);
	return (
		<>
			<div className="w-full h-full">
				<div className="w-[70%] h-full md:w-full mx-auto">
					<h1 className="font-bold text-5xl mt-4 md:ml-2">Favorites</h1>
					<div className="w-full h-auto mt-5 grid grid-cols-5 md:grid-cols-2">
						{list?.map((v, i) => {
							return (
								<div
									key={i}
									className="w-[150px] h-[200px] m-10 bg-slate-200 border border-slate-300 rounded-md shadow-md ml-6 mr-6 flex flex-col items-center justify-around">
									<div className="w-[130px] h-[140px]">
										<img
											src={v?.pro.photoURL}
											alt=""
											className="w-full h-full max-w[130px] object-fill rounded-md"
										/>
									</div>
									<div className="w-[150px] h-[20px] text-center">
										<h1 className="font-sans font-medium text-slate-900">
											{v?.pro.proName}
										</h1>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Favorites;

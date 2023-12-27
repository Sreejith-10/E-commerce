import React from "react";
import {useEffect} from "react";

const Notify = ({setShowAlert,value}) => {
	const closeNotify = () => {
		setTimeout(() => {
			setShowAlert(false);
		}, 5000);
	};
	useEffect(() => {
		closeNotify();
	});
	return (
		<>
			<div className="w-80 h-16 bg-slate-200 mt-2 mr-6 md:mx-9 md:mt-9 animate-slideIn rounded-md shadow-md absolute right-0 flex items-center justify-between ">
				<h1 className="font-semibold text-slate-800 ml-2">
					{value}
				</h1>
				<button
					onClick={() => setShowAlert(false)}
					className="py-1 px-2 rounded-md shadow-sm text-white font-bold uppercase mr-3 bg-green-500">
					Ok
				</button>
			</div>
		</>
	);
};

export default Notify;

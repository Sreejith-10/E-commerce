import React from "react";

const Card = ({item, showProductPop}) => {
	return (
		<>
			<div
				className="w-[150px] h-[200px] bg-slate-200 border border-slate-300 rounded-md shadow-md ml-6 mr-6 flex flex-col items-center justify-around"
				onClick={() => showProductPop(item)}>
				<div className="w-[130px] h-[140px]">
					<img
						src={item?.photoURL}
						alt=""
						className="w-full h-full max-w[130px] object-fill rounded-md"
					/>
				</div>
				<div className="w-[150px] h-[20px] text-center">
					<h1 className="font-sans font-medium text-slate-900">
						{item?.proName}
					</h1>
				</div>
			</div>
		</>
	);
};

export default Card;

import React from "react";

const Hero = () => {
	return (
		<>
			<div className="relative lg:w-full lg:h-[450px] sm:w-full sm:h-[400px]">
				<img
					src="/images/ecommerce marketing.jpg"
					alt=""
					className="lg:w-full lg:h-full sm:w-full sm:h-full sm:blur-0 lg:object-cover lg:object-[10%,40%]"
				/>
				<h1 className="text-slate-100 text-3xl sm:text-center font-medium absolute sm:left-[0%] sm:top-[35%] sm:transform-[-50%,-50%] lg:left-[40%] lg:top-[50%]  lg:transform-[-50%,-50%]">
					Discouver your favorite Products
				</h1>
			</div>
		</>
	);
};

export default Hero;

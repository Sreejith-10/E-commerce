import React from "react";

const Hero = () => {
	return (
		<>
			<div className="relative lg:w-full lg:h-[450px] sm:w-full sm:h-[400px]">
				<img
					src="/images/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg"
					alt=""
					className="lg:w-full lg:h-full sm:w-full sm:h-full sm:blur-0 lg:object-cover lg:object-[10%,40%]"
				/>
				<h1 className="text-blue-500 text-6xl md:text-3xl w-full h-full sm:text-center font-medium absolute top-0 left-0 flex items-center justify-center">
					Discouver your favorite Products
				</h1>
			</div>
		</>
	);
};

export default Hero;

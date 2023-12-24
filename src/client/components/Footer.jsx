import React from "react";
import {
	BsCCircle,
	BsFacebook,
	BsGithub,
	BsInstagram,
	BsTwitter,
	BsYoutube,
} from "react-icons/bs";

const Footer = () => {
	return (
		<>
			<div className="w-full h-full bg-slate-700 flex items-center justify-center cursor-pointer">
				<div className="w-full h-auto flex flex-col items-center justify-center p-10 md:p-5">
					<div className="flex md:grid md:grid-cols-2">
						<h1 className="text-2xl text-white font-mono m-4">About</h1>
						<h1 className="text-2xl text-white font-mono m-4">Blog</h1>
						<h1 className="text-2xl text-white font-mono m-4">Pricing</h1>
						<h1 className="text-2xl text-white font-mono m-4">Terms</h1>
						<h1 className="text-2xl text-white font-mono m-4">Privacy</h1>
					</div>
					<div className="flex">
						<BsInstagram fill="white" size={40} className="m-4" />
						<BsTwitter fill="white" size={40} className="m-4" />
						<BsFacebook fill="white" size={40} className="m-4" />
						<BsGithub fill="white" size={40} className="m-4" />
						<BsYoutube fill="white" size={40} className="m-4" />
					</div>
					<div className="p-4 flex items-center md:items-start md:justify-center">
						<BsCCircle fill="white" size={20} />
						<h1 className="font-medium text-white ml-2">2023 Your Company,inc.All rights reserved</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;

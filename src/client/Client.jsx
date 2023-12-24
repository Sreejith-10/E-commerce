import { useState} from "react";
import Header from "./components/Header";
import ClientRoute from "../routes/ClientRoute";

const Client = () => {
	const [nav, setNav] = useState(false);
	const showNav = () => {
		setNav(true);
	};
	const closeNav = () => {
		setNav(false);
	};
	return (
		<>
			<div className="lg:w-full lg:h-full md:w-full md:h-full sm:w-full sm:h-full">
				<div>
					<Header
						showNav={showNav}
						closeNav={closeNav}
						nav={nav}
						setNav={setNav}
					/>
				</div>
				<>
					<ClientRoute closeNav={closeNav} />
				</>
			</div>
		</>
	);
};

export default Client;

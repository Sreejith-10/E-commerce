import React, {useState} from "react";
import DashBoardRoute from "../../routes/DashBoardRoute";
import AdminHeader from "../admin-components/AdminHeader";
import SideNav from "../admin-components/SideNav";

const AdminPanel = () => {
	const [nav, setNav] = useState(false);

	return (
		<>
			<div className="w-full h-full flex">
				<div className="h-full w-[20%]">
					<SideNav nav={nav} setNav={setNav}/>
				</div>
				<div className="w-full h-[100%]">
					<div className="h-[14%] w-[100%] md:h-[150px]">
						<AdminHeader setNav={setNav}/>
					</div>
					<div className="w-full lg:h-[86%] md:h-auto overflow-scroll">
						<DashBoardRoute setNav={setNav}/>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminPanel;

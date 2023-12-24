import React, {useEffect, useState} from "react";
import Todo from "../admin-components/Todo";
import CalenderWidget from "../admin-components/CalenderWidget";
import {
	BsBagFill,
	BsCupFill,
	BsCurrencyDollar,
	BsFillBarChartFill,
	BsListCheck,
} from "react-icons/bs";
import {
	collection,
	doc,
	getCountFromServer,
	getDoc,
	getDocs,
} from "firebase/firestore";
import {db} from "../../firebase";
import {useDispatch} from "react-redux";
import {setUsers} from "../../redux/adminSlice";

const Home = ({setNav}) => {
	const dispatch = useDispatch();
	const [item, setItem] = useState(0);
	const [userCount, setUserCount] = useState(0);
	const [orderCount, setOrderCount] = useState(0);
	const [user, setUser] = useState();
	const [taskCount,setTaskCount] = useState(0)
	const getDatas = async () => {
		await getCountFromServer(collection(db, "products")).then((res) =>
			setItem(res.data().count)
		);
		await getCountFromServer(collection(db, "users")).then((res) => {
			setUserCount(res.data().count);
		});
		await getCountFromServer(collection(db, "orders")).then((res) => {
			setOrderCount(res.data().count);
		});
		await getDoc(doc(db, "todo", "todos")).then((doc) => {
			setTaskCount(doc.data().list.length);
		});
	};
	const getUsers = async () => {
		try {
			const querySnapShot = await getDocs(collection(db, "users"));
			let arr = [];
			querySnapShot?.docs?.forEach((doc) => {
				arr.push(doc.data());
			});
			setUser(arr);
		} catch (err) {
			console.log(err);
		}
		user && dispatch(setUsers(user));
	};
	useEffect(() => {
		getUsers();
		getDatas();
	}, []);
	return (
		<>
			<div
				className="w-full h-auto bg-blue-50 p-6"
				onClick={() => setNav(false)}>
				<div className="w-full h-[150px] md:h-auto flex items-center justify-between md:flex-col md:justify-evenly">
					<div className="lg:w-[250px] lg:h-[100px] md:w-[330px] bg-white text-center rounded-xl shadow-md md:mb-4 flex items-center justify-center">
						<div className="w-20 h-20 ml-6 bg-slate-200 rounded-full flex flex-col items-center justify-center">
							<BsFillBarChartFill size={40} className="fill-purple-600" />
						</div>
						<div className="w-40 h-auto flex items-center justify-center flex-col">
							<h1 className="font-medium text-slate-400">Total users</h1>
							<h1 className="font-bold text-2xl text-slate-800">{userCount}</h1>
						</div>
					</div>
					<div className="lg:w-[250px] lg:h-[100px] md:w-[330px] bg-white text-center rounded-xl shadow-md md:mb-4 flex items-center justify-center">
						<div className="w-20 h-20 ml-6 bg-slate-200 rounded-full flex flex-col items-center justify-center">
							<BsCurrencyDollar size={40} className="fill-purple-600" />
						</div>
						<div className="w-40 h-auto flex items-center justify-center flex-col">
							<h1 className="font-medium text-slate-400">Anual Ernings</h1>
							<h1 className="font-bold text-2xl text-slate-800">134900</h1>
						</div>
					</div>
					<div className="lg:w-[250px] lg:h-[100px] md:w-[330px] bg-white text-center rounded-xl shadow-md md:mb-4 flex items-center justify-center">
						<div className="w-20 h-20 ml-6 bg-slate-200 rounded-full flex flex-col items-center justify-center">
							<BsCupFill size={40} className="fill-purple-600" />
						</div>
						<div className="w-40 h-auto flex items-center justify-center flex-col">
							<h1 className="font-medium text-slate-400">Total products</h1>
							<h1 className="font-bold text-2xl text-slate-800">{item}</h1>
						</div>
					</div>
					<div className="lg:w-[250px] lg:h-[100px] md:w-[330px] bg-white text-center rounded-xl shadow-md md:mb-4 flex items-center justify-center">
						<div className="w-20 h-20 ml-6 bg-slate-200 rounded-full flex flex-col items-center justify-center">
							<BsBagFill size={40} className="fill-purple-600" />
						</div>
						<div className="w-40 h-auto flex items-center justify-center flex-col">
							<h1 className="font-medium text-slate-400">Orders</h1>
							<h1 className="font-bold text-2xl text-slate-800">
								{orderCount}
							</h1>
						</div>
					</div>
					<div className="lg:w-[250px] lg:h-[100px] md:w-[330px] bg-white text-center rounded-xl shadow-md md:mb-4 flex items-center justify-center">
						<div className="w-20 h-20 ml-6 bg-slate-200 rounded-full flex flex-col items-center justify-center">
							<BsListCheck size={40} className="fill-purple-600" />
						</div>
						<div className="w-40 h-auto flex items-center justify-center flex-col">
							<h1 className="font-medium text-slate-400">Tasks</h1>
							<h1 className="font-bold text-2xl text-slate-800">{taskCount}</h1>
						</div>
					</div>
				</div>
				<div className="w-full h-auto mt-8 flex items-center justify-between md:flex-col md:mt-4">
					<div className="lg:w-[49%] lg:h-[400px] md:w-[95%] bg-white text-center rounded-xl shadow-md">
						<Todo />
					</div>
					<div className=" w-[49%] h-[400px] flex items-center justify-between md:flex-col md:mt-4">
						<div className="lg:w-[48%] lg:h-[400px] md:w-[320px] bg-white text-center rounded-xl shadow-md">
							<CalenderWidget />
						</div>
						<div className="lg:w-[48%] lg:h-[400px] md:w-[320px] bg-white text-center rounded-xl shadow-md md:mt-4">
							Stati
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;

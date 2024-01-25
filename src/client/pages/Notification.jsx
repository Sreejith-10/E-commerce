import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {db} from "../../firebase";

const Notification = () => {
	const {currentUser} = useSelector((state) => state.auth);
	const [notification, setNotification] = useState([]);
	const getNotification = async () => {
		try {
			await getDoc(doc(db, "notificatons", currentUser.uid)).then((res) => {
				setNotification(res.data().notification);
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getNotification();
	}, []);

	const readed = async (id) => {
		try {
			const newArray = notification.map((item) => {
				if (item.notId === id) {
					return {...item, read: true};
				}
				return item;
			});
			setNotification(newArray);
			await updateDoc(doc(db, "notificatons", currentUser.uid), {
				notification: newArray,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const notify = notification?.map((v, i) => {
		return (
			<div
				key={i}
				onClick={() => readed(v.notId)}
				className={`${
					v.read ? " bg-slate-100" : "bg-slate-300"
				} w-full h-[150px] border-2 border-slate-200 rounded-md lg:m-2 md:m-0 md:mb-2 flex items-start flex-col justify-between cursor-pointer`}>
				<p className="w-full h-auto p-2 font-medium text-slate-700">
					{v?.message}
				</p>
				<p className="w-full h-auto font-medium text-slate-600 p-2 flex items-end justify-end">
					{v?.time}
				</p>
			</div>
		);
	});
	return (
		<>
			<div className="w-full h-full ">
				<div className="w-2/3 h-auto md:w-11/12 mx-auto">
					<h1 className="font-bold text-6xl mt-4">Notifications</h1>
					<div className="w-full h-full">{notify}</div>
				</div>
			</div>
		</>
	);
};

export default Notification;

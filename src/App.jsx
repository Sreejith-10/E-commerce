import {useDispatch, useSelector} from "react-redux";
import "./App.css";
import PageRoute from "./routes/PageRoute";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebase";
import {setCurrentUser} from "./redux/authSlice";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {getProducts, setCartItems} from "./redux/productSlice";
import {setUsers} from "./redux/adminSlice";

function App() {
	const dispatch = useDispatch();
	const {currentUser} = useSelector((state) => state.auth);
	const getUser = () => {
		onAuthStateChanged(auth, (user) => {
			user && dispatch(setCurrentUser(user));
		});
	};
	const getProd = async () => {
		try {
			const querySnapShot = await getDocs(collection(db, "products"));
			const arr = [];
			querySnapShot?.docs?.forEach((doc) => {
				arr.push(doc.data());
			});
			arr && dispatch(getProducts(arr));
		} catch (err) {
			console.log(err);
		}
	};
	const getUsers = async () => {
		let arr = [];
		try {
			const querySnapShot = await getDocs(collection(db, "users"));
			querySnapShot?.docs?.forEach((doc) => {
				arr.push(doc.data());
			});
		} catch (err) {
			console.log(err);
		}
		arr && dispatch(setUsers(arr));
	};
	const getCart = async () => {
		try {
			await getDoc(doc(db, "cart", currentUser.uid)).then(
				(res) => res && dispatch(setCartItems(res.data()?.cart))
			);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getUser();
		getProd();
		getUsers();
		currentUser && getCart();
	}, []);
	return (
		<>
			<PageRoute />
		</>
	);
}

export default App;

import {arrayRemove, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

const incrementCount = async (currentUser, val) => {
	try {
		const proRef = await getDoc(doc(db, "cart", currentUser.uid));
		const upatedRef = proRef.data()?.cart.map((d) => {
			if (d.cartItems.proId === val.cartItems.proId) {
				return {
					...d,
					count: d.count + 1,
					total: parseInt(d.total) + parseInt(d.cartItems.price),
				};
			} else return d;
		});
		await updateDoc(doc(db, "cart", currentUser.uid), {cart: upatedRef});
	} catch (err) {
		console.log(err);
	}
};

const decrementCount = async (currentUser, val) => {
	try {
		const proRef = await getDoc(doc(db, "cart", currentUser.uid));
		const upatedRef = proRef
			.data()
			?.cart.map((d) => {
				if (d.cartItems.proId === val.cartItems.proId) {
					if (d.count === 1) {
						return null;
					} else {
						return {
							...d,
							count: d.count - 1,
							total: parseInt(d.total) - parseInt(d.cartItems.price),
						};
					}
				} else return d;
			})
			.filter((d) => {
				if (d != null) return d;
			});
		await updateDoc(doc(db, "cart", currentUser.uid), {cart: upatedRef});
	} catch (err) {
		console.log(err);
	}
};

const removeItem = async (currentUser, val, isLogged) => {
	try {
		await updateDoc(doc(db, "cart", currentUser.uid), {
			cart: arrayRemove(val),
		});
	} catch (err) {
		console.log(err);
	}
};
export {incrementCount, decrementCount, removeItem};

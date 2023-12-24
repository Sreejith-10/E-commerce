import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

export const addToCart = async (pro, user) => {
	try {
		const cartRef = doc(db, "cart", user.uid);
		await updateDoc(cartRef, {
			cart: arrayUnion({
				cartItems: pro,
				count: 1,
				total: pro.price,
			}),
		});
	} catch (error) {
		console.log(error);
	}
};

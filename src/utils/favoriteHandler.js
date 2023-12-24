import {
	arrayRemove,
	arrayUnion,
	doc,
	updateDoc,
} from "firebase/firestore";
import {db} from "../firebase";

const addToFavorite = async (pro, uid) => {
	try {
		await updateDoc(doc(db, "favorites", uid), {
			fav: arrayUnion({pro}),
		});
	} catch (err) {
		console.log(err);
	}
};

const removeFromFavorite = async (pro, uid) => {
	try {
		await updateDoc(doc(db, "favorites", uid), {
			fav: arrayRemove({pro}),
		});
	} catch (err) {
		console.log(err);
	}
};
export {addToFavorite, removeFromFavorite};

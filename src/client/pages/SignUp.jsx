import {useMultiStepForm} from "../../hooks/useMultiStepForm";
import {useNavigate} from "react-router-dom";
import AccountForm from "../components/forms/AccountForm";
import UserForm from "../components/forms/UserForm";
import {useState} from "react";
import {auth, db} from "../../firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

const SignUp = () => {
	const navigate = useNavigate();
	const [emailErr, setEmailErr] = useState(false);
	const [passErr, setPassErr] = useState(false);
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [age, setAge] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isEmpty, setIsEmpty] = useState(false);
	const {
		currentStepIndex,
		setCurrentStepIndex,
		steps,
		step,
		next,
		back,
		isLastStep,
		isFirstStep,
	} = useMultiStepForm([
		<AccountForm
			emailErr={emailErr}
			passErr={passErr}
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
			setIsEmpty={setIsEmpty}
		/>,
		<UserForm
			fname={fname}
			setFname={setFname}
			lname={lname}
			setLname={setLname}
			age={age}
			setAge={setAge}
		/>,
	]);
	const createAccount = async (e) => {
		e.preventDefault();
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			await setDoc(doc(db, "users", res.user.uid), {
				uid: res.user.uid,
				displayName: fname + " " + lname,
				email,
				age,
			});
			await updateProfile(res.user, {
				displayName: fname + lname,
			});
			await setDoc(doc(db, "orders", res.user.uid), {});
			await setDoc(doc(db, "cart", res.user.uid), {});
			await setDoc(doc(db, "favorites", res.user.uid), {});
			await setDoc(db, "notifications", res.user.uid, {});
			navigate("/");
		} catch (err) {
			const errorCode = err.code;
			if (errorCode === "auth/email-already-in-use") {
				setEmailErr(true);
				setCurrentStepIndex(0);
			} else if (errorCode === "auth/weak-password") {
				setPassErr(true);
				setCurrentStepIndex(0);
			} else {
				console.log(err);
			}
			console.log(err);
		}
		navigate("/");
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<form onSubmit={onSubmitHandler}>
				<div className="w-full h-screen flex items-center justify-center">
					<div className="lg:w-[400px] lg:h-[500px] sm:w-[300px] sm:h-[500px] sm:mx-auto bg-slate-200 rounded-md shadow-md flex flex-col items-center ">
						<div className="w-full h-[15%] flex items-center justify-between p-4 text-xl font-bold text-blue-500">
							<h1> Create Account</h1> {currentStepIndex + 1}/{steps.length}
						</div>
						<div className="w-auto h-[70%] flex items-center justify-center flex-col">
							{step}
						</div>
						<div className="w-full h-[15%] flex items-center justify-around">
							{!isFirstStep ? (
								<button
									onClick={back}
									type="button"
									className="bg-blue-500 px-2 py-1 text-xl font-bold text-white rounded-md">
									Back
								</button>
							) : isEmpty ? (
								<button
									onClick={back}
									type="button"
									className="bg-blue-500 opacity-0 px-2 py-1 text-xl font-bold text-white">
									Back
								</button>
							) : (
								<button
									type="button"
									className="bg-blue-500 opacity-0 px-2 py-1 text-xl font-bold text-white">
									Back
								</button>
							)}
							{!isLastStep ? (
								<button
									onClick={next}
									type="button"
									className="bg-blue-500 px-2 py-1 text-xl font-bold text-white rounded-md">
									Next
								</button>
							) : (
								<button
									onClick={createAccount}
									type="submit"
									className="bg-blue-500 px-2 py-1 text-xl font-bold rounded-md text-white">
									SignUp
								</button>
							)}
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default SignUp;

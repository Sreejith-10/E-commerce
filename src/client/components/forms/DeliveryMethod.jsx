import React, {useState} from "react";
import FormWrapper from "../FormWrapper";
import COD from "./COD";
import CreditCart from "./CreditCard";
import {useDispatch, useSelector} from "react-redux";
import {setPayment} from "../../../redux/userSlice";

const Delivery = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [methodForm, setMethodForm] = useState(<COD />);
	const [radioOption, setRadioOption] = useState([
		{option: "Credit card", check: false},
		{option: "COD", check: true},
	]);
	const showMethod = (id) => {
		if (id === 1) {
			setMethodForm(<COD />);
		} else {
			setMethodForm(<CreditCart />);
		}
		dispatch(setPayment(methodForm.type.name));
	};
	const checkHandler = (id) => {
		const upadtedRadioOption = radioOption.map((val, idx) => {
			if (id === idx) {
				showMethod(id);
				return {...val, check: true};
			} else {
				return {...val, check: false};
			}
		});
		setRadioOption(upadtedRadioOption);
	};

	const paymentMethod = radioOption.map((val, idx) => {
		return (
			<div className="p-4 flex items-center justify-center" key={idx}>
				<input
					type="radio"
					className="w-5 h-4 mr-2"
					checked={val.check}
					onChange={() => checkHandler(idx)}
				/>
				<label className="font-semibold text-slate-700" htmlFor="">
					{val.option}
				</label>
			</div>
		);
	});
	return (
		<FormWrapper title={"Delivery Method"}>
			<div className="flex items-center justify-center mt-3">
				{paymentMethod}
			</div>
			<div>{methodForm}</div>
		</FormWrapper>
	);
};

export default Delivery;

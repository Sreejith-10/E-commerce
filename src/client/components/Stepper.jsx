import React, {useEffect, useState} from "react";
import "/src/App.css";
import {FaCheck} from "react-icons/fa";

const Stepper = ({item}) => {
	const steps = ["Order placed", "Shipped", "Outfordelivery", "Deliverd"];
	const [currentStep, setCurrentStep] = useState(2);
	const [completed, setCompletd] = useState(false);
	useEffect(() => {
		if (item) {
			if (item === "Order placed") {
				setCurrentStep(2);
			} else if (item === "Shipped") {
				setCurrentStep(3);
			} else if (item === "Outfor Delivery") {
				setCurrentStep(4);
			} else if (item === "Deliverd") {
				setCurrentStep(5);
			}
		}
	}, [item]);
	console.log("stepper===>", item);
	return (
		<>
			<div className="w-1/2 h-auto md:w-[99%] lg:mx-auto md:m-0">
				<div className="flex justify-between">
					{steps.map((val, i) => {
						return (
							<div
								key={i}
								className={`step-item ${currentStep === i + 1 && "active"} ${
									i + 1 < currentStep && "completed"
								}`}>
								<div
									className={`step ${currentStep === i + 1 && "active"} ${
										i + 1 < currentStep && "completed"
									}`}>
									{i + 1 < currentStep || completed ? (
										<FaCheck size={18} />
									) : (
										i + 1
									)}
								</div>
								<p className="md:w-[100%] md:h[10%] md:text-sm md:text-ellipsis font-semibold text-slate-700  mt-2 md:flex md:items-center md:justify-center">
									{val}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Stepper;

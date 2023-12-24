import {useState} from "react";

export function useMultiStepForm(steps) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const next = () => {
		setCurrentStepIndex((i) => {
			if (i >= steps.length + 1) i;
			return i + 1;
		});
	};
	const back = () => {
		setCurrentStepIndex((i) => {
			if (i <= 0) return i;
			return i - 1;
		});
	};
	const goTo = (index) => {
		setCurrentStepIndex(index);
	};
	return {
		currentStepIndex,
		setCurrentStepIndex,
		step: steps[currentStepIndex],
		isLastStep: currentStepIndex === steps.length - 1,
		isFirstStep: currentStepIndex === 0,
		steps,
		next,
		back,
		goTo,
	};
}

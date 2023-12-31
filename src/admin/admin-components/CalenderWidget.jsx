import {useState} from "react";
import {Calendar} from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalenderWidget = () => {
	const [value, onChange] = useState(new Date());
	return (
		<div className="w-full h-full">
			<Calendar onChange={onChange} value={value}/>
		</div>
	);
};

export default CalenderWidget;

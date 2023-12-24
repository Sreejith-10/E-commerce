import React from "react";

const FormWrapper = ({title, children}) => {
	return (
		<>
			<h1 className="font-bold text-2xl mb-2 text-blue-500">{title}</h1>
			<div className="w-full h-full">{children}</div>
		</>
	);
};

export default FormWrapper;

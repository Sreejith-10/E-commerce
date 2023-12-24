import { useState } from "react";

export function useNotify() {
	const [showAlert, setShowAlert] = useState(false);
	return [showAlert, setShowAlert];
}

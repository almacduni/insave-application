import { useState, useEffect } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

export const useKeyboard = () => {
	const [height, setHeight] = useState(0);

	const handleKeyboardDidShow = (e: KeyboardEvent) => {
		setHeight(e.endCoordinates.height);
	};

	const handleKeyboardDidHide = () => {
		setHeight(0);
	};

	useEffect(() => {
		const keyboardListenerDidShow = Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow);
		const keyboardListenerDidHide = Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide);

		return () => {
			keyboardListenerDidShow.remove();
			keyboardListenerDidHide.remove();
		};
	}, []);

	return [height];
};

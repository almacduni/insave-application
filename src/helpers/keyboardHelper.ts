import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

export const useKeyboard = (): [number] => {
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	function onKeyboardDidShow (e: KeyboardEvent): void {
		setKeyboardHeight(e.endCoordinates.height);
	}

	function onKeyboardDidHide (): void {
		setKeyboardHeight(0);
	}

	useEffect(() => {
		const keyboardListenerDidShow = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
		const keyboardListenerDidHide = Keyboard.addListener("keyboardDidShow", onKeyboardDidHide);

		return () => {
			keyboardListenerDidShow.remove();
			keyboardListenerDidHide.remove();
		};
	}, []);

	return [keyboardHeight];
};

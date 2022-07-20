import { Animated } from "react-native";

export const runFadeAnimation = (value: Animated.Value) => {
	Animated.loop(
		Animated.sequence([
			Animated.timing(value, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(value, {
				toValue: 0.5,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(value, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
		]),
		{},
	).start();
};

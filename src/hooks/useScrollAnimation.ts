import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { HEIGHT } from "../constants/sizes";

type ScrollAnimationHook = (scrollYPosition: Animated.SharedValue<number>, offsetY?: number) => any;

export const useScrollAnimation: ScrollAnimationHook = (scrollYPosition, offsetY = 0) => {
	const scrollAnimationStyle = useAnimatedStyle(() => {
		const value = scrollYPosition.value > 0 ? 0 : scrollYPosition.value;
		const k = Math.abs(value) / HEIGHT;

		return {
			transform: [
				{
					translateY: offsetY + (k < 0.2 ? -k * 100 : -20),
				},
			],
		};
	});

	return scrollAnimationStyle;
};

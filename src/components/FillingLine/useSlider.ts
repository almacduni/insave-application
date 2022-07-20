import { useSharedValue, useAnimatedStyle, useDerivedValue } from "react-native-reanimated";

export const useSlider = (
	sliderWidth: number,
	knobWidth: number,
	maxRange = 10,
	initialValue = 0,
) => {
	const SLIDER_RANGE = sliderWidth - knobWidth;
	const STEP = SLIDER_RANGE / maxRange ?? 1;

	const translateX = useSharedValue(STEP * initialValue);
	const isSliding = useSharedValue(false);

	const scrollTranslationStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }));

	const progressStyle = useAnimatedStyle(() => ({
		width: translateX.value + knobWidth,
	}));

	const stepText = useDerivedValue(() => {
		const step = Math.ceil(translateX.value / STEP);

		return String(step);
	});

	return {
		values: {
			isSliding,
			translateX,
			stepText,
		},
		styles: {
			scrollTranslationStyle,
			progressStyle,
		},
	};
};

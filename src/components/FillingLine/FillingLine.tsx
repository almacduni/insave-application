import React, { FC, useCallback, useEffect, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, { withTiming, Easing } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { sizeConverter as sz } from "../../helpers/sizeConverter";
import { useSlider } from "./useSlider";

const windowWidth = Dimensions.get("window").width;
const SLIDER_WIDTH = windowWidth - wp("8.52%");
const KNOB_WIDTH = wp("1.06%");
const STEP = 100;
const SLIDER_RANGE = SLIDER_WIDTH - KNOB_WIDTH;

const animationDuration = 450;

function usePrevious (value: any) {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	});

	return ref.current;
}

type PropsType = {
	step: number;
	totalSteps: number;
};
export const FillingLine: FC<PropsType> = ({ step, totalSteps }) => {
	const previousStep = usePrevious(step);
	const {
		values: { translateX, isSliding },
		styles: { progressStyle },
	} = useSlider(SLIDER_WIDTH, KNOB_WIDTH, STEP, STEP / totalSteps);

	const nextStepToggle = useCallback(() => {
		isSliding.value = true;

		translateX.value = withTiming(
			(SLIDER_RANGE / totalSteps) * (step + 1),
			{
				duration: animationDuration,
				easing: Easing.linear,
			},
			() => {
				isSliding.value = false;
			},
		);
	}, [isSliding, step, totalSteps, translateX]);

	const previousStepToggle = useCallback(() => {
		isSliding.value = true;
		translateX.value = withTiming(
			(SLIDER_RANGE / totalSteps) * (step + 1),
			{
				duration: animationDuration,
				easing: Easing.linear,
			},
			() => {
				isSliding.value = false;
			},
		);
	}, [isSliding, step, totalSteps, translateX]);

	useEffect(() => {
		if (previousStep) {
			if (previousStep < step) {
				nextStepToggle();
			}

			if (previousStep > step) {
				previousStepToggle();
			}
		}
	}, [nextStepToggle, previousStep, previousStepToggle, step]);

	return (
		<View style={ styles.slider }>
			<Animated.View style={ [styles.progress, progressStyle] }>
				<View style={ styles.view } />
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	slider: {
		height: KNOB_WIDTH,
		width: SLIDER_WIDTH,
		borderRadius: KNOB_WIDTH / 2,
		backgroundColor: "#F8F8F8",
		justifyContent: "center",
	},
	progress: {
		...StyleSheet.absoluteFillObject,
		// backgroundColor: "#3f51b5",
		borderRadius: KNOB_WIDTH / 2,
	},
	knob: {
		height: KNOB_WIDTH,
		width: KNOB_WIDTH,
		borderRadius: KNOB_WIDTH / 2,
		backgroundColor: "#3f51b5",
		justifyContent: "center",
		alignItems: "center",
	},
	view: {
		backgroundColor: "#566AEC",
		flex: 1,
		width: "100%",
		borderRadius: sz(6),
	},
});

import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Line } from "./Line";
import { VIEWPORT_WIDTH } from "../../../constants/sizes";
import { CrossProps } from "../helpers/Model";

export const Cross: FC<CrossProps> = ({
	opacityLongPress,
	translateXLongPress,
	translateYLongPress,
}) => {
	const horizontal = useAnimatedStyle(() => ({
		opacity: opacityLongPress.value,
		transform: [{ translateY: translateYLongPress.value }],
	}));

	const vertical = useAnimatedStyle(() => ({
		opacity: opacityLongPress.value,
		transform: [{ translateX: translateXLongPress.value }],
	}));

	return (
		<Animated.View style={ [StyleSheet.absoluteFill] }>
			<Animated.View style={ [StyleSheet.absoluteFill, horizontal] }>
				<Line x={ VIEWPORT_WIDTH } y={ 0 } />
			</Animated.View>
			<Animated.View style={ [StyleSheet.absoluteFill, vertical] }>
				<Line x={ 0 } y={ "100%" } />
			</Animated.View>
		</Animated.View>
	);
};

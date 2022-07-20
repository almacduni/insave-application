import React, { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { GraphType } from "../../types/commonTypes";

interface LineProps {
	translationX: Animated.SharedValue<number>;
	isActive: Animated.SharedValue<boolean>;
	graph: GraphType;
}

const WIDTH = wp("0.26%");

const styles = StyleSheet.create({
	line: {
		width: WIDTH,
		backgroundColor: "rgba(37, 37, 37, 0.2)",
		position: "absolute",
		top: -wp("2.66"),
		bottom: 0,
		zIndex: -1,
	},
});

export const Line: FC<LineProps> = ({ translationX, isActive }) => {
	const style = useAnimatedStyle(() => {
		const translateX = translationX.value - WIDTH / 2;

		return {
			transform: [{ translateX }, { scale: withSpring(isActive.value ? 1 : 0) }],
		};
	});

	return <Animated.View style={ [styles.line, style] } />;
};

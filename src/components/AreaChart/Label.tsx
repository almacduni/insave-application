import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { ReText } from "react-native-redash";
import Animated, {
	useDerivedValue,
	interpolate,
	useAnimatedStyle,
	withTiming,
	withSpring,
} from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { GraphType } from "../../types/commonTypes";

interface LabelProps {
	translationX: Animated.SharedValue<number>;
	isActive: Animated.SharedValue<boolean>;
	graph: GraphType;
	size: { width: number; height: number };
}

const WIDTH = wp("26.66%");
const HEIGHT = wp("6.4%");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const styles = StyleSheet.create({
	label: {
		width: WIDTH,
		height: HEIGHT,
		backgroundColor: "rgba(86, 106, 236, 0.1)",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: wp("1.6%"),
		position: "absolute",
		top: -HEIGHT - wp("2.66"),
	},

	labelText: {
		fontSize: wp("3.2%"),
		padding: 0,
	},
});

export const Label: FC<LabelProps> = ({ translationX, isActive, graph, size }) => {
	const date = useDerivedValue(() => {
		const d = interpolate(translationX.value, [0, size.width], [graph.minDate, graph.maxDate]);

		// FIXME:
		new Date(d).getFullYear(), new Date(d).getDate(), MONTHS[new Date(d).getMonth()];

		return `${MONTHS[new Date(d).getMonth()]} ${new Date(d).getDate()}, ${new Date(
			d,
		).getFullYear()}`;
	});
	const style = useAnimatedStyle(() => {
		const translateX = translationX.value - WIDTH / 2;
		const leftSide = translateX <= 0;
		const rightSide = translationX.value + WIDTH / 2 > size.width;

		return {
			transform: [
				{
					translateX: leftSide
						? leftSide
							? withSpring(translationX.value)
							: translateX
						: rightSide
							? withSpring(translateX - WIDTH / 2)
							: translateX,
				},
				{ scale: withTiming(isActive.value ? 1 : 0) },
			],
		};
	});

	return (
		<Animated.View style={ [styles.label, style] }>
			<ReText text={ date } style={ styles.labelText } />
		</Animated.View>
	);
};

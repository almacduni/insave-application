import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import { getYForX } from "react-native-redash";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Label } from "./Label";
import { Line } from "./Line";
import { AreaChartProps } from "./AreaChart";

const CURSOR = wp("4.26%");
const styles = StyleSheet.create({
	cursor: {
		width: CURSOR,
		height: CURSOR,
		borderRadius: CURSOR / 2,
		backgroundColor: "#344CD3",
		borderWidth: 4,
		borderColor: "#fff",
		elevation: 5,
	},
	label: {
		width: 15,
		height: 15,
		backgroundColor: "black",
	},
});

export const Cursor: FC<AreaChartProps> = (props) => {
	const { translation, isActive, graph, size } = props;

	const onGestureEvent = useAnimatedGestureHandler({
		onStart: ({ x }) => {
			translation.x.value = x;
			translation.y.value = getYForX(graph.pathLine, translation.x.value) ?? 0;
		},
		onActive: ({ x }) => {
			if (isActive.value) {
				if (x <= 0 || x >= size.width) return;

				translation.x.value = x;
				translation.y.value = getYForX(graph.pathLine, translation.x.value) ?? 0;
			}
		},
		onEnd: () => {},
	});

	const toggleActive = () => (isActive.value = !isActive.value);

	const style = useAnimatedStyle(() => {
		const translateX = translation.x.value - CURSOR / 2;
		const translateY = translation.y.value - CURSOR / 2;

		return {
			transform: [{ translateX }, { translateY }, { scale: withSpring(+isActive.value) }],
		};
	});

	return (
		<View style={ StyleSheet.absoluteFill }>
			<PanGestureHandler { ...{ onGestureEvent } } onBegan={ toggleActive } onEnded={ toggleActive }>
				<Animated.View style={ StyleSheet.absoluteFill }>
					<Animated.View style={ [styles.cursor, style] } />
					<Label translationX={ translation.x } isActive={ isActive } graph={ graph } size={ size } />
					<Line translationX={ translation.x } isActive={ isActive } graph={ graph } />
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

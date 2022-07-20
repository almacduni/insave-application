import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getYForX, Vector, Path } from "react-native-redash";
import Animated, {
	useSharedValue,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";

interface CursorProps {
	translation: Vector<Animated.SharedValue<number>>;
	path: Path;
}

const CURSOR = wp("4.26%");
const styles = StyleSheet.create({
	cursor: {
		width: CURSOR,
		height: CURSOR,
		borderRadius: CURSOR / 2,
		backgroundColor: "#344CD3",
		borderColor: "#FFF",
		borderWidth: 2,
		elevation: 2,
	},
	cursorBody: {},
});

export const Cursor: React.FC<CursorProps> = ({ translation, path }) => {
	const isActive = useSharedValue(false);
	const onGestureEvent = useAnimatedGestureHandler({
		onStart: () => {
			isActive.value = true;
		},
		onActive: (event) => {
			translation.x.value = event.x;
			// FIXME:
			translation.y.value = getYForX(path, translation.x.value);
		},
		onEnd: () => {
			isActive.value = false;
		},
	});
	const style = useAnimatedStyle(() => {
		const translateX = translation.x.value - CURSOR / 2;
		const translateY = translation.y.value - CURSOR / 2;

		return {
			transform: [{ translateX }, { translateY }, { scale: withSpring(isActive.value ? 1 : 0) }],
		};
	});

	return (
		<View style={ StyleSheet.absoluteFill }>
			<PanGestureHandler { ...{ onGestureEvent } }>
				<Animated.View style={ StyleSheet.absoluteFill }>
					<Animated.View style={ [styles.cursor, style] }>
						<View style={ styles.cursorBody } />
					</Animated.View>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

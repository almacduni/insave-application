import { GestureEvent, GestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

export type OnGestureEvent<T extends GestureHandlerGestureEvent> = (event: T) => void;

export type CheckActiveEventType = ({ nativeEvent }: GestureEvent) => void;

export type GestureValues = {
	zoom: Animated.SharedValue<number>,
	translateX: Animated.SharedValue<number>,
	clampTranslateX: Animated.SharedValue<number>,
	translateXLongPress: Animated.SharedValue<number>,
	translateXLongPressLabel: Animated.SharedValue<number>,
	translateYLongPress: Animated.SharedValue<number>,
	opacityLongPress: Animated.SharedValue<number>,
	candleIndex: Animated.SharedValue<number>,
	candlePositionOnViewportByX: Animated.SharedValue<number>,
	gestureActive: Animated.SharedValue<number>,
	canvasFullWidth: number,
}

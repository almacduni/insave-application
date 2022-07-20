import React, { FC, useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import { clamp } from "react-native-redash";
import Animated, {
	useSharedValue,
	useDerivedValue,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	withDecay,
} from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

import { scale } from "../../helpers/sizeConverter";
import { HEIGHT } from "../../constants/sizes";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { setBeginPosition, setOffsetY } from "../../redux/scrollableSlice";

export const NAV_BAR_HEIGHT = scale(56);
const MAIN_OFFSET_Y = scale(24);
const BORDER_HEIGHT = scale(100);

interface ScrollableProps {
	scrollRef: any;
	children: any;
	beginYPosition?: number;
	height?: number;
	enabled: Animated.SharedValue<boolean>;
	onScroll: (y: number) => void;
	header: any;
}

export const Scrollable: FC<ScrollableProps> = ({
	scrollRef,
	children,
	enabled,
	beginYPosition = 0,
	onScroll,
	header,
	height,
}) => {
	const scrollable = useAppSelector((state) => state.scrollable);
	const dispatch = useAppDispatch();
	const containerRef = useRef<View>(null);
	const beginPYPosition = useSharedValue(scrollable.beginPosition);
	const innerHeight = useSharedValue(height || 0);
	const translateY = useSharedValue(beginYPosition);
	const offsetY = useSharedValue(scrollable.offsetY);

	const onLayout = useCallback(
		({
			nativeEvent: {
				layout: { y },
			},
		}) => {
			if (beginPYPosition.value) offsetY.value = Math.floor(beginPYPosition.value - y);

			if (!beginPYPosition.value) {
				beginPYPosition.value = y;
				dispatch(setBeginPosition(y));
			}
		},
		[],
	);

	const clampTranslateY = useDerivedValue(() => {
		const value = clamp(
			translateY.value,
			-innerHeight.value +
				(HEIGHT - beginPYPosition.value) -
				NAV_BAR_HEIGHT +
				offsetY.value -
				MAIN_OFFSET_Y,
			0,
		);

		onScroll(value);

		return value;
	});

	const clampOuterTranslateY = useDerivedValue(() => clamp(
		translateY.value,
		-HEIGHT + beginPYPosition.value + offsetY.value - MAIN_OFFSET_Y,
		0,
	));

	useEffect(() => {
		dispatch(setOffsetY(offsetY.value));
	}, [offsetY.value]);

	const handler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { beginY: number }>({
		onStart: (_, context) => {
			context.beginY = clampTranslateY.value;
		},
		onActive: (event, context) => {
			if (enabled.value) translateY.value = context.beginY + event.translationY;
			else {
				const positionY = event.absoluteY + translateY.value;

				if (positionY <= translateY.value + BORDER_HEIGHT) {
					translateY.value += 10;
				}
				if (positionY >= translateY.value + HEIGHT - BORDER_HEIGHT) {
					translateY.value -= 10;
				}
			}
		},
		onEnd: (event) => {
			translateY.value = withDecay({ velocity: event.velocityY });
		},
	});

	const innerScrollStyle = useAnimatedStyle(() => ({
		height,
		transform: [
			{
				translateY: clampTranslateY.value - clampOuterTranslateY.value,
			},
		],
	}));

	const outerScrollStyle = useAnimatedStyle(() => ({
		overflow: "hidden",
		transform: [
			{
				translateY: clampOuterTranslateY.value,
			},
		],
	}));

	return (
		<View ref={ containerRef } collapsable={ false } onLayout={ onLayout }>
			<PanGestureHandler ref={ scrollRef } onGestureEvent={ handler }>
				<Animated.View style={ [outerScrollStyle] }>
					{header}
					<Animated.View style={ [innerScrollStyle] }>{children}</Animated.View>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

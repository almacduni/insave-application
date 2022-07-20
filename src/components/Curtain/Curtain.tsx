// FIXME:
/* eslint-disable react/prop-types */
import React, { FC } from "react";
import Animated, {
	Easing,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { WIDTH, HEIGHT } from "../../constants/sizes";
import { sc } from "../../helpers/sizeConverter";
import { Handle } from "./Handle";

const HANDLE_SIZE = sc(20);

export enum Direction {
	TO_TOP = HEIGHT - HANDLE_SIZE,
	TO_BOTTOM = -HEIGHT + HANDLE_SIZE,
	TO_LEFT = WIDTH - HANDLE_SIZE,
	TO_RIGHT = -WIDTH + HANDLE_SIZE,
}

const whichAxis = (direction: Direction) => {
	const byY = [Direction.TO_BOTTOM, Direction.TO_TOP].includes(direction);
	const byX = [Direction.TO_LEFT, Direction.TO_RIGHT].includes(direction);

	return { byX, byY };
};

export const withCurtain = (Component: FC<any>) => ({
	// simultaneousHandlers = [],
	direction = Direction.TO_BOTTOM,
	openingBorder = 40,
	scrollY = { value: 0 },
	beginOffset = 0,
	...rest
}) => {
	const { byX, byY } = whichAxis(direction);
	const baseSize = byY ? HEIGHT : WIDTH;
	const isOpen = useSharedValue(false);
	const translate = useSharedValue(direction + beginOffset);
	const scrollStyle = useScrollAnimation(scrollY, -HEIGHT + 20);

	const progress = useDerivedValue(() => translate.value / baseSize);
	const clampedTranslate = useDerivedValue(() => Math.max(Math.min(translate.value, 0), direction + beginOffset));

	const handleSlide = useAnimatedGestureHandler<
	PanGestureHandlerGestureEvent,
	{ beginPosition: number }
	>({
		onStart: (_, context) => {
			context.beginPosition = clampedTranslate.value;
		},
		onActive: (event, context) => {
			if (byY) translate.value = event.translationY + context.beginPosition;

			if (byX) translate.value = event.translationX + context.beginPosition;
		},
		onEnd: () => {
			const border = isOpen.value ? openingBorder : 100 - openingBorder;

			if ((border / 100) * baseSize > Math.abs(translate.value)) {
				translate.value = withTiming(0, { easing: Easing.linear });
				isOpen.value = true;
			} else {
				translate.value = withTiming(direction + beginOffset, { easing: Easing.linear });
				isOpen.value = false;
			}
		},
	});

	const styles = useAnimatedStyle((): any => {
		const style = {
			position: "absolute",
			height: HEIGHT,
			transform: [
				{
					translateY: byY ? clampedTranslate.value : 0,
				},
				{
					translateX: byX ? clampedTranslate.value : 0,
				},
			],
			zIndex: 1000,
		};

		return style;
	});

	return (
		<PanGestureHandler onGestureEvent={ handleSlide }>
			<Animated.View style={ [styles, scrollStyle] }>
				<Handle { ...{ direction } } />
				<Component { ...rest } progress={ progress } />
			</Animated.View>
		</PanGestureHandler>
	);
};

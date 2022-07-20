import { clamp } from "react-native-redash";
import {
	State,
	GestureEvent,
	PanGestureHandlerGestureEvent,
	LongPressGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { useAnimatedGestureHandler, withDecay } from "react-native-reanimated";

import { GestureValues } from "../model";
import { CandleType } from "../../../types/commonTypes";
import { CANDLE_WIDTH, CHART_HEIGHT, VIEWPORT_WIDTH } from "../../../constants/sizes";

export enum LabelBorders {
	LEFT = 52,
	RIGHT = 308,
}

export enum AutoScrollArea {
	LEFT = 35,
	RIGHT = 300,
}

export const AUTO_SCROLL_STEP = 15;

type GestureHandlersParams = GestureValues & {
	candleData: CandleType[],
	initialDomain: [number, number],
};

export const useGestureHandlers = (params: GestureHandlersParams) => {
	const {
		candleData,
		canvasFullWidth,
		zoom,
		translateX,
		clampTranslateX,
		translateXLongPress,
		translateXLongPressLabel,
		translateYLongPress,
		opacityLongPress,
		candleIndex,
		candlePositionOnViewportByX,
		gestureActive,
	} = params;

	const handleSlide = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startX: number }>({
		onStart: (_, ctx) => {
			ctx.startX = clampTranslateX.value;
		},
		onActive: (event, ctx) => {
			translateX.value = event.translationX + ctx.startX;
		},
		onEnd: (event) => {
			translateX.value = withDecay({ velocity: event.velocityX });
		},
	});

	const onGestureEventPanLongPress = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
		onStart: () => {
			console.log(candlePositionOnViewportByX.value);
		},
		onActive: ({ x, y }) => {
			const candle = Math.floor((x - clampTranslateX.value) / (CANDLE_WIDTH * zoom.value));

			if (candleData[candle]) {
				if (candle !== candleIndex.value) {
					candlePositionOnViewportByX.value =
						candle * CANDLE_WIDTH * zoom.value + clampTranslateX.value;
					candleIndex.value = candle;
				}

				const crossPosition = clamp(
					candlePositionOnViewportByX.value + (CANDLE_WIDTH * zoom.value) / 2,
					0,
					VIEWPORT_WIDTH,
				);

				opacityLongPress.value = 1;
				translateYLongPress.value = clamp(y, 0, CHART_HEIGHT);
				translateXLongPress.value = crossPosition;
				if (x > LabelBorders.LEFT && x < LabelBorders.RIGHT)
					translateXLongPressLabel.value = crossPosition;

				if (x < 0 && x > VIEWPORT_WIDTH) opacityLongPress.value = 0;
			}
			if (x <= AutoScrollArea.LEFT && clampTranslateX.value <= 0) {
				translateX.value += AUTO_SCROLL_STEP;
			}
			if (
				x > AutoScrollArea.RIGHT &&
				clampTranslateX.value >= -canvasFullWidth * zoom.value + VIEWPORT_WIDTH
			) {
				translateX.value -= AUTO_SCROLL_STEP;
			}
		},
		onEnd: () => {
			opacityLongPress.value = 0;
		},
	});

	const onLongPress = ({
		nativeEvent,
	}: GestureEvent<LongPressGestureHandlerEventPayload>): void => {
		const candle = Math.floor((nativeEvent.x - clampTranslateX.value) / (CANDLE_WIDTH * zoom.value));

		if (candleData[candle]) {
			if (candle !== candleIndex.value) {
				candlePositionOnViewportByX.value =
					candle * CANDLE_WIDTH * zoom.value + clampTranslateX.value;
				candleIndex.value = candle;
			}

			translateXLongPress.value = clamp(
				candlePositionOnViewportByX.value + (CANDLE_WIDTH * zoom.value) / 2,
				0,
				VIEWPORT_WIDTH,
			);

			translateXLongPressLabel.value = clamp(
				candlePositionOnViewportByX.value + (CANDLE_WIDTH * zoom.value) / 2,
				0,
				VIEWPORT_WIDTH,
			);
			if (nativeEvent.state === State.ACTIVE) {
				translateYLongPress.value = clamp(nativeEvent.y, 0, CHART_HEIGHT);

				opacityLongPress.value = 1;
			}
			if (nativeEvent.x <= AutoScrollArea.LEFT && clampTranslateX.value <= 0) {
				translateX.value += AUTO_SCROLL_STEP;
			}
			if (
				nativeEvent.x > AutoScrollArea.RIGHT &&
				clampTranslateX.value >= -canvasFullWidth * zoom.value + VIEWPORT_WIDTH
			) {
				translateX.value -= AUTO_SCROLL_STEP;
			}
			if (nativeEvent.state === State.END || nativeEvent.state === State.FAILED) {
				opacityLongPress.value = 0;
			}
		}
	};

	const checkActiveEvent = ({ nativeEvent }: GestureEvent): void => {
		if (nativeEvent.state === State.ACTIVE) {
			gestureActive.value = 1;
		}
		if (nativeEvent.state === State.END) {
			gestureActive.value = 0;
		}
	};

	return {
		handleSlide,
		onGestureEventPanLongPress,
		onLongPress,
		checkActiveEvent,
	};
};

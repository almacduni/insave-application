import {
	GestureEvent,
	LongPressGestureHandlerEventPayload,
	PanGestureHandlerGestureEvent,
	State,
} from "react-native-gesture-handler";
import {
	useAnimatedGestureHandler,
	useDerivedValue,
	useSharedValue,
	withDecay,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";
import { useEffect, useState } from "react";

import { getVisibleCandlesRange, getVisibleCandles, getDomain } from "./hookHelpers";
import { scaleY as scaleCandleY } from "./candleHelpers";
import { ControlledValuesHook, TranslateContext, Adaptation, AUTO_SCROLL_STEP, LabelBorders, AutoScrollArea } from "./Model";
import { VIEWPORT_WIDTH, CHART_HEIGHT } from "../../../constants/sizes";
import { configureDate } from "./dateHelpers";

export const useControlledValues: ControlledValuesHook = (params) => {
	const { data, candleWidth, initialDomain, timeFrame } = params;
	const fullWidth = data.length * candleWidth;
	// PAN PINCH
	const zoom = useSharedValue(1.5);
	const [visibleData, setVisibleData] = useState<any>([]);

	useEffect(() => {
		setVisibleData(
			configureDate({
				sourceData: data,
				zoom,
				timeFrame,
				candleWidth,
			}),
		);
	}, [candleWidth, data, timeFrame, zoom]);

	const focalX = useSharedValue(0);
	const isPinch = useSharedValue(false);
	const translateX = useSharedValue(-fullWidth * zoom.value + VIEWPORT_WIDTH - 200);
	const isAfterPinch = useSharedValue(1);

	const clampTranslateX = useDerivedValue(() =>
		clamp(translateX.value, -fullWidth * zoom.value + VIEWPORT_WIDTH - 200, 200),
	);

	const handleSlide = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, TranslateContext>({
		onStart: (_, ctx) => {
			ctx.startX = clampTranslateX.value;
		},
		onActive: (event, ctx) => {
			if (isAfterPinch.value) {
				ctx.startX = translateX.value - event.translationX;
				isAfterPinch.value = 0;
			}
			if (!isPinch.value && event.numberOfPointers === 1) {
				translateX.value = event.translationX + ctx.startX;
			}
		},
		onEnd: (event) => {
			translateX.value = withDecay({ velocity: event.velocityX });
		},
	});

	const range = useDerivedValue<[number, number]>(() => getVisibleCandlesRange({
		length: data.length,
		width: VIEWPORT_WIDTH,
		currentPosition: clampTranslateX.value,
		candleWidth: candleWidth * zoom.value,
		zoom: zoom.value,
		zoomOffset: 0,
		zoomOffsetX: 0,
		focalX: focalX.value,
	}));

	const domain = useDerivedValue<[number, number]>(() => {
		const visibleCandles = getVisibleCandles(data, range.value);

		return getDomain(visibleCandles);
	});

	const adaptation = useDerivedValue<Adaptation>(() => {
		if (!initialDomain[0] && !initialDomain[1]) {
			return { scaleY: 0, offsetByY: 0 };
		}
		const normalizedDomainMin = scaleCandleY(domain.value[1], initialDomain);
		const normalizedDomainMax = scaleCandleY(domain.value[0], initialDomain);
		const scaleY = CHART_HEIGHT / (normalizedDomainMax - normalizedDomainMin);
		const offsetByY = -normalizedDomainMin * scaleY;

		return { scaleY, offsetByY };
	});

	// LONG TAP
	const translateXLongPress = useSharedValue(0);
	const translateXLongPressLabel = useSharedValue(0);
	const translateYLongPress = useSharedValue(0);
	const opacityLongPress = useSharedValue(0);
	const candleIndex = useSharedValue(0);
	const candlePositionOnViewportByX = useSharedValue(0);
	const gestureActive = useSharedValue(0);

	const onGestureEventPanLongPress = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
		onStart: () => {
			// console.log(candlePositionOnViewportByX.value);
		},
		onActive: ({ x, y }) => {
			const candle = Math.floor((x - clampTranslateX.value) / (candleWidth * zoom.value));

			if (data[candle]) {
				if (candle !== candleIndex.value) {
					candlePositionOnViewportByX.value =
						candle * candleWidth * zoom.value + clampTranslateX.value;
					candleIndex.value = candle;
				}

				const crossPosition = clamp(
					candlePositionOnViewportByX.value + (candleWidth * zoom.value) / 2,
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
				clampTranslateX.value >= -fullWidth * zoom.value + VIEWPORT_WIDTH
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
		const candle = Math.floor((nativeEvent.x - clampTranslateX.value) / (candleWidth * zoom.value));

		if (data[candle]) {
			if (candle !== candleIndex.value) {
				candlePositionOnViewportByX.value =
					candle * candleWidth * zoom.value + clampTranslateX.value;
				candleIndex.value = candle;
			}

			translateXLongPress.value = clamp(
				candlePositionOnViewportByX.value + (candleWidth * zoom.value) / 2,
				0,
				VIEWPORT_WIDTH,
			);

			translateXLongPressLabel.value = clamp(
				candlePositionOnViewportByX.value + (candleWidth * zoom.value) / 2,
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
				clampTranslateX.value >= -fullWidth * zoom.value + VIEWPORT_WIDTH
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
		panPinch: {
			translateX: clampTranslateX,
			adaptation,
			scaleX: zoom,
			handleSlide,
		},

		longTap: {
			candleIndex,
			translateXLongPress,
			translateXLongPressLabel,
			translateYLongPress,
			range,
			opacityLongPress,
			gestureActive,
			onGestureEventPanLongPress,
			onLongPress,
			checkActiveEvent,
		},
		visibleData,
	};
};

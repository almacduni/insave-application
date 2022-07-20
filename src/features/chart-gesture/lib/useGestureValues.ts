import { clamp } from "react-native-redash";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

import { GestureValues } from "../model";
import { CandleType } from "../../../types/commonTypes";
import { VIEWPORT_WIDTH, CANDLE_WIDTH, CHART_BORDER_WIDTH } from "../../../constants/sizes";

interface GestureValuesParams {
	candleData: CandleType[],
}

export const useGestureValues = (params: GestureValuesParams): GestureValues => {
	const { candleData } = params;
	const canvasFullWidth = candleData.length * CANDLE_WIDTH;

	const zoom = useSharedValue(1.5);
	const translateX = useSharedValue(-canvasFullWidth * zoom.value + VIEWPORT_WIDTH - CHART_BORDER_WIDTH);

	const clampTranslateX = useDerivedValue(() =>
		clamp(translateX.value, -canvasFullWidth * zoom.value + VIEWPORT_WIDTH - CHART_BORDER_WIDTH, CHART_BORDER_WIDTH),
	);

	const translateXLongPress = useSharedValue(0);
	const translateXLongPressLabel = useSharedValue(0);
	const translateYLongPress = useSharedValue(0);
	const opacityLongPress = useSharedValue(0);
	const candleIndex = useSharedValue(0);
	const candlePositionOnViewportByX = useSharedValue(0);
	const gestureActive = useSharedValue(0);

	return {
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
		canvasFullWidth,
	};
};

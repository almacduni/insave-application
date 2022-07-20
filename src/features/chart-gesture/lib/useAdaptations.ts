import Animated, { useDerivedValue } from "react-native-reanimated";

import { CandleType } from "../../../types/commonTypes";
import { scaleY as scaleCandleY } from "./candleHelpers";
import { getDomain, getVisibleCandles, getVisibleCandlesRange } from "./hookHelpers";
import { CANDLE_WIDTH, CHART_HEIGHT, VIEWPORT_WIDTH } from "../../../constants/sizes";

type AdaptationsHookParams = {
	candleData: CandleType[],
	initialDomain: [number, number],
	zoom: Animated.SharedValue<number>,
	clampTranslateX: Animated.SharedValue<number>,
};

export const useAdaptations = (params: AdaptationsHookParams) => {
	const {
		candleData,
		zoom,
		initialDomain,
		clampTranslateX
	} = params;

	const range = useDerivedValue<[number, number]>(() => getVisibleCandlesRange({
		length: candleData.length,
		width: VIEWPORT_WIDTH,
		currentPosition: clampTranslateX.value,
		candleWidth: CANDLE_WIDTH * zoom.value,
	}));

	const domain = useDerivedValue<[number, number]>(() => {
		const visibleCandles = getVisibleCandles(candleData, range.value);

		return getDomain(visibleCandles);
	});

	const adaptation = useDerivedValue<{ scaleY: number, offsetByY: number }>(() => {
		if (!initialDomain[0] && !initialDomain[1]) {
			return { scaleY: 0, offsetByY: 0 };
		}
		const normalizedDomainMin = scaleCandleY(domain.value[1], initialDomain);
		const normalizedDomainMax = scaleCandleY(domain.value[0], initialDomain);
		const scaleY = CHART_HEIGHT / (normalizedDomainMax - normalizedDomainMin);
		const offsetByY = -normalizedDomainMin * scaleY;

		return { scaleY, offsetByY };
	});

	return adaptation;
};

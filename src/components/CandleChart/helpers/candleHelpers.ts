import { interpolate } from "react-native-reanimated";

import { sc } from "../../../helpers/sizeConverter";
import { CandleType } from "../../../types/commonTypes";
import { CHART_HEIGHT } from "../../../constants/sizes";

export const CANDLES_PER_VIEWPORT = 67;
export const CANDLE_PADDING = sc(1.39);
export const CANDLE_WIDTH = sc(6.53);

export const scaleY = (value: number, DOMAIN: [number, number]) => {
	"worklet";

	return interpolate(value, DOMAIN, [CHART_HEIGHT, 0]);
};

export const scaleBody = (value: number, DOMAIN: [number, number]) => {
	"worklet";

	return interpolate(value, [0, Math.max(...DOMAIN) - Math.min(...DOMAIN)], [0, CHART_HEIGHT]);
};

export const getDomain = (rows: CandleType[]): [number, number] => {
	"worklet";
	const values = rows.map(({ high, low }) => [high, low]).flat();

	return [Math.min(...values), Math.max(...values)];
};

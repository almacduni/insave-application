type Range = [number, number];

interface Data {
	high: number;
	open: number;
	close: number;
	low: number;
}

export interface CandleData extends Data {
	volume: number;
	date: string;
}

export interface CurrentPositionData {
	currentPosition: number;
	candleWidth: number;
	width: number;
	length: number;
}

const divide = (a: number, b: number): number => {
	"worklet";
	if (a > b) {
		return Math.floor(a / b);
	}

	return Math.ceil(a / b);
};

export const getVisibleCandlesRange = (props: CurrentPositionData): Range => {
	"worklet";
	const { width, currentPosition, candleWidth, length } = props;
	const pos = currentPosition > 0 ? 0 : Math.abs(currentPosition);
	const candleSize = candleWidth;
	const firstElement = divide(pos, candleSize);
	const lastElement = divide(pos === 0 ? width - currentPosition : pos + width, candleSize);

	return [firstElement, lastElement > length ? length : lastElement + 1];
};

export const getVisibleCandles = (candles: CandleData[], range: Range): CandleData[] => {
	"worklet";

	return candles.slice(...range);
};

export const getDomain = (candles: CandleData[]): Range => {
	"worklet";
	const elements = candles.map(({ high, low }) => [high, low]).flat();

	return [Math.min(...elements), Math.max(...elements)];
};


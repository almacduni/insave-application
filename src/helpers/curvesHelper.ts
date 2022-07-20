// FIXME:
import { scaleLinear } from "d3-scale";

import { CandleType } from "../types/commonTypes";
import { Curve } from "../components/CandleChart/helpers/Model";
import { buildGraph } from "../components/AreaChart/Model";
import { getDomain } from "../components/CandleChart/helpers/candleHelpers";
import { CANDLE_WIDTH } from "../constants/sizes";

type IndicatorData = { price: number; date: string };

type ProcessDataType = (args: {
	chartData: CandleType[];
	indicatorData: number[];
	width: number;
	height: number;
	priceDomain?: [number, number];
}) => Curve[];

export const calculateSimpleCurves: ProcessDataType = ({
	chartData,
	indicatorData,
	height,
	width,
	priceDomain,
}) => {
	if (!indicatorData.length) return [];

	let firstNotZero = 0;

	for (const price of indicatorData) {
		if (price > 0) {
			firstNotZero = price;
			break;
		}
	}

	const priceDateList: IndicatorData[] = chartData.reduce(
		(prevData: IndicatorData[], curData: CandleType, index: number): IndicatorData[] => [
			...prevData,
			{ price: +indicatorData[index] || +firstNotZero, date: curData.date },
		],
		[],
	);

	const graph = buildGraph(
		priceDateList,
		{
			width,
			height,
		},
		priceDomain,
	);

	const curves = graph?.pathLine.curves.filter((_, index) => indicatorData[index] !== 0) || [];

	return curves;
};

export const normalizeIndicatorData = (prices: number[]) =>
	prices.filter((price: number) => +price);

export const convertToPath = (curves: Curve[], beginPoint?: string) => {
	if (!curves.length) return "M 0 0";
	const resultPath = curves.reduce((prev: string, curve: Curve) => `
		${prev}
		C
		${curve.c1.x} ${curve.c1.y}
		${curve.c2.x} ${curve.c2.y}
		${curve.to.x} ${curve.to.y}
	`, beginPoint || `M ${curves[0].c1.x} ${curves[0].c1.y}`);

	return resultPath;
};

export const getSimpleSvgPath = (data: any, beginPoint?: string) => {
	const curves = calculateSimpleCurves(data);
	const svgPath = convertToPath(curves, beginPoint);

	return { d: svgPath };
};

export const getRSISvgPath = getSimpleSvgPath;
export const getEMASvgPath = (data: any) => getSimpleSvgPath({ ...data, priceDomain: getDomain(data.chartData) });

export const getMACDSvgPath = (data: any) => {
	const { macd, signal } = data.indicatorData;

	const curvesMacd = getSimpleSvgPath({ ...data, indicatorData: macd });
	const curvesSignal = getSimpleSvgPath({ ...data, indicatorData: signal });

	const bars = getBarGraph(
		signal.map((item: number, index: number) => macd[index] - item),
		data.height,
	);

	return {
		d: "",
		macd: curvesMacd.d,
		signal: curvesSignal.d,
		bars,
	};
};

export const getBarGraph = (prices: number[], height: number) => {
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);
	const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([height, 0]);
	const barGraphPositions = prices.reduce((prev: Bar[], price: number, index: number): Bar[] => [
		...prev,
		{
			x: index * CANDLE_WIDTH,
			y: scaleY(price),
			fill: index > 0 && prices[index - 1] > price ? BarColor.MORE : BarColor.SMALLER,
		},
	], []);

	return barGraphPositions.filter((_, index) => prices[index] !== 0);
};

export interface Bar {
	x: number;
	y: number;
	fill: string;
}

export enum BarColor {
	MORE = "rgba(58, 134, 255, 1)",
	SMALLER = "rgba(58, 134, 255, 0.2)",
}

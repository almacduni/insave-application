import { NameTimeFrame, NameTimeFrame } from "../../../components/CandleChart/helpers/dateHelpers";
import { Indicators } from "../../../types/commonTypes";

export const indicatorsList = [
	{
		name: Indicators.EMA,
		value: "EMA",
	},
	// {
	// 	name: Indicators.MACD,
	// 	value: "MACD",
	// },
	{
		name: Indicators.RSI,
		value: "RSI",
	},
	// {
	// 	name: Indicators.OBV,
	// 	value: "OBV",
	// },
	// {
	// 	name: Indicators.ADX,
	// 	value: "ADX",
	// },
	// {
	// 	name: Indicators.TEMA,
	// 	value: "TEMA",
	// },
	// {
	// 	name: Indicators.GMMA,
	// 	value: "GMMA",
	// },

	{
		name: Indicators.BB,
		value: "BB",
	},
];

export const timeFramesButtonArray = [
	{ name: "5M", value: NameTimeFrame.FIVE_MINUTES },
	{ name: "30M", value: NameTimeFrame.THIRTY_MINUTES },
	{ name: "1H", value: NameTimeFrame.ONE_HOUR },
	{ name: "4H", value: NameTimeFrame.FOUR_HOUR },
	{ name: "1D", value: NameTimeFrame.ONE_DAY },
	{ name: "1W", value: NameTimeFrame.ONE_WEEK },
];

export const drawingToolsList = [
	{
		name: "Trendline",
		value: "trendline",
	},
	{
		name: "Fib Retracement",
		value: "fibRetracement",
	},
	{
		name: "Rectangle",
		value: "rectangle",
	},
	{
		name: "Brush",
		value: "brush",
	},
	{
		name: "Elliot wave",
		value: "elliotWave",
	},
	{
		name: "Triangle",
		value: "triangle",
	},
	{
		name: "Ellipse",
		value: "ellipse",
	},
];

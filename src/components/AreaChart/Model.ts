// FIXME:
import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import { parse } from "react-native-redash";
import moment from "moment";

import { CompanyHistoricalDataType } from "../../types/commonTypes";

export const buildGraph = (
	historical: CompanyHistoricalDataType[] | { date: string; price: number }[],
	size: { width: number; height: number },
	priceDomain?: [number, number],
) => {
	try {
		const getPriceKey = (obj: any) => Object.keys(obj)
			.filter((key) => key !== "date")
			.join();

		const formattedValues = historical.map((history: any) => [history[getPriceKey(history)], moment(history.date).valueOf()] as [number, number]);

		const prices = formattedValues.map((value: [number, number]) => value[0]);
		const dates = formattedValues.map((value: [number, number]) => value[1]);
		const minDate = Math.min(...dates);
		const maxDate = Math.max(...dates);
		const minPrice = priceDomain?.length ? priceDomain[0] : Math.min(...prices);
		const maxPrice = priceDomain?.length ? priceDomain[1] : Math.max(...prices);

		const scaleX = scaleLinear().domain([minDate, maxDate]).range([0, size.width]);
		const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([size.height, 0]);

		const pathArea = parse(
			shape
				.area()
				.x(([, x]) => scaleX(x) as number)
				.y0(size.height)
				.y1(([y]) => scaleY(y) as number)
				.curve(shape.curveBasis)(formattedValues) as string,
		);

		const pathLine = parse(
			shape
				.line()
				.x(([, x]) => scaleX(x) as number)
				.y(([y]) => scaleY(y) as number)
				.curve(shape.curveBasis)(formattedValues) as string,
		);

		return {
			pathArea,
			pathLine,
			minDate,
			maxDate,
			minPrice,
			maxPrice,
		};
	} catch (e) {
		console.error("Model buildGraph: ", e);
	}
};

const vWidth = 310;
const vHeight = 100;

export const createSize = (width: number) => ({
	width,
	height: (width * vHeight) / vWidth,
});

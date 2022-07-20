// FIXME:
/* eslint-disable react/prop-types */
import React, { FC, useEffect, useState } from "react";

import { IndicatorsAPI } from "../../../api/indicators-api";
import { CANDLE_WIDTH } from "../../../constants/sizes";
import { useAppSelector } from "../../../hooks/useRedux";
import { CandleType, Indicators } from "../../../types/commonTypes";
import { IndicatorComponentProps } from "./withIndicatorWrapper";

export const withIndicatorData: WithIndicatorDataType = ({
	Visualizer,
	convertDataToSvgPath,
	indicatorName,
}) => (props) => {
	const [svgPath, setSvgPath] = useState({ d: "" });
	const {
		chartData = [],
		currentInfo: { ticker },
		timeFrame,
	} = useAppSelector((state) => state.chart);

	const width = (chartData?.length ?? 0) * CANDLE_WIDTH * props.scaleX.value;

	useEffect(() => {
		IndicatorsAPI[`get${indicatorName}`](ticker, timeFrame).then((data: any) => {
			setSvgPath(
				convertDataToSvgPath({
					chartData: chartData || [],
					indicatorData: data,
					width,
					height: props.height,
					priceDomain: props.domain,
				}),
			);
		});
	}, [chartData, props.domain, props.height, ticker, timeFrame, width]);

	return <Visualizer width={ width } height={ props.height } path={ svgPath } />;
};

export interface VisualizerProps {
	width: number;
	height: number;
	path: any;
}

type WithIndicatorDataType = (args: {
	Visualizer: FC<VisualizerProps>;
	convertDataToSvgPath: (args: {
		chartData: CandleType[];
		indicatorData: any;
		width: number;
		height: number;
		priceDomain: [number, number] | undefined;
	}) => any;
	indicatorName: Indicators;
}) => FC<IndicatorComponentProps>;

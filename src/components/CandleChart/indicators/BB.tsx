import React, { FC } from "react";
import { Path } from "react-native-svg";

import { VisualizerProps, withIndicatorData } from "./withIndicatorData";
import {
	getSimpleSvgPath,
	calculateSimpleCurves,
	convertToPath,
} from "../../../helpers/curvesHelper";
import { Indicators } from "../../../types/commonTypes";

const getLowerAreaPath = (data: any) => {
	const lowerCurves = calculateSimpleCurves({
		...data,
		indicatorData: data.indicatorData.lower,
	});
	const swappedCurves = lowerCurves
		.reverse()
		.map((curve) => ({ ...curve, c1: curve.c2, c2: curve.c1 }));

	const lowerAreaBeginPoint = " ";
	const areaLower = convertToPath(swappedCurves, lowerAreaBeginPoint);

	return areaLower;
};

const convertDataToSvgPath = (data: any) => {
	const line = getSimpleSvgPath({ ...data, indicatorData: data.indicatorData.basis });

	const areaUpper = getSimpleSvgPath({ ...data, indicatorData: data.indicatorData.upper });
	const areaLower = getLowerAreaPath(data);

	return {
		...line,
		area: `${areaUpper.d} ${areaLower}z `,
	};
};

const Visualizer: FC<VisualizerProps> = ({ path }) => (
	<>
		<Path d={ path.d } stroke="#3A86FF" strokeWidth={ 1.3 } vectorEffect="non-scaling-stroke" />
		{path.area && (
			<Path
				d={ path.area }
				fill="rgba(58, 134, 255, 0.1)"
				fillRule="evenodd"
				vectorEffect="non-scaling-stroke"
			/>
		)}
	</>
);

export const BB = withIndicatorData({
	Visualizer,
	convertDataToSvgPath,
	indicatorName: Indicators.BB,
});

import React, { FC } from "react";
import { Path } from "react-native-svg";

import { getEMASvgPath } from "../../../helpers/curvesHelper";
import { verticalScale } from "../../../helpers/sizeConverter";
import { VisualizerProps, withIndicatorData } from "./withIndicatorData";
import { Indicators } from "../../../types/commonTypes";

export const IndicatorIndent = {
	TOP: verticalScale(12),
};

const Visualizer: FC<VisualizerProps> = ({ path }) => <Path d={ path.d } strokeWidth={ 1.3 } stroke={ "#3A86FF" } vectorEffect="non-scaling-stroke" />;

export const EMA = withIndicatorData({
	Visualizer,
	convertDataToSvgPath: getEMASvgPath,
	indicatorName: Indicators.EMA,
});

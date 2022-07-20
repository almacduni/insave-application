import React, { FC } from "react";
import styled from "styled-components/native";
import Svg, { Path } from "react-native-svg";

import { getRSISvgPath } from "../../../helpers/curvesHelper";
import { verticalScale } from "../../../helpers/sizeConverter";
import { VisualizerProps, withIndicatorData } from "./withIndicatorData";
import { Indicators } from "../../../types/commonTypes";

export const IndicatorIndent = {
	TOP: verticalScale(12),
};

const Visualizer: FC<VisualizerProps> = ({ width, height, path }) => (
	<Wrapper indentTop={ IndicatorIndent.TOP } width={ width }>
		<Svg
			width={ width }
			height={ height }
			style={ {
				backgroundColor: "rgba(58, 134, 255, 0.1)",
			} }
		>
			<Path d={ path.d } strokeWidth={ 1.3 } stroke={ "#3A86FF" } />
		</Svg>
	</Wrapper>
);

export const RSI = withIndicatorData({
	Visualizer,
	convertDataToSvgPath: getRSISvgPath,
	indicatorName: Indicators.RSI,
});

const Wrapper = styled.View<{ indentTop: number; width: number }>`
	width: ${({ width }) => width}px;
	margin-top: ${({ indentTop }) => indentTop}px;
	padding-top: ${({ indentTop }) => indentTop}px;
	margin-bottom: ${verticalScale(32)}px;
	border-top-width: 1;
	border-top-color: "rgba(17, 3, 32, 0.05)";
`;

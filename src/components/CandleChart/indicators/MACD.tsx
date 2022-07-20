import React, { FC } from "react";
import styled from "styled-components/native";
import Svg, { Path, Rect } from "react-native-svg";

import { Bar, getMACDSvgPath } from "../../../helpers/curvesHelper";
import { verticalScale } from "../../../helpers/sizeConverter";
import { VisualizerProps, withIndicatorData } from "./withIndicatorData";
import { Indicators } from "../../../types/commonTypes";
import { IndicatorIndent } from "./RSI";
import { CANDLE_WIDTH } from "../../../constants/sizes";

const Visualizer: FC<VisualizerProps> = ({ width, height, path }) => (
	<Wrapper indentTop={ IndicatorIndent.TOP } width={ width }>
		<Svg width={ width } height={ height }>
			{path.bars?.map((bar: Bar, index: number) => (
				<Rect
					x={ bar.x * 1.5 + 1 }
					y={ bar.y > height / 2 ? height / 2 : bar.y }
					width={ CANDLE_WIDTH * 1.5 - 2 }
					height={ Math.abs(height / 2 - bar.y) }
					fill={ bar.fill }
					key={ index }
				/>
			))}
			{path?.macd && <Path d={ path.macd } strokeWidth={ 1.3 } stroke={ "#FFBE0B" } />}
			{path?.signal && <Path d={ path.signal } strokeWidth={ 1.3 } stroke={ "#FB5607" } />}
		</Svg>
	</Wrapper>
);

export const MACD = withIndicatorData({
	Visualizer,
	convertDataToSvgPath: getMACDSvgPath,
	indicatorName: Indicators.MACD,
});

const Wrapper = styled.View<{ indentTop: number; width: number }>`
	width: ${({ width }) => width}px;
	margin-top: ${({ indentTop }) => indentTop}px;
	padding-top: ${({ indentTop }) => indentTop}px;
	margin-bottom: ${verticalScale(32)}px;
	border-top-width: 1;
	border-top-color: "rgba(17, 3, 32, 0.05)";
`;

// FIXME:
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Fragment, FC } from "react";
import Animated from "react-native-reanimated";

import { useAppSelector } from "../../../hooks/useRedux";

export interface IndicatorComponentProps {
	scaleX: Animated.SharedValue<number>;
	height: number;
	indicator: string;
	domain?: [number, number];
}

type WithIndicatorWrapperType = (args: {
	Wrapper?: FC<any>;
	indicators: {
		[key: string]: FC<IndicatorComponentProps>;
	};
}) => FC<{ scaleX: Animated.SharedValue<number>; height: number; domain: [number, number] }>;

export const withIndicatorWrapper: WithIndicatorWrapperType = ({
	Wrapper = Fragment,
	indicators,
}) => (props) => {
	const activeIndicator = useAppSelector((state) => state.chart.activeIndicator);

	if (!activeIndicator) return <></>;

	const Indicator = indicators[activeIndicator];

	if (!Indicator) return <></>;

	return (
		<Wrapper { ...props }>
			<Indicator
				scaleX={ props.scaleX }
				height={ props.height }
				indicator={ activeIndicator }
				domain={ props.domain }
			/>
		</Wrapper>
	);
};

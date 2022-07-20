import React, { FC } from "react";
import { G } from "react-native-svg";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { CanvasControlledValuesProps } from "./helpers/Model";
import { Candle } from "./Candles/Candle";
import { CANDLE_WIDTH, CHART_HEIGHT } from "../../constants/sizes";
import { InnerIndicator } from "./indicators/InnerIndicator";

const AnimatedGroup: any = Animated.createAnimatedComponent(G);

export const Canvas: FC<CanvasControlledValuesProps> = ({
	translateX,
	data,
	initialDomain,
	adaptation,
	scaleX,
}) => {
	const style = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: adaptation.value.offsetByY,
			},
			{
				scaleY: adaptation.value.scaleY,
			},
			{
				translateX: translateX.value,
			},
			{
				scaleX: scaleX.value,
			},
		],
	}));

	return (
		<AnimatedGroup style={ [style] }>
			<InnerIndicator scaleX={ { value: 1 } } height={ CHART_HEIGHT } domain={ initialDomain } />
			{data.map((candle, index) => (
				<Candle
					key={ index }
					width={ CANDLE_WIDTH }
					{ ...{ scaleX, candle, index } }
					domain={ initialDomain }
				/>
			))}
		</AnimatedGroup>
	);
};

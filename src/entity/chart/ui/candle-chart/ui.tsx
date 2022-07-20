import React, { FC } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { G } from "react-native-svg";

import { CANDLE_WIDTH } from "../../../../constants/sizes";
import { Candle } from "./candle";
import { ICandle } from "../../lib";
import { Adaptation } from "../../../../components/CandleChart/helpers/Model";

interface ICandleChart {
	candleData: ICandle[],
	initialDomain: [number, number],
	translateX: Animated.SharedValue<number>;
	scaleX: Animated.SharedValue<number>;
	adaptation: Animated.SharedValue<Adaptation>;
}

// FIXME: Fix any
const AnimatedGroup: any = Animated.createAnimatedComponent(G);

export const CandleChart: FC<ICandleChart> = ({
	candleData,
	initialDomain,
	scaleX,
	adaptation,
	translateX
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
			{candleData.map((candle, index) => (
				<Candle
					key={ index }
					width={ CANDLE_WIDTH }
					candle={ candle }
					scaleX={ scaleX }
					index={ index }
					domain={ initialDomain }
				/>
			))}
		</AnimatedGroup>
	);
};


import React, { FC } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Indicators } from "../../../types/commonTypes";
import { RSI } from "./RSI";
import { withIndicatorWrapper } from "./withIndicatorWrapper";

const indicators = {
	[Indicators.RSI]: RSI,
};

export const Wrapper: FC<{ translateX: Animated.SharedValue<number> }> = ({
	children,
	translateX,
}) => {
	const style = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: translateX.value,
			},
		],
	}));

	return <Animated.View style={ style }>{children}</Animated.View>;
};

export const OuterIndicator = withIndicatorWrapper({
	Wrapper,
	indicators,
});

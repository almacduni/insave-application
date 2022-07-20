import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";
import Animated, { interpolateColor, useAnimatedProps } from "react-native-reanimated";

import { scale } from "../../../helpers/sizeConverter";

type PlaylistButtonPropTypes = {
	progress: Readonly<Animated.SharedValue<number>>;
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const PlaylistShareBtnIcon: FC<PlaylistButtonPropTypes> = ({ progress }) => {
	const headerSVGAnimatedProps = useAnimatedProps(() => {
		const stroke = interpolateColor(
			progress.value,
			[0, 1],
			["rgb(255,255,255)", "rgb(0,0,0)"],
			"RGB",
		);

		return { stroke };
	});

	return (
		<Svg width={ scale(24) } height={ scale(24) } viewBox={ `0 0 ${scale(24)} ${scale(24)}` } fill="none">
			<AnimatedPath
				animatedProps={ headerSVGAnimatedProps }
				d="M21.2254 10.3145L14.6341 4.39755C14.0332 3.85813 13.0773 4.2846 13.0773 5.09209V7.39589C13.0773 7.91136 12.6538 8.32696 12.1388 8.34798C0.779755 8.81154 2.04171 17.7115 2.04171 17.7115C3.89334 13.9814 8.37141 13.5193 12.1961 13.6503C12.6911 13.6673 13.0773 14.0779 13.0773 14.5731L13.0773 16.9113C13.0773 17.7183 14.0321 18.145 14.6333 17.6067L21.2245 11.7043C21.6384 11.3336 21.6388 10.6857 21.2254 10.3145Z"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

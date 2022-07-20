import React, { FC } from "react";
import Svg, { Path } from "react-native-svg";
import Animated, {
	useAnimatedProps,
	interpolateColor,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

type PlaylistButtonPropTypes = {
	progress: Readonly<Animated.SharedValue<number>>;
};

export const PlaylistBackBtnIcon: FC<PlaylistButtonPropTypes> = ({
	progress,
}) => {
	const headerSVGAnimatedProps = useAnimatedProps(() => {
		const stroke = interpolateColor(
			progress.value,
			[0, 1],
			["rgb(255,255,255)", "rgb(0,0,0)"],
			"RGB"
		);

		return { stroke };
	});

	return (
		<Svg width={ 24 } height={ 24 } fill="none">
			<AnimatedPath
				animatedProps={ headerSVGAnimatedProps }
				d="M15 4L7 12L15 20"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

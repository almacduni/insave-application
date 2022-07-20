import * as React from "react";
import { Animated, View } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type CircleProgressType = {
	percentage: number;
	radius?: number;
	strokeWidth?: number;
	color?: string;
	max?: number;
};
export const CircleProgress: React.FC<CircleProgressType> = ({
	percentage = 75,
	radius = 9,
	strokeWidth = 2,
	color = "#566AEC",
	max = 100,
}) => {
	const circleRef = React.useRef();
	const circumference = 2 * Math.PI * radius;
	const halfCircle = radius + strokeWidth;
	const maxPerc = (100 * percentage) / max;
	const strokeDashoffset = circumference - (circumference * maxPerc) / 100;

	React.useEffect(() => {});

	return (
		<View style={ { width: radius * 2, height: radius * 2 } }>
			<Svg
				height={ radius * 2 }
				width={ radius * 2 }
				viewBox={ `0 0 ${halfCircle * 2} ${halfCircle * 2}` }
			>
				<G rotation="-90" origin={ `${halfCircle}, ${halfCircle}` }>
					<Circle
						cx="50%"
						cy="50%"
						stroke="#E6E6E8"
						strokeWidth={ strokeWidth }
						r={ radius }
						fill="transparent"
					/>
					<AnimatedCircle
						ref={ circleRef }
						cx="50%"
						cy="50%"
						stroke={ color }
						strokeWidth={ strokeWidth }
						r={ radius }
						fill="transparent"
						strokeDasharray={ circumference }
						strokeDashoffset={ strokeDashoffset }
						strokeLinecap="round"
					/>
				</G>
			</Svg>
		</View>
	);
};

import React from "react";
import Svg, { LinearGradient, Text, Defs, Stop, TSpan } from "react-native-svg";

import { SCREEN_WIDTH } from "../../constants/sizes";

export enum GradientDirection {
	VERTICAL = 1,
	HORIZONTAL = 2,
}

type Color = {
	color: string;
	offset: string;
	opacity?: number;
};

type GradientTextProps = {
	width: number;
	height?: number;
	text: string;
	fontSize: number;
	fontFamily?: string;
	gradientColors: Color[];
	gradientDirection: GradientDirection;
};

const getWeight = (weight: string) => {
	switch (weight) {
	case "semi-bold":
		return "ProximaNova-Semibold";
	case "bold":
		return "ProximaNova-Bold";
	default:
		return "ProximaNova-Regular";
	}
};

export const GradientText: React.FC<GradientTextProps> = ({
	width,
	height,
	text,
	fontSize,
	fontFamily,
	gradientColors,
	gradientDirection,
}) => {
	const horizontalCoordinate =
		gradientDirection === GradientDirection.HORIZONTAL ? "100%" : "0";
	const verticalCoordinate =
		gradientDirection === GradientDirection.VERTICAL ? "100%" : "0";
	const MINIMAL_SCREEN_WIDTH = 310;

	return (
		<Svg height={ height || fontSize } width={ width }>
			<Defs>
				<LinearGradient
					id="gradient"
					x1="0"
					x2={ horizontalCoordinate }
					y1="0"
					y2={ verticalCoordinate }
					gradientUnits="userSpaceOnUse"
				>
					{gradientColors.map(({ offset, color, opacity = 1 }) => (
						<Stop
							key={ color }
							stopColor={ color }
							stopOpacity={ opacity }
							offset={ offset }
						/>
					))}
				</LinearGradient>
			</Defs>
			<Text fill="url(#gradient)">
				<TSpan
					fontFamily={ getWeight(fontFamily!) }
					fontSize={ fontSize }
					x="1"
					y={ fontSize }
				>
					{SCREEN_WIDTH <= MINIMAL_SCREEN_WIDTH ? text.substring(0, 40) : text}
				</TSpan>
			</Text>
		</Svg>
	);
};

import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Line as SvgLine } from "react-native-svg";

interface LineProps {
	x: number;
	y: number | string;
}

export const Line = ({ x, y }: LineProps) => (
	<Svg style={ StyleSheet.absoluteFill }>
		<SvgLine
			x1={ 0 }
			y1={ 0 }
			x2={ x }
			y2={ y }
			strokeWidth={ 2 }
			stroke="rgba(86, 106, 236, 0.2)"
			strokeDasharray="5 5"
			opacity={ 2 }
			vectorEffect="non-scaling-stroke"
		/>
	</Svg>
);

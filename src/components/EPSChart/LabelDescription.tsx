import React from "react";
import { Svg, Circle, Text } from "react-native-svg";

type PropType = {
	width: number;
	color: string;
	text: string;
	fontSize: number;
};

export const LabelDescription = (props: PropType) => (
	<Svg width={ props.width } height={ props.fontSize }>
		<Circle cx={ 5 } cy={ 5 } r={ 5 } fill={ props.color } />
		<Text fill={ "#000" } fontSize={ props.fontSize } fontFamily="ProximaNova-Regular" x="15" y="10">
			{props.text}
		</Text>
	</Svg>
);

import React, { FC } from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";
import Animated from "react-native-reanimated";
import { View, StyleSheet } from "react-native";
import { serialize, Vector } from "react-native-redash";

import { Cursor } from "./Cursor";
import { GraphType } from "../../types/commonTypes";
import { verticalScale } from "../../helpers/sizeConverter";

export interface AreaChartProps {
	translation: Vector<Animated.SharedValue<number>>;
	graph: GraphType;
	isActive: Animated.SharedValue<boolean>;
	size: { width: number; height: number };
}

const styles = StyleSheet.create({
	wrapper: {
		marginTop: verticalScale(50),
	},
});

export const AreaChart: FC<AreaChartProps> = (props) => {
	const { graph, size } = props;

	const dArea = serialize(graph.pathArea);
	const dLine = serialize(graph.pathLine);

	return (
		<View style={ styles.wrapper }>
			<Svg width={ size.width } height={ size.height }>
				<Defs>
					<LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
						<Stop offset="0%" stopColor="#DFE2F3" />
						<Stop offset="100%" stopColor="#F8F8F8" />
					</LinearGradient>
				</Defs>

				<Path d={ dArea } fill="url(#gradient)" />
				<Path d={ dLine } strokeWidth="2" stroke="#344CD3" strokeLinejoin="round" />
			</Svg>
			<Cursor { ...props } />
		</View>
	);
};

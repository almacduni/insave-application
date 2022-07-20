import React, { FC } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { VIEWPORT_WIDTH } from "../../../constants/sizes";
import { VisibleDataItem } from "../helpers/Model";

interface DateContainerProps {
	translateX: Animated.SharedValue<number>;
	visibleData: VisibleDataItem[];
}

export const DateContainer: FC<DateContainerProps> = ({ visibleData, translateX }) => {
	const innerStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: translateX.value,
			},
		],
	}));

	return (
		<Animated.View
			style={ {
				overflow: "hidden",
				width: VIEWPORT_WIDTH,
				height: 20,
			} }
		>
			<Animated.View style={ [innerStyle] }>
				{visibleData.map((data) => (
					data.visible && (
						<Animated.Text
							key={ data.originalIndex }
							style={ {
								position: "absolute",
								transform: [{ translateX: data.x - 10 }],
							} }
						>
							{data.payload}
						</Animated.Text>
					)
				))}
			</Animated.View>
		</Animated.View>
	);
};

import React, { FC } from "react";
import Animated, { useDerivedValue, useAnimatedStyle } from "react-native-reanimated";
import { ReText } from "react-native-redash";
import styled from "styled-components/native";

import { normalizeDate } from "../../helpers/dateHelpers";
import { scale } from "../../helpers/sizeConverter";
import { CANDLE_WIDTH, LABEL_WIDTH } from "../../constants/sizes";
import { LabelProps } from "./helpers/Model";

const LABEL_TOP_OFFSET = scale(10);

export const Label: FC<LabelProps> = ({
	translateXLongPressLabel,
	translateX,
	opacityLongPress,
	data,
	scaleX,
}) => {
	const normalizedDate = useDerivedValue(() => {
		if (data) {
			const currentCandleIndex = Math.floor(
				(translateXLongPressLabel.value - translateX.value) / (CANDLE_WIDTH * scaleX.value),
			);
			const currentCandle = data[currentCandleIndex];
			const date = new Date(currentCandle?.date);

			return normalizeDate(date);
		}

		return "No data";
	});

	const vertical = useAnimatedStyle(() => ({
		opacity: opacityLongPress.value,
		transform: [{ translateX: translateXLongPressLabel.value - LABEL_WIDTH / 2 }],
	}));

	return (
		<Animated.View
			style={ [
				// FIXME:
				// eslint-disable-next-line react-native/no-inline-styles
				{
					width: LABEL_WIDTH,
					display: "flex",
					justifyContent: "center",
					backgroundColor: "#EEF0FD",
					borderRadius: 6,
					position: "absolute",
					bottom: -LABEL_TOP_OFFSET,
				},
				vertical,
			] }
		>
			<AnimatedText
				text={ normalizedDate }
				style={ {
					width: 100,
					textAlign: "center",
				} }
			/>
		</Animated.View>
	);
};

const AnimatedText = styled(ReText)`
	margin: 0 auto;
	padding: 0;
	font-family: ProximaNova-Regular;
	font-size: ${scale(13)}px;
	line-height: ${scale(16)}px;
	color: black;
`;

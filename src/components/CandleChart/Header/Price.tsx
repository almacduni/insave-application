import React, { FC } from "react";
import { useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import { scale } from "../../../helpers/sizeConverter";
import { PriceColors } from "../../../types/commonTypes";
import { PriceProps } from "../helpers/Model";

const defaultStyles = {
	margin: 0,
	marginBottom: scale(16),
	padding: 0,
	fontFamily: "ProximaNova-Semibold",
	fontSize: scale(25),
	lineHeight: scale(36),
};

export const Price: FC<PriceProps> = ({ gestureActive, candleIndex, data, livePrice }) => {
	const lastCandle = data[data.length - 1];
	const close = lastCandle.close;
	const open = lastCandle.open;
	const color = close > open ? PriceColors.BULLISH : PriceColors.BEARISH;

	const candleValue = useDerivedValue(() => {
		const gestureIsActive = gestureActive.value;
		const currentCandlePrice = data[candleIndex.value]?.close?.toFixed(2);
		const lastCandlePrice = livePrice?.toFixed(2) || "";

		return gestureIsActive ? currentCandlePrice : lastCandlePrice;
	});

	const textColor = useAnimatedStyle(() => ({ ...defaultStyles, color: gestureActive.value ? PriceColors.CURRENT : color }));

	return livePrice ? <ReText style={ textColor } text={ candleValue } /> : <></>;
};

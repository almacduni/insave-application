import * as React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { CompanyName } from "../../../../components/CandleChart/Header/CompanyName";
import { Price } from "../../../../components/CandleChart/Header/Price";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";
import { ICandle } from "../../lib";

interface IChartHeader {
	assetName: string;
	assetTicker: string;
	gestureActive: Animated.SharedValue<number>;
	candleIndex: Animated.SharedValue<number>;
	currentYPosition: Animated.SharedValue<number>;
	candleData: ICandle[];
	livePrice: number | null;
}

export const ChartHeader: React.FC<IChartHeader> = (props) => {
	const { assetName, assetTicker, gestureActive, candleIndex, candleData, livePrice, currentYPosition } = props;

	const scrollStyle = useScrollAnimation(currentYPosition);

	return (
		<Animated.View style={ [scrollStyle] }>
			<HeaderContainer>
				<CompanyName
					name={ assetName }
					ticker={ assetTicker }
				/>
				<Price
					gestureActive={ gestureActive }
					candleIndex={ candleIndex }
					data={ candleData }
					livePrice={ livePrice }
				/>
			</HeaderContainer>
		</Animated.View>
	);
};

const HeaderContainer = styled.View`
	flex-direction: column;
	align-items: flex-start;
`;

// const HeaderInfoBlock = styled.View`
// 	width: 100%;
// 	justify-content: flex-start;
// 	margin-top: ${scale(20)}px;
// `;

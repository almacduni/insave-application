import * as React from "react";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import styled from "styled-components/native";

import { NameTimeFrame } from "../../components/CandleChart/helpers/dateHelpers";
import { ChartActions } from "../../components/ChartActions/ChartActions";
import { withCurtain } from "../../components/Curtain/Curtain";
import { WatchList } from "../../components/WatchList/WatchList";
import { CHART_HEIGHT, HEIGHT, VIEWPORT_WIDTH } from "../../constants/sizes";
import { ChartModel } from "../../entity/chart";
import { Chart } from "../../widgets/chart";

const Curtain = withCurtain(ChartActions);

export const ChartScreen = () => {
	const currentYPosition = useSharedValue(0);

	React.useEffect(() => {
		ChartModel.fetchCandleDataFx({ assetTicker: "AAPL", assetName: "Apple Inc.", timeFrame: NameTimeFrame.ONE_DAY });
	}, []);

	const onScroll = (y: number) => {
		"worklet";
		currentYPosition.value = y;
	};

	const chartWrapperStyle = useAnimatedStyle(() => {
		const value = currentYPosition.value > 0 ? 0 : currentYPosition.value;
		const k = Math.abs(value) / HEIGHT;

		return {
			maxWidth: VIEWPORT_WIDTH,
			minHeight: CHART_HEIGHT,
			paddingBottom: 30,
			overflow: "hidden",
			transform: [
				{
					translateY: -value * 0.1,
				},
				{
					scale: 1 - k * 0.1,
				},
			],
			opacity: 1 - k * 3,
		};
	});

	return (
		<Container>
			<Curtain scrollY={ currentYPosition } setChartMode={ () => {} } openingBorder={ 10 } />
			<Animated.View style={ [chartWrapperStyle] }>
				<Chart />
			</Animated.View>
			<WatchList onScroll={ onScroll } />
		</Container>
	);
};

const Container = styled.View`
	flex: 1;
`;

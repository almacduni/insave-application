import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useSharedValue } from "react-native-reanimated";
import { useStore } from "effector-react";

import { WatchList } from "../../components/WatchList/WatchList";
import { SkeletonLineChart } from "../../skeletons/SkeletonLineChart";
import { NameTimeFrame } from "../../components/CandleChart/helpers/dateHelpers";
import { WithSafeArea } from "../../shared/ui/WithSafeArea";
import { ChartModel } from "../../entity/chart";
import { Chart } from "../../widgets/chart";

export const ChartScreen: React.FC = () => {
	const currentYPosition = useSharedValue(0);
	const isLoading = useStore(ChartModel.$isCandleDataLoading);
	const onScroll = (y: number) => {
		"worklet";
		currentYPosition.value = y;
	};

	useEffect(() => {
		ChartModel.fetchCandleDataFx({ assetTicker: "AAPL", assetName: "Apple Inc.", timeFrame: NameTimeFrame.ONE_DAY });
	}, []);

	// const livePriceOpacity = useAnimatedStyle(() => {
	// 	const value = currentYPosition.value > 0 ? 0 : currentYPosition.value;
	// 	const k = Math.abs(value) / HEIGHT;

	// 	return {
	// 		opacity: 1 - k * 2,
	// 	};
	// });
	console.log("y pos:", currentYPosition);

	return (
		<WithSafeArea>
			<Container>
				<PanelWrapper>
					{isLoading ? (
						<SkeletonLineChart />
					) : (
						<Chart currentYPosition={ currentYPosition } />
					// {/* <Chart
					// 	AnimatedHeaderWrapper={ ({ children }: any) => (
					// 		<Animated.View style={ [scrollStyle] }>{children}</Animated.View>
					// 	) }
					// 	AnimatedPriceWrapper={ ({ children }: any) => (
					// 		<Animated.View style={ [livePriceOpacity] }>{children}</Animated.View>
					// 	) }
					// 	AnimatedChartWrapper={ ({ children }: any) => (
					// 		<Animated.View style={ [chartWrapperStyle] }>{children}</Animated.View>
					// 	) }
					// /> */}
					)}
					<WatchList onScroll={ onScroll } />
				</PanelWrapper>
			</Container>
		</WithSafeArea>
	);
};

const Container = styled.View`
	flex: 1;
	position: relative;
`;

const PanelWrapper = styled.View`
	flex: 1;
`;

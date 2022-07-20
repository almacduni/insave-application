import * as React from "react";
import { useStore } from "effector-react";
import { Svg } from "react-native-svg";
import styled from "styled-components/native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { CHART_HEIGHT, HEIGHT, VIEWPORT_WIDTH } from "../../constants/sizes";
import { ChartModel } from "../../entity/chart";
import { CandleChart } from "../../entity/chart/ui/candle-chart";
import { ChartHeader } from "../../entity/chart/ui/chart-header";
import { useGesture } from "../../features/chart-gesture/lib";
import { ChartGesture } from "../../features/chart-gesture/ui";

interface ICharts {
	currentYPosition: Animated.SharedValue<number>;
}

export const Chart: React.FC<ICharts> = (props) => {
	const { currentYPosition } = props;
	const { candleData, assetInfo } = useStore(ChartModel.$chartData);
	const { values, gestureHandlers } = useGesture(candleData);

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

	if (!candleData || !assetInfo) return <></>;

	return (
		<Container>
			<ChartHeader
				assetName={ assetInfo.assetName }
				assetTicker={ assetInfo.assetTicker }
				gestureActive={ values.gestureActive }
				candleIndex={ values.candleIndex }
				candleData={ candleData }
				livePrice={ assetInfo.livePrice }
				currentYPosition={ currentYPosition }
			/>
			<Animated.View style={ [chartWrapperStyle] }>
				<ChartGesture
					handleSlide={ gestureHandlers.handleSlide }
					onLongPress={ gestureHandlers.onLongPress }
					onGestureEventPanLongPress={ gestureHandlers.onGestureEventPanLongPress }
					checkActiveEvent={ gestureHandlers.checkActiveEvent }
				>
					<Viewport
						width={ VIEWPORT_WIDTH }
						height={ CHART_HEIGHT }
						viewBox={ `0 0 ${VIEWPORT_WIDTH} ${CHART_HEIGHT}` }
					>
						<CandleChart
							candleData={ candleData }
							scaleX={ values.zoom }
							initialDomain={ values.initialDomain }
							adaptation={ values.adaptation }
							translateX={ values.translateX }
						/>
					</Viewport>
				</ChartGesture>
			</Animated.View>
		</Container>
	);
};

const Container = styled.View`
	flex:1;
	padding: 0 16px 0 16px;
`;

const Viewport = styled(Svg)`
	align-items: center;
	margin-top: 16px;
`;


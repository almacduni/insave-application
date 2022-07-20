import React, { Fragment } from "react";
import Svg from "react-native-svg";
import styled from "styled-components/native";
import { useStore } from "effector-react";
import { View } from "react-native";

import { WithControlsHOC } from "./helpers/Model";
import {
	VIEWPORT_WIDTH,
	CHART_HEIGHT,
	OUTER_INDICATOR_HEIGHT,
	CANDLE_WIDTH,
} from "../../constants/sizes";
import { HeaderWrapper } from "./Header/HeaderWrapper";
import { OuterIndicator } from "./indicators/OuterIndicator";
import { $assetInfo, $timeFrame } from "./model";
import { useGesture } from "../../features/chart-gesture/lib/useGesture";
import { ChartGesture } from "../../features/chart-gesture/ui";
import { DateContainer } from "./DateContainer/DateContainer";
import { configureDate } from "./helpers/dateHelpers";

export const withControls: WithControlsHOC =
	({ Canvas, Cross, Price, CompanyName, Label }) =>
		function Chart (props: any) {
			const assetInfo = useStore($assetInfo);
			const timeFrame = useStore($timeFrame);

			const { values, gestureHandlers } = useGesture();

			// TODO: Move visibleData and useEffect which below to a separate hook in asset entity
			const [visibleData, setVisibleData] = React.useState<any>([]);

			React.useEffect(() => {
				setVisibleData(
					configureDate({
						sourceData: values.candleData,
						zoom: values.zoom,
						timeFrame,
						candleWidth: CANDLE_WIDTH,
					}),
				);
			}, [values.candleData, timeFrame, values.zoom]);

			if (!values.candleData || !assetInfo || !timeFrame) return <></>;

			const {
				AnimatedHeaderWrapper = Fragment,
				AnimatedPriceWrapper = Fragment,
				AnimatedChartWrapper = Fragment,
			} = props;

			return (
				<>
					<AnimatedHeaderWrapper>
						<HeaderWrapper>
							<CompanyName
								name={ assetInfo.assetName }
								ticker={ assetInfo.assetTicker }
							/>
							<View style={ { overflow: "hidden" } }>
								<Price
									gestureActive={ values.gestureActive }
									candleIndex={ values.candleIndex }
									data={ values.candleData }
									livePrice={ assetInfo.livePrice }
								/>
							</View>
						</HeaderWrapper>
					</AnimatedHeaderWrapper>
					<AnimatedChartWrapper>
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
								<Canvas
									translateX={ values.clampTranslateX }
									data={ values.candleData }
									initialDomain={ values.initialDomain }
									adaptation={ values.adaptation }
									scaleX={ values.zoom }
									{ ...props }
								/>
							</Viewport>
							<OuterIndicator
								scaleX={ values.zoom }
								height={ OUTER_INDICATOR_HEIGHT }
								domain={ values.initialDomain }
							/>
							<DateContainer
								translateX={ values.clampTranslateX }
								visibleData={ visibleData }
							/>
							<Cross
								opacityLongPress={ values.opacityLongPress }
								translateXLongPress={ values.translateXLongPress }
								translateYLongPress={ values.translateXLongPress }
							/>
							<Label
								translateXLongPressLabel={ values.translateXLongPressLabel }
								translateX={ values.translateX }
								opacityLongPress={ values.opacityLongPress }
								scaleX={ values.zoom }
								data={ values.candleData }
							/>
						</ChartGesture>
					</AnimatedChartWrapper>
				</>
			);
		};

const Viewport = styled(Svg)`
	align-items: center;
	margin-top: 16px;
`;


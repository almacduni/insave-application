import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { BlurView } from "@react-native-community/blur";
import { useStore } from "effector-react";

import { useAppSelector } from "../../hooks/useRedux";
import { LayoutsPicker } from "../LayoutsPicker/LayoutsPicker";
import { sc } from "../../helpers/sizeConverter";
import { setActiveIndicator } from "../../redux/chartSlice";
import { Indicators } from "../../types/commonTypes";
import { ChartModel } from "../../entity/chart";
import { NameTimeFrame } from "../CandleChart/helpers/dateHelpers";

type ButtonRangePropsType = {
	activeId: number;
	toggleButtonRange: (index: number, value: NameTimeFrame) => void;
};

const ButtonRange: React.FC<ButtonRangePropsType> = ({ activeId, toggleButtonRange }) => {
	const buttonArray = [
		{ name: "5M", value: NameTimeFrame.FIVE_MINUTES },
		{ name: "30M", value: NameTimeFrame.THIRTY_MINUTES },
		{ name: "1H", value: NameTimeFrame.ONE_HOUR },
		{ name: "4H", value: NameTimeFrame.FOUR_HOUR },
		{ name: "1D", value: NameTimeFrame.ONE_DAY },
		{ name: "1W", value: NameTimeFrame.ONE_WEEK },
	];

	return (
		<ButtonContainer>
			{buttonArray.map((item, index) => (
				<Button
					isActive={ index === activeId }
					onPress={ () => toggleButtonRange(index, item.value) }
					key={ index }
				>
					<ButtonText isActive={ index === activeId }>{item.name}</ButtonText>
				</Button>
			))}
		</ButtonContainer>
	);
};

type ChartActionsPickerPropsType = {
	data: any[];
	activeValue: string | null;
	toggleAction: (activeValue: string, value: string) => void;
};
const ChartActionsPicker: FC<ChartActionsPickerPropsType> = ({
	activeValue,
	toggleAction,
	data,
}) => (
	<IndicatorsContainer>
		{data.map((item, index) => (
			<IndicatorWrapper
				key={ index }
				isActive={ item.value === activeValue }
				onPress={ () => toggleAction(item.name, item.value) }
			>
				<ButtonText isActive={ item.value === activeValue }>{item.name}</ButtonText>
			</IndicatorWrapper>
		))}
	</IndicatorsContainer>
);

export const indicatorsList = [
	{
		name: Indicators.EMA,
		value: "EMA",
	},
	// {
	// 	name: Indicators.MACD,
	// 	value: "MACD",
	// },
	{
		name: Indicators.RSI,
		value: "RSI",
	},
	// {
	// 	name: Indicators.OBV,
	// 	value: "OBV",
	// },
	// {
	// 	name: Indicators.ADX,
	// 	value: "ADX",
	// },
	// {
	// 	name: Indicators.TEMA,
	// 	value: "TEMA",
	// },
	// {
	// 	name: Indicators.GMMA,
	// 	value: "GMMA",
	// },

	{
		name: Indicators.BB,
		value: "BB",
	},
];

type ChartActionsPropsType = {
	setChartMode: (chartMode: string) => void;
	progress: Animated.SharedValue<number>;
	setIsOpenSheet: (isOpenSheet: boolean) => void;
};
export const ChartActions: FC<ChartActionsPropsType> = ({ setChartMode, progress }) => {
	const dispatch = useDispatch();
	const drawingToolsList = [
		{
			name: "Trendline",
			value: "trendline",
		},
		{
			name: "Fib Retracement",
			value: "fibRetracement",
		},
		{
			name: "Rectangle",
			value: "rectangle",
		},
		{
			name: "Brush",
			value: "brush",
		},
		{
			name: "Elliot wave",
			value: "elliotWave",
		},
		{
			name: "Triangle",
			value: "triangle",
		},
		{
			name: "Ellipse",
			value: "ellipse",
		},
	];

	const { assetInfo } = useStore(ChartModel.$chartData);
	const [activeIdButtonRange, setActiveIdButtonRange] = useState<number>(4);
	const [activeDrawingTools, setDrawingTools] = useState(null as string | null);
	const [activeLayout, setActiveLayout] = useState("candle");
	const toggleButtonRange = (index: number, value: NameTimeFrame) => {

		setActiveIdButtonRange(index);
		// dispatch(setTimeFrame(value));
		ChartModel.loadTimeFrame(value);
		if (assetInfo) {
			const { assetName, assetTicker } = assetInfo;

			ChartModel.fetchCandleDataFx({ assetTicker, assetName, timeFrame: value });
		}
		// dispatch(getChartCandlesData({ ticker: ticker!, name: name!, timeFrame: value }));
	};

	const activeIndicator = useAppSelector((state) => state.chart.activeIndicator);

	const toggleIndicator = (activeValue: string) => {
		if (activeIndicator === activeValue) dispatch(setActiveIndicator(""));
		else dispatch(setActiveIndicator(activeValue));
	};
	const toggleDrawingTools = (activeValue: string) => {
		setDrawingTools(activeValue);
	};
	const toggleLayouts = (activeValue: string) => {
		setChartMode(activeValue);
		setActiveLayout(activeValue);
	};

	const opacity = useAnimatedStyle(() => ({
		flex: 1,
		backgroundColor: `rgba(243, 242, 244, ${1 - Math.abs(progress.value)})`,
	}));

	return (
		<Animated.View style={ { flex: 1, overflow: "hidden" } }>
			<BlurView
				blurType="light"
				blurAmount={ 10 }
				style={ {
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				} }
			/>
			<Animated.View style={ opacity }>
				<Container>
					<Header>Timeframes</Header>
					<ButtonRange activeId={ activeIdButtonRange } toggleButtonRange={ toggleButtonRange } />
					<Header>Indicators</Header>
					<ChartActionsPicker
						data={ indicatorsList }
						activeValue={ activeIndicator }
						toggleAction={ toggleIndicator }
					/>
					<Header>Drawing tools</Header>
					<ChartActionsPicker
						data={ drawingToolsList }
						activeValue={ activeDrawingTools }
						toggleAction={ toggleDrawingTools }
					/>
					<Header>Layouts</Header>
					<LayoutsPicker activeValue={ activeLayout } toggleAction={ toggleLayouts } />
				</Container>
			</Animated.View>
		</Animated.View>
	);
};

const Container = styled.View`
	flex: 1;
	padding: 0 ${wp("1.3%")}px;
`;

const Header = styled.Text`
	margin: ${wp("4.8%")}px ${wp("2.4%")}px 0 ${wp("2.4%")}px;
	font-family: ProximaNova-Bold;
	font-size: ${wp("4.8%")}px;
	line-height: ${wp("5.6%")}px;
	color: #252525;
`;

const ButtonContainer = styled.View`
	margin: ${wp("3.2%")}px ${wp("2.4%")}px 0 ${wp("2.4%")}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Button = styled.TouchableOpacity<{ isActive: boolean }>`
	width: ${sc(50)}px;
	border-radius: ${sc(10)}px;
	background-color: ${(props) => (props.isActive ? "rgba(86, 106, 236, 0.1);" : "#FFFFFF")};
	padding: ${sc(15)}px ${sc(8.5)}px;
`;

const ButtonText = styled.Text<{ isActive: boolean }>`
	font-family: ProximaNova-Semibold;
	font-size: ${wp("4.26%")}px;
	line-height: ${wp("5.06%")}px;
	font-variant: lining-nums;
	color: ${(props) => (props.isActive ? "#566AEC" : "#252525")};
	text-align: center;
`;

const IndicatorsContainer = styled.View`
	flex-wrap: wrap;
	flex-direction: row;
`;

const IndicatorWrapper = styled.TouchableOpacity<{
	isActive: boolean;
}>`
	margin-top: ${wp("2.8%")}px;
	margin-left: ${wp("2.4%")}px;
	background-color: ${(props) => (props.isActive ? "rgba(86, 106, 236, 0.1);" : "#FFFFFF")};
	padding: ${sc(15)}px ${sc(8.5)}px;
	border-radius: ${sc(10)}px;
	justify-content: center;
	align-items: center;
`;

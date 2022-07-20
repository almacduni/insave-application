import React, { FC, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import BottomSheet, {
} from "@gorhom/bottom-sheet";
import { useStore } from "effector-react";

import { useAppSelector } from "../../hooks/useRedux";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { setActiveIndicator, setTimeFrame } from "../../redux/chartSlice";
import { LayoutsPicker } from "../../components/LayoutsPicker/LayoutsPicker";
import { ButtonRange } from "../../features/chart-actions/ui/ButtonRange";
import { drawingToolsList, indicatorsList } from "../../features/chart-actions/model";
import { ChartActionsPicker } from "../../features/chart-actions/ui/ChartActionsPicker";
import { setIsOpenChartConfiguration } from "../../features/bottom-sheets";
import { WithBottomSheet } from "../bottom-sheet";
import { ChartModel } from "../chart";
import { NameTimeFrame } from "../../components/CandleChart/helpers/dateHelpers";

export const ChartConfiguration: FC = () => {
	const dispatch = useDispatch();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => [10, "80%"], []);
	const { assetInfo } = useStore(ChartModel.$chartData);

	const [activeIdButtonRange, setActiveIdButtonRange] = useState<number>(4);
	const [activeDrawingTools, setDrawingTools] = useState(null as string | null);
	const [activeLayout, setActiveLayout] = useState("candle");
	const toggleButtonRange = (index: number, timeFrame: NameTimeFrame) => {
		setActiveIdButtonRange(index);
		dispatch(setTimeFrame(timeFrame));
		if (assetInfo) {
			ChartModel.fetchCandleDataFx({
				assetTicker: assetInfo.assetTicker,
				assetName: assetInfo.assetName,
				timeFrame
			});
		}
	};

	const activeIndicator = useAppSelector((state) => state.chart.activeIndicator);

	const toggleIndicator = (activeValue: string) => {
		if (activeIndicator === activeValue) dispatch(setActiveIndicator(""));
		else dispatch(setActiveIndicator(activeValue));
	};

	const handleCloseSheet = () => {
		dispatch(setIsOpenChartConfiguration(false));

		bottomSheetRef.current?.forceClose();
	};

	const toggleDrawingTools = (activeValue: string) => {
		setDrawingTools(activeValue);
	};

	const toggleLayouts = (activeValue: string) => {
		setActiveLayout(activeValue);
	};

	const handleElement = () => (
		<WandContainer />
	);

	return (
		<WithBottomSheet handleElement={ handleElement } bottomSheetRef={ bottomSheetRef } snapPoints={ snapPoints } handleCloseSheet={ handleCloseSheet }>
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
		</WithBottomSheet>
	);
};

const WandContainer = styled.View`
	width: ${scale(51)}px;
	height: ${verticalScale(4)}px;
	background: #FFFFFF;
	margin: 0 auto;
	transform: translateY(-16px);
	border-radius: 3px;
	z-index: 101;
`;

const Header = styled.Text`
	margin: 24px 0 0 16px;
	font-weight: bold;
	font-size: 21px;
	line-height: 28px;
	letter-spacing: 0.15px;
	color: #03061D;
`;

import React from "react";
import styled from "styled-components/native";
import { Background, VictoryLabel, VictoryAxis, VictoryChart, VictoryBar } from "victory-native";
import moment from "moment";

import { sc } from "../../helpers/sizeConverter";
import { VIEWPORT_WIDTH as WIDTH } from "../../constants/sizes";
import { PointItem } from "./PointItem";
import { EPSChartHeader } from "./EPSChartHeader";
import { normalizeData } from "../../helpers/normalizeData";
import { useAppSelector } from "../../hooks/useRedux";

type DataComponentPropType = {
	x: number;
	y: number;
	datum: {
		actual: number;
	};
	scale: () => void;
};

const REPORTED_COLOR = "rgba(17, 3, 32, 0.08)";
const ESTIMATE_COLOR = "#566AEC";

const DataComponent = (props: DataComponentPropType | any) => (
	<>
		<PointItem
			x={ props.x }
			y1={ props.y }
			y2={ props.scale.y(props.datum.actual) }
			beginYPosition={ props.scale.y(0) }
			estimateColor={ ESTIMATE_COLOR }
			reportedColor={ REPORTED_COLOR }
		/>
	</>
);

const TickLabel = (props: any) => (
	<>
		<VictoryLabel
			angle={ 0 }
			dy={ -12 }
			dx={ -7 }
			y={ props.y }
			x={ props.datum < 0 ? WIDTH - 29 : WIDTH - 25 }
			text={ Number.isInteger(props.datum) ? props.text.split(".")[0] : props.text }
			textAnchor={ "start" }
		/>
	</>
);

const getYLimits = (data: any[]): any => {
	const values = [...data.map((item) => item.actual), ...data.map((item) => item.y)];
	const maxY = Math.max(...values);
	const minY = Math.min(...values);

	return [minY > 0 ? 0 : minY - 0.1, maxY < 0 ? 0 : maxY];
};

export const EPSChart = () => {
	const state = useAppSelector((appState) => appState.SearchScreenR);
	let data: any = state.companyDescription?.eps || [];

	data = normalizeData(data, [
		["date", "x", (date: string) => moment(new Date(date)).format("MMM DD")],
		["epsEstimated", "y", (value: number) => +value?.toFixed(2)],
		["epsReported", "actual", (value: number) => (value ? +value.toFixed(2) : 0)],
	]);

	const limitsY = getYLimits(data);

	return data.length ? (
		<Container>
			<EPSChartHeader estimateColor={ ESTIMATE_COLOR } reportedColor={ REPORTED_COLOR } />
			<VictoryChart
				width={ WIDTH }
				height={ 224 }
				padding={ { bottom: 50, top: 20 } }
				style={ {
					background: { fill: "#f8f8f8", fontFamily: "ProximaNova-Regular" },
				} }
				backgroundComponent={ <Background x={ 0 } y={ 0 } width={ WIDTH + 50 } height={ 224 } /> }
				domainPadding={ {
					x: [20, 20],
				} }
			>
				<VictoryAxis
					width={ WIDTH }
					style={ {
						axis: {
							fill: "transparent",
							strokeWidth: 0,
						},
						ticks: {
							padding: 10,
							fontFamily: "ProximaNova-Regular",
							backgroundColor: "red"
						},
						grid: {
							strokeWidth: `${sc(0.3)}px`,
							strokeOpacity: 0.2,
							stroke: "#03061D",
						},
						tickLabels: {
							color: "#03061D",
							fontFamily: "ProximaNova-Regular",
							fontSize: 18,
						},
					} }
					axisLabelComponent={ <VictoryLabel style={ { fontFamily: "Proxima Nova", fontSize: 20 } }/> }
					tickLabelComponent={ <TickLabel /> }
					crossAxis={ false }
					label="Label"
					orientation="right"
					dependentAxis
				/>
				<VictoryAxis
					style={ {
						axis: {
							fill: "transparent",
							strokeWidth: 0,
						},
						tickLabels: {
							fontFamily: "ProximaNova-Regular",
							color: "#03061D",
							fontSize: `${sc(13)}px`,
						},
					} }

					tickLabelComponent={ <VictoryLabel angle={ 0 } y={ 195 } /> }
					domainPadding={ { x: [data.length < 2 ? 1500 : 50, 15] } }
					invertAxis
				/>
				<VictoryBar
					domain={ { y: limitsY } }
					dataComponent={ <DataComponent minY={ limitsY[0] } /> }
					data={ data }
				/>
			</VictoryChart>
		</Container>
	) : (
		<Container />
	);
};

const Container = styled.View``;

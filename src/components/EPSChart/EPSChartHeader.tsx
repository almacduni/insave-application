import React from "react";
import { View, ViewProps } from "react-native";
import styled from "styled-components/native";

import { sc } from "../../helpers/sizeConverter";
import { LabelDescription } from "./LabelDescription";

type PropType = {
	estimateColor: string;
	reportedColor: string;
};

export const EPSChartHeader = (props: PropType) => (
	<Container padding={ 16 }>
		<View>
			<Title>EPS</Title>
		</View>
		<Container>
			<LabelDescription width={ 85 } text="Reported" color={ props.reportedColor } fontSize={ 14 } />
			<LabelDescription width={ 75 } text="Estimated" color={ props.estimateColor } fontSize={ 14 } />
		</Container>
	</Container>
);

interface IContainerProps extends ViewProps {
	padding?: number;
}

const Container = styled.View<IContainerProps>`
	background-color: #f8f8f8;
	padding: ${({ padding }) => sc(padding || 0)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${sc(14)}px;
`;

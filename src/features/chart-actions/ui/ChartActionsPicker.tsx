import React from "react";
import styled from "styled-components/native";

import { sc, scale } from "../../../helpers/sizeConverter";

type ChartActionsPickerPropsType = {
	data: any[];
	activeValue: string | null;
	toggleAction: (activeValue: string, value: string) => void;
};
export const ChartActionsPicker: React.FC<ChartActionsPickerPropsType> = ({
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

const IndicatorsContainer = styled.View`
	flex-wrap: wrap;
	flex-direction: row;
	margin-left: 8px;
`;

const IndicatorWrapper = styled.TouchableOpacity<{
	isActive: boolean;
}>`
	margin-top: 16px;
	margin-left: 8px;
	background-color: ${(props) => (props.isActive ? "rgba(86, 106, 236, 0.1);" : "rgba(17, 3, 32, 0.05);")};
	padding: ${scale(15)}px ${scale(12)}px;
	border-radius: ${sc(10)}px;
	justify-content: center;
	align-items: center;

`;

const ButtonText = styled.Text<{ isActive: boolean }>`
	font-size: ${scale(16)}px;
	font-variant: lining-nums;
	color: ${(props) => (props.isActive ? "#566AEC" : "#252525")};
	text-align: center;
`;

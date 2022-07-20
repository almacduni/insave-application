import React, { FC } from "react";
import styled from "styled-components/native";

import { scale } from "../../helpers/sizeConverter";

type PropsType = {
	activeValue: string;
	toggleAction: (activeValue: string) => void;
};
export const LayoutsPicker: FC<PropsType> = ({ activeValue, toggleAction }) => (
	<Container>
		<IndicatorWrapper onPress={ () => toggleAction("candle") } isActive={ activeValue === "candle" }>
			{/* <CandlesIcon isActive={"candle" === activeValue} /> */}
			<Title isActive={ activeValue === "candle" }>Candles</Title>
		</IndicatorWrapper>
		<IndicatorWrapper onPress={ () => toggleAction("line") } isActive={ activeValue === "line" }>
			{/* <LineIcon isActive={"line" === activeValue} /> */}
			<Title isActive={ activeValue === "line" }>Line</Title>
		</IndicatorWrapper>
		<IndicatorWrapper
			onPress={ () => toggleAction("lineArea") }
			isActive={ activeValue === "lineArea" }
			isLast
		>
			{/* <AreaIcon isActive={"lineArea" === activeValue} /> */}
			<Title isActive={ activeValue === "lineArea" }>Area</Title>
		</IndicatorWrapper>
	</Container>
);

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin: 0 16px;
`;
const Title = styled.Text<{ isActive: boolean }>`
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	color: ${({ isActive }) => (isActive ? "#566AEC" : "#252525")};
`;
const IndicatorWrapper = styled.TouchableOpacity<{
	isActive: boolean;
	isLast?: boolean;
}>`
	width: ${scale(94)}px;
	flex: 1;
	margin-top: 16px;
	margin-right: 8px;
	background-color: ${(props) => (props.isActive ? "rgba(86, 106, 236, 0.1)" : "rgba(17, 3, 32, 0.05);")};
	padding: 16px 18px;
	border-radius: ${scale(4)}px;
	flex-direction: row;
	border-radius: ${scale(10)}px;
	justify-content: space-evenly;
	align-items: center;
`;

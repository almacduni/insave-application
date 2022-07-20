import React from "react";
import styled from "styled-components/native";

import { timeFramesButtonArray } from "../model";
import { sc, scale } from "../../../helpers/sizeConverter";
import { NameTimeFrame } from "../../../components/CandleChart/helpers/dateHelpers";

type ButtonRangePropsType = {
	activeId: number;
	toggleButtonRange: (index: number, value: NameTimeFrame) => void;
};

export const ButtonRange: React.FC<ButtonRangePropsType> = ({ activeId, toggleButtonRange }) => (
	<ButtonContainer>
		{timeFramesButtonArray.map((item, index) => (
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

const ButtonContainer = styled.View`
  margin: 16px 16px 8px 16px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
const Button = styled.TouchableOpacity<{ isActive: boolean }>`
	width: ${scale(50)}px;
	border-radius: ${scale(10)}px;
	background-color: ${(props) => (props.isActive ? "rgba(86, 106, 236, 0.1);" : "rgba(17, 3, 32, 0.05);")};
	padding: ${sc(15)}px ${sc(8.5)}px;
`;

const ButtonText = styled.Text<{ isActive: boolean }>`
  font-size: ${scale(16)}px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #03061D;
	color: ${(props) => (props.isActive ? "#566AEC" : "#252525")};
	text-align: center;
`;

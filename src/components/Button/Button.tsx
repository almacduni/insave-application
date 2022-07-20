import React, { FC } from "react";
import styled from "styled-components/native";

import { sc } from "../../helpers/sizeConverter";

interface ButtonProps {
	color?: string;
	bgColor?: string;
	title: string;
	onPress?: () => any;
}

export const Button: FC<ButtonProps> = ({
	color = "rgba(3, 6, 29, 1)",
	bgColor = "rgba(17, 3, 32, 0.05)",
	title,
	onPress = () => {},
}) => (
	<ButtonWrapper { ...{ bgColor, onPress } } activeOpacity={ 0.7 }>
		<ButtonTitle { ...{ color } }>{title}</ButtonTitle>
	</ButtonWrapper>
);

const ButtonWrapper = styled.TouchableOpacity<{ bgColor: string }>`
	background-color: ${({ bgColor }) => bgColor};
	width: 100%;
	padding: ${sc(14)}px;
	border-radius: ${sc(10)}px;
`;

const ButtonTitle = styled.Text<{ color: string }>`
	color: ${({ color }) => color};
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${sc(17)}px;
	line-height: ${sc(20)}px;
	text-align: center;
`;

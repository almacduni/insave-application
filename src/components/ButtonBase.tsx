import React, { FC } from "react";
import styled from "styled-components/native";

import { sizeConverter as sz } from "../helpers/sizeConverter";

type ButtonPropsType = {
	title: string;
	background?: string;
	onPress: () => void;
};

export const ButtonBase: FC<ButtonPropsType> = ({ title, onPress, background = "#566aec" }) => (
	<ButtonWrapper onPress={ onPress } { ...{ background } }>
		<ButtonTitle>{title}</ButtonTitle>
	</ButtonWrapper>
);

const ButtonWrapper = styled.TouchableOpacity<{ background: string }>`
	padding: ${sz(14)}px 0;
	background-color: ${({ background }) => background};
	width: ${sz(343)}px;
	height: ${sz(48)}px;
	border-radius: ${sz(10)}px;
	align-items: center;
	justify-content: center;
`;
const ButtonTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${sz(17)}px;
	line-height: ${sz(20)}px;
	letter-spacing: ${sz(0.25)}px;
	color: #ffffff;
`;

import React, { FC } from "react";
import styled from "styled-components/native";

import { sc } from "../../helpers/sizeConverter";

interface SubmitButtonProps {
	title?: string;
	disabled?: boolean;
	onPress?: () => any;
}

export const SubmitButton: FC<SubmitButtonProps> = ({
	title = "Submit",
	disabled = false,
	onPress = () => {},
}) => (
	<SubmitBtn disabled={ disabled } activeOpacity={ 1 } onPress={ onPress }>
		<SubmitTitle>{title}</SubmitTitle>
	</SubmitBtn>
);

const SubmitBtn = styled.TouchableOpacity<{
	disabled?: boolean;
}>`
	height: ${sc(48)}px;
	align-items: center;
	justify-content: center;
	border-radius: ${sc(10)}px;
	background-color: ${({ disabled }) =>
		disabled ? "rgba(86, 106, 236, 0.5)" : "rgba(86, 106, 236, 1)"};
	margin-bottom: ${sc(16)}px;
`;

const SubmitTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${sc(17)}px;
	line-height: ${sc(20)}px;
	letter-spacing: ${sc(0.25)}px;
	color: #fff;
`;

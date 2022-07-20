import React, { FC } from "react";
import styled from "styled-components/native";

import InvalidIcon from "../../assets/InvalidIcon.svg";
import ValidIcon from "../../assets/ValidIcon.svg";
import { sc } from "../../helpers/sizeConverter";

interface CheckLabelProps {
	success: boolean;
	title: string;
}

export const CheckLabel: FC<CheckLabelProps> = ({ success, title }) => (
	<Wrapper>
		{success ? <ValidIcon /> : <InvalidIcon />}
		<Title>{title}</Title>
	</Wrapper>
);

const Wrapper = styled.View`
	flex-direction: row;
	align-items: center;
`;

const Title = styled.Text`
	font-size: ${sc(14)}px;
	line-height: ${sc(20)}px;
	letter-spacing: ${sc(0.25)}px;
	margin-left: ${sc(8)}px;
	font-family: ProximaNova-Regular;
`;

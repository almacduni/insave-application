import React, { FC } from "react";
import styled from "styled-components/native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { cutEmail } from "../../helpers/text";

interface ShortCutEmailProps {
	email: string | null;
}

export const ShortcutEmail: FC<ShortCutEmailProps> = ({ email }) => {
	const cutedEmail = cutEmail(email);

	return <Email>{cutedEmail}</Email>;
};

const Email = styled.Text`
	margin-right: ${verticalScale(18)}px;
	font-size: ${scale(16)}px;
	font-family: ProximaNova-Regular;
	color: rgba(154, 155, 165, 1);
	letter-spacing: ${scale(0.5)}px;
	line-height: ${verticalScale(20)}px;
`;

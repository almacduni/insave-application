import React, { FC } from "react";
import styled from "styled-components/native";

import { Text } from "../Text";
import { scale, verticalScale } from "../../../helpers/sizeConverter";

export const CopiedLabel: FC = () => (
	<Wrapper>
		<Title color={ "#fff" }>Copied!</Title>
	</Wrapper>
);

const Wrapper = styled.View`
	padding: ${verticalScale(5)}px 15px;
	border-radius: ${scale(6)}px;
	background: #03061d;
	align-self: center;
	margin-top: 100%;
`;

const Title = styled(Text)`
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
`;

import React, { FC } from "react";
import styled from "styled-components/native";

import { scale } from "../../../helpers/sizeConverter";

export const HeaderWrapper: FC = ({ children }) => (
	<HeaderContainer>
		<HeaderInfoBlock>{children}</HeaderInfoBlock>
	</HeaderContainer>
);

const HeaderContainer = styled.View`
	position: relative;
	width: 100%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;
const HeaderInfoBlock = styled.View`
	width: 100%;
	justify-content: flex-start;
	margin-top: ${scale(20)}px;
`;

import React, { FC } from "react";
import styled from "styled-components/native";

import { scale } from "../../../helpers/sizeConverter";
import { processCompanyName } from "../../../helpers/text";
import { CompanyNameProps } from "../helpers/Model";

export const CompanyName: FC<CompanyNameProps> = ({ name, ticker }) => (
	<HeaderItemInfo>
		<Header>{processCompanyName(name, ticker)}</Header>
	</HeaderItemInfo>
);

const HeaderItemInfo = styled.View`
	align-items: center;
	flex-direction: row;
`;

const Header = styled.Text`
	margin-right: ${scale(4)}px;
	font-family: ProximaNova-Bold;
	font-size: ${scale(25)}px;
	line-height: ${scale(36)}px;
	color: #03061d;
`;

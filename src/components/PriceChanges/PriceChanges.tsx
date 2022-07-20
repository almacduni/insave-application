import React, { FC } from "react";
import styled from "styled-components/native";

import { sizeConverter as sz } from "../../helpers/sizeConverter";
import { normalizeIndicator as ni } from "../../helpers/normalizeIndicator";

interface PriceChangesProps {
	changesInCurrency: number;
	changesInPercentage: number;
	style?: any;
}

export const PriceChanges: FC<PriceChangesProps> = ({
	changesInCurrency,
	changesInPercentage,
	style,
}) => (
	<InfoText isIncrease={ changesInCurrency > 0 } style={ style }>
		{ni(changesInCurrency, changesInCurrency > 0).fullSign}$ (
		{ni(changesInPercentage, changesInCurrency > 0).fullSign}
		%)
	</InfoText>
);

const InfoText = styled.Text<{ isIncrease: boolean }>`
	color: ${({ isIncrease }) => (isIncrease ? "#008148" : "#E30502")};
	font-family: "ProximaNova-Regular";
	letter-spacing: ${sz(0.4)}px;
	font-size: ${sz(13)}px;
	line-height: ${sz(16)}px;
	font-variant: lining-nums;
`;

import React, { FC } from "react";
import styled from "styled-components/native";

import BenTenIcon from "../../assets/benTenIcon.svg";
import { sc, scale, verticalScale } from "../../helpers/sizeConverter";
import { LabeledBlock } from "../../components/LabeledBlock/LabeledBlock";
import { useAppSelector } from "../../hooks/useRedux";

export const TokenWalletHeader: FC = () => {
	const tokenInfo = useAppSelector((state) => state.token);

	return (
		<Wrapper background={ "rgba(86, 106, 236, 0.1)" }>
			<Inner>{/* CHART in FUTURE */}</Inner>
			<Inner withPadding>
				<TokenValues>
					<LabeledBlock topRight marker={ <BenTenIcon /> } markerWidth={ sc(35) }>
						<Text fontSize={ 64 } lineHeight={ 80 }>
							{tokenInfo.tokenCount}
						</Text>
					</LabeledBlock>
					<Separator bottom={ 32 } />
					<Text>${tokenInfo.usdCount}</Text>
					<Separator bottom={ 5 } />
					<Text fontSize={ 13 } fontType={ "Regular" } lineHeight={ 16 }>
						{`+${tokenInfo.usdEarned || 0}$ +${tokenInfo.changesPercentage || 0}%`}
					</Text>
					<Separator bottom={ 24 } />
				</TokenValues>
			</Inner>
		</Wrapper>
	);
};

const Wrapper = styled.View<{ background: string }>`
	position: relative;
	height: ${verticalScale(180)}px;
	background-color: ${({ background }) => background};
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
`;

const Inner = styled.View<{ withPadding?: boolean }>`
	${({ withPadding }) =>
		withPadding
			? `
      padding: 0 ${16}px 0 ${verticalScale(16)}px;`
			: ""}
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
`;

export const Text = styled.Text<{
	fontSize?: number;
	fontWeight?: number;
	fontType?: string;
	lineHeight?: number;
}>`
	font-family: ${({ fontType = "Semibold" }) => `ProximaNova-${fontType}`};
	font-weight: ${({ fontWeight = 600 }) => fontWeight};
	font-size: ${({ fontSize = 17 }) => scale(fontSize)}px;
	line-height: ${({ lineHeight = 20 }) => verticalScale(lineHeight)}px;
	color: #03061d;
`;

const TokenValues = styled.View`
	margin: 0 auto;
	width: auto;
	flex: 1;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
`;

export const Separator = styled.View<{
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
}>`
	margin: ${({ top = 0, left = 0, right = 0, bottom = 0 }) => `
    ${verticalScale(top)}px ${scale(left)}px ${verticalScale(bottom)}px ${scale(right)}px
  `};
`;

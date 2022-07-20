import React from "react";
import styled from "styled-components/native";

import { useAppSelector } from "../../hooks/useRedux";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { normalizeIndicator as ni } from "../../helpers/normalizeIndicator";
import { History } from "../History/History";

export const Wallet = ({ navigation, isHistoryOpen }: any) => {
	const userBalance = useAppSelector((state) => state.user.userBalance);

	const balance = userBalance ? userBalance : 0.0;

	return (
		<Container>
			<BalanceContainer>
				<Balance>
					$ {ni(balance).whole}.<BalanceRest>{ni(balance).rest}</BalanceRest>
				</Balance>
				<CurrencyIcon source={ require("../../assets/usa.png") } />
			</BalanceContainer>
			<History navigation={ navigation } isHistoryOpen={ isHistoryOpen } />
		</Container>
	);
};

const Container = styled.View`
	background: #ffffff;
	box-shadow: 0 ${scale(3)}px ${scale(8)}px #e4e4e4;
	border-radius: ${scale(6)}px;
	margin: 16px 4px 32px;
	padding: 16px 16px 8px;
	elevation: 3;
`;
const BalanceContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Balance = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(34)}px;
	line-height: ${verticalScale(39.92)}px;
	font-variant: lining-nums;
	align-items: flex-end;
`;
const BalanceRest = styled.Text`
	font-variant: lining-nums;
	font-size: ${scale(26)}px;
`;
const CurrencyIcon = styled.Image`
	width: ${scale(40)}px;
	height: ${scale(40)}px;
	resize-mode: contain;
`;

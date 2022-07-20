import React, { FC, useEffect } from "react";
import styled from "styled-components/native";

import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { CryptoBackgrounds, CryptoColors, FontStyles } from "../../../shared/model";
import { Circle, Text, Badge, Side } from "../../../shared/ui";
import { CryptoIcons } from "../../../shared/assets";
import { getRate } from "../../../redux/walletSliceNew";

interface SelectedCurrencyProps {
	walletIndex: number;
}

export const SelectedCurrency: FC<SelectedCurrencyProps> = (props) => {
	const { walletIndex } = props;
	const wallet = useAppSelector((state) => state.walletNew.wallets[walletIndex]);
	const rate = useAppSelector((state) => state.walletNew.rates[wallet.currency]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (wallet.currency && !rate) {
			dispatch(getRate({ currency: wallet.currency }));
		}
	}, [wallet.currency]);

	const Icon = CryptoIcons[wallet.currency + "_MINI"];

	return (
		<Wrapper bg={ CryptoBackgrounds[wallet.currency] }>
			<Side.Left>
				<Circle size={ 36 } color={ CryptoBackgrounds[wallet.currency] }>
					<Icon />
				</Circle>
				<BadgeWrapper>
					<Badge
						bg={ CryptoColors[wallet.currency] }
						text={ `${wallet?.balance.availableBalance.toFixed(4)} ${wallet?.currency} ` }
					/>
				</BadgeWrapper>
			</Side.Left>
			<Side.Right>
				{rate ? (
					<Text fontStyle={ FontStyles.BOLD } size={ 21 }>
						{(wallet?.balance.availableBalance * rate).toFixed(2)} $
					</Text>
				) : (
					<></>
				)}
			</Side.Right>
		</Wrapper>
	);
};

const Wrapper = styled.View<{ bg: string }>`
	width: 100%;
	padding: 16px;
	background-color: ${({ bg }) => bg};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	border-radius: 10px;
`;

const BadgeWrapper = styled.View`
	margin-left: 16px;
`;

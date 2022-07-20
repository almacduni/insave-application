import React, { FC, useEffect } from "react";
import styled from "styled-components/native";

import { getWallets, removeRates } from "../../redux/walletSliceNew";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { TopBar } from "../../components/TopBar/TopBar";
import { CurrencyButton } from "../../shared/ui";
import { Currency } from "../../types/commonTypes";
import { removeWalletCurrencies } from "../../helpers/walletHelpers";

export const CryptoSelectorScreen: FC<any> = ({ navigation, route }) => {
	const wallets = useAppSelector((state) => removeWalletCurrencies(state.walletNew.wallets, Currency.CLSH));
	const userId = useAppSelector((state) => state.user.userId);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userId) {
			dispatch(getWallets({ userId }));
		}

		return () => {
			dispatch(removeRates());
		};
	}, [userId]);

	return (
		<>
			<TopBar navigation={ navigation } backButtonTitle={ "Back" } title={ route.params?.name } />
			<Wrapper>
				{wallets.map((wallet, index) => (
					<CurrencyButton
						key={ index }
						currency={ wallet.currency }
						onPress={ () => {
							navigation.navigate(route.params?.destination, {
								walletIndex: index,
							});
						} }
					/>
				))}
			</Wrapper>
		</>
	);
};

const Wrapper = styled.View`
	padding: 0 16px;
	background-color: #fff;
	flex: 1;
`;

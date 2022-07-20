import React, { FC, useState, useEffect } from "react";
import styled from "styled-components/native";
import SInfo from "react-native-sensitive-info";

import { TopBar } from "../../components/TopBar/TopBar";
import { SelectedCurrency } from "../../entity/selected-currency";
import { CheckBox, Input, Text, Side, Button } from "../../shared/ui";
import { FontStyles } from "../../shared/model";
import { useAppSelector } from "../../hooks/useRedux";
import { NameCryptoRate, searchAPI } from "../../api/search-api";
import { userAPI } from "../../api/user-api";

export const CryptoWithdrawScreen: FC<any> = ({ navigation, route }) => {
	const userId = useAppSelector((state) => state.user.userId);
	const wallet = useAppSelector((state) => state.walletNew.wallets[route.params?.walletIndex ?? 0]);
	const balance = wallet.balance.availableBalance;
	const rateName = NameCryptoRate[wallet.currency];

	const [cryptoValue, setCryptoValue] = useState("0");
	const [convertCryptoIntoUSD, setConvertCryptoIntoUSD] = useState("");
	const [error, setError] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [address, setAddress] = useState("");
	const [isReadyToTransfer, setIsReadyToTransfer] = useState(false);
	const [rate, setRate] = useState(0);

	useEffect(() => {
		if (wallet.currency) {
			searchAPI.getCryptoRate(NameCryptoRate[wallet.currency]).then((rateValue: number) => setRate(rateValue));
		}
	}, [wallet.currency]);

	useEffect(() => {
		SInfo.getItem(rateName, {}).then((savedAddress: string) => {
			if (savedAddress) {
				setAddress(savedAddress);
				setIsChecked(true);
			}
		});
	}, []);

	useEffect(() => {
		setConvertCryptoIntoUSD(cryptoValue ? `${(Number(cryptoValue) * rate).toFixed(2)} $` : "");
	}, [cryptoValue]);

	useEffect(() => {
		if (isChecked && !!address) SInfo.setItem(rateName, address, {});
	}, [address]);

	useEffect(() => {
		if (isChecked) {
			SInfo.setItem(rateName, address, {});
		} else {
			SInfo.deleteItem(rateName, {});
		}
	}, [isChecked]);

	useEffect(() => {
		if (Number(cryptoValue) > balance) {
			setError(true);

			return;
		}
		setError(false);
	}, [cryptoValue]);

	useEffect(() => {
		if (!error && cryptoValue.length && address.length) {
			setIsReadyToTransfer(true);

			return;
		}
		setIsReadyToTransfer(false);
	}, [error, cryptoValue, address]);

	const changeCryptoValue = (value: string) => {
		setCryptoValue(value);
	};

	const changeCryptoAddress = (value: string) => {
		setAddress(value);
	};

	const submitTransfer = async () => {
		console.log("Press");
		try {
			await userAPI.getCryptoSecurityCode(
				{
					address,
					amount: cryptoValue,
					userId,
				},
				wallet.currency,
			);
			navigation.navigate("SecurityCodeOnTransactionScreen", {
				address,
				amount: cryptoValue,
				userId,
				currency: wallet.currency,
			});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<TopBar navigation={ navigation } backButtonTitle={ "Back" } title={ "Withdraw" } />
			<Wrapper>
				<SelectedCurrency walletIndex={ route.params?.walletIndex } />
				<AmountWrapper>
					<Text fontStyle={ FontStyles.BOLD } size={ 17 } style={ { marginBottom: 16 } }>
						Amount
					</Text>
					<Side.SpaceBetween>
						<Input
							width={ 167 }
							value={ cryptoValue }
							placeholder={ `0.00 ${wallet.currency}` }
							error={ error }
							keyboardType="number-pad"
							onChangeText={ changeCryptoValue }
						/>
						<Input width={ 167 } value={ convertCryptoIntoUSD } placeholder={ `0.00 $ ` } error={ error } />
					</Side.SpaceBetween>
				</AmountWrapper>
				<Text fontStyle={ FontStyles.BOLD } size={ 17 } style={ { marginBottom: 16 } }>
					Address
				</Text>
				<Input
					style={ { marginBottom: 16 } }
					value={ address }
					onChangeText={ changeCryptoAddress }
					placeholder={ "Enter address" }
				/>
				<CheckBox
					label={ "Remeber this adress" }
					isChecked={ isChecked }
					onPress={ () => setIsChecked(!isChecked) }
				/>
				<ButtonWrapper>
					<Button text={ "Withdraw" } disabled={ !isReadyToTransfer } onPress={ submitTransfer } />
				</ButtonWrapper>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 24px 16px;
`;

const AmountWrapper = styled.View`
	margin-top: 24px;
	margin-bottom: 32px;
`;

const ButtonWrapper = styled.View`
	margin-top: auto;
`;

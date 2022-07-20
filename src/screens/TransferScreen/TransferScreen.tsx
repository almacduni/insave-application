import * as React from "react";
import styled from "styled-components/native";

import { TopBar } from "../../components/TopBar/TopBar";
import { SelectedCurrency } from "../../entity/selected-currency";
import { useAppSelector } from "../../hooks/useRedux";
import { SelectedUser } from "../../entity/user-search";
import { Text, Button, Side } from "../../shared/ui";
import { CurrencyConverter } from "../../features/currency-converter";
import { FinanceAPI } from "../../shared/api";
import { FontStyles } from "../../shared/model";

export const TransferScreen: React.FC<any> = ({ navigation, route }) => {
	const wallet = useAppSelector((state) => state.walletNew.wallets[route.params?.walletIndex ?? 0]);
	const selectedUser = useAppSelector((state) => state.userSearch.selectedUser);
	const senderId = useAppSelector((state) => state.user.userId);
	const [amount, setAmount] = React.useState("");
	const [error, setError] = React.useState(false);

	const onChangeAmount = (amountValue: string) => {
		setError(+amountValue > wallet.balance.availableBalance);
		setAmount(amountValue);
	};

	const transfer = async () => {
		if (selectedUser?.id && senderId) {
			const request = {
				amount,
				cryptoCurrency: wallet.currency,
				recipientId: selectedUser?.id,
				senderId,
			};

			try {
				await FinanceAPI.makeTransfer(request);
				navigation.navigate("SuccessTransferScreen");
			} catch (e) {
				navigation.navigate("ErrorTransferScreen");
			}
		}
	};

	return (
		<>
			<TopBar navigation={ navigation } backButtonTitle={ "Back" } title={ "Transfers" } />
			<Wrapper>
				<Text size={ 17 } fontStyle={ FontStyles.SEMI_BOLD } style={ { marginBottom: 6 } }>
					Recipient
				</Text>
				<SelectedUser />
				<Text size={ 17 } fontStyle={ FontStyles.SEMI_BOLD } style={ { marginBottom: 6, marginTop: 12 } }>
					Available
				</Text>
				<SelectedCurrency walletIndex={ route.params?.walletIndex } />

				<InputWrapper>
					<Text
						size={ 17 }
						fontStyle={ FontStyles.SEMI_BOLD }
						style={ { marginBottom: 6, marginTop: 12 } }
					>
						Amount
					</Text>
					<CurrencyConverter
						autoFocus
						currency={ wallet.currency }
						onChange={ onChangeAmount }
						error={ error }
					/>
					{error ? (
						<Side.Left>
							<Text size={ 12 } color={ "rgba(235, 0, 70, 1)" } style={ { marginTop: 6 } }>
								This amount is not available to you
							</Text>
						</Side.Left>
					) : (
						<></>
					)}
				</InputWrapper>
				<ButtonWrapper>
					<Button text="Transfer" disabled={ error || +amount === 0 } onPress={ transfer } />
				</ButtonWrapper>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.View`
	padding: 24px 16px;
	flex: 1;
	background-color: #fff;
`;

const ButtonWrapper = styled.View`
	margin-top: auto;
`;

const InputWrapper = styled.View`
	padding-top: 12px;
`;

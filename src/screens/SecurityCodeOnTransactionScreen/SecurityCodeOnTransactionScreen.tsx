import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styled from "styled-components/native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import ArrowLeft from "../../assets/arrowLeft.svg";
import { CustomKeyboard } from "../../components/CustomKeyboard/CustomKeyBoard";
import { ConfirmationCode } from "../../components/ConfirmationCode/ConfirmationCode";
import { userAPI } from "../../api/user-api";
import { useAppSelector } from "../../hooks/useRedux";
import { cutEmail } from "../../helpers/text";
import { Currency } from "../../types/commonTypes";

export type ConfirmationCodeType = {
	id: number;
	value: string | number;
	active: boolean;
};

const initTime = new Date();

initTime.setSeconds(initTime.getSeconds() + 59);

type RouteParams = {
	Route: {
		address: string;
		amount: string;
		userId: number;
		currency: Currency;
	};
};

export const SecurityCodeOnTransactionScreen = () => {
	const navigation = useNavigation();
	const {
		params: { address, amount, userId, currency },
	} = useRoute<RouteProp<RouteParams, "Route">>();

	const userEmail = useAppSelector((state) => state.user.email);
	const [isResendCode, setIsResendCode] = useState(false);
	const [isReadyToTransaction, setIsReadyToTransaction] = useState(false);

	const [codeItems, setCodeItems] = useState<ConfirmationCodeType[]>([
		{ id: 0, value: "", active: true },
		{ id: 1, value: "", active: false },
		{ id: 2, value: "", active: false },
		{ id: 3, value: "", active: false },
		{ id: 4, value: "", active: false },
		{ id: 5, value: "", active: false },
	]);

	const [codeItemsStep, setCodeItemsStep] = useState(0);

	const isCodeItemEmpty = (item: ConfirmationCodeType) => String(item.value).length === 0;

	useEffect(() => {
		if (codeItems.findIndex(isCodeItemEmpty) !== -1) {
			setIsReadyToTransaction(true);

			return;
		}
		setIsReadyToTransaction(false);
	}, [codeItems]);

	const onConfirmationCodeChange = (itemValue: number) => {
		if (codeItemsStep === codeItems.length) return;

		if (!isNaN(itemValue)) {
			const editCodeItems = [...codeItems];

			editCodeItems[codeItemsStep].value = itemValue;
			editCodeItems[codeItemsStep].active = false;

			if (codeItemsStep < codeItems.length - 1) editCodeItems[codeItemsStep + 1].active = true;

			setCodeItems(editCodeItems);
			setCodeItemsStep(codeItemsStep + 1);
		}
	};

	const onConfirmationCodeDelete = () => {
		if (codeItemsStep <= 0) return;

		const removeValue = [...codeItems];

		removeValue[codeItemsStep - 1].value = "";
		removeValue[codeItemsStep - 1].active = true;

		if (codeItemsStep < codeItems.length) removeValue[codeItemsStep].active = false;

		setCodeItems(removeValue);
		setCodeItemsStep(codeItemsStep - 1);
	};

	const { seconds, restart } = useTimer({
		expiryTimestamp: Number(initTime),
		onExpire: () => setIsResendCode(false),
	});

	const resendCode = async () => {
		await userAPI.getCryptoSecurityCode(
			{
				address,
				amount,
				userId,
			},
			currency,
		);
		const time = new Date();

		time.setSeconds(time.getSeconds() + 59);
		restart(Number(time));
		setIsResendCode(true);
	};

	const toSuccessScreen = async () => {
		const code = codeItems.reduce((acc, item) => acc + item.value, "");
		const payload = { address, amount, userId };

		switch (currency) {
		case "ETH":
			await userAPI.withdrawEthereum(payload, code);
			break;
		case "BTC":
			await userAPI.withdrawBitcoin(payload, code);
			break;
		default:
			throw new Error(`Currency ${currency} not found`);
		}
		navigation.navigate("SuccessWithdrawScreen");
	};

	return (
		<Wrapper>
			<Header>
				<ButtonBack onPress={ () => navigation.goBack() }>
					<ArrowLeftIcon />
					<ButtonTitle>Back</ButtonTitle>
				</ButtonBack>
				<HeaderTitle>Withdraw</HeaderTitle>
			</Header>
			<SecurityCodeSection>
				<SecurityCodeTitle>Enter email security code</SecurityCodeTitle>
				<UserEmail>{cutEmail(userEmail)}</UserEmail>
				<ConfirmationCodeContainer>
					<ConfirmationCode isFailed={ false } codeList={ codeItems } />
				</ConfirmationCodeContainer>
				{!isResendCode && (
					<ResendCodeContainer>
						<ResendCodeBtn onPress={ resendCode }>Resend code</ResendCodeBtn>
					</ResendCodeContainer>
				)}
				{isResendCode && (
					<ResendCodeContainer>
						<ResendCodeTitle>Resend in </ResendCodeTitle>
						<ResendCodeTimer>0:{seconds >= 10 ? seconds : "0" + seconds}</ResendCodeTimer>
					</ResendCodeContainer>
				)}
				<WithdrawButton disabled={ !!isReadyToTransaction } onPress={ toSuccessScreen }>
					<WithdrawButtonTitle>Withdraw</WithdrawButtonTitle>
				</WithdrawButton>
				<CustomKeyboard { ...{ onConfirmationCodeChange } } { ...{ onConfirmationCodeDelete } } />
			</SecurityCodeSection>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	flex: 1;
	padding-bottom: ${verticalScale(20)}px;
	background-color: #fff;
`;

const Header = styled.View`
	padding: 12px 0;
	border-bottom-color: #efefef;
	border-bottom-width: ${scale(1)}px;
	align-items: center;
	justify-content: center;
	position: relative;
`;

const HeaderTitle = styled.Text`
	font-family: "ProximaNova-Semibold";
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #03061d;
`;

const ButtonBack = styled.TouchableOpacity`
	position: absolute;
	top: ${verticalScale(12)}px;
	left: ${scale(24)}px;
	flex-direction: row;
	align-items: center;
`;

const ButtonTitle = styled.Text`
	font-family: "ProximaNova-Regular";
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
	color: #03061d;
`;

const ArrowLeftIcon = styled(ArrowLeft)`
	margin-right: ${scale(8)}px;
`;

const SecurityCodeSection = styled.View`
	margin-top: ${verticalScale(36)}px;
	padding: 0 16px;
	flex: 1;
`;

const SecurityCodeTitle = styled.Text`
	font-family: "ProximaNova-Semibold";
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	margin-bottom: ${verticalScale(26)}px;
`;

const UserEmail = styled.Text`
	font-family: "ProximaNova-Regular";
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
	margin-bottom: ${verticalScale(16)}px;
`;

const ConfirmationCodeContainer = styled.View`
	margin-bottom: ${verticalScale(24)}px;
`;

const ResendCodeBtn = styled.Text`
	font-family: "ProximaNova-Semibold";
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #566aec;
`;

const ResendCodeContainer = styled.View`
	margin-bottom: auto;
	flex-direction: row;
`;

const ResendCodeTitle = styled.Text`
	font-family: "ProximaNova-Semibold";
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: rgba(3, 6, 29, 0.2);
`;
const ResendCodeTimer = styled.Text`
	font-family: "ProximaNova-Regular";
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
	color: #03061d;
`;

const WithdrawButton = styled.TouchableOpacity<{ disabled: boolean }>`
	background: ${({ disabled }) => (disabled ? "rgba(86, 106, 236, 0.5)" : "#566aec")};
	border-radius: ${scale(10)}px;
	padding: 14px 0;
	align-items: center;
	justify-content: center;
	margin-bottom: ${verticalScale(24)}px;
`;
const WithdrawButtonTitle = styled.Text`
	font-family: "ProximaNova-Semibold";
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #ffffff;
`;

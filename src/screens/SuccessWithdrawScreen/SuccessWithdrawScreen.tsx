import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import SuccessIcon from "../../assets/success-withdraw-icon.svg";

export const SuccessWithdrawScreen = () => {
	const navigation = useNavigation();

	const goHome = () => navigation.navigate("TabRouting");

	return (
		<Wrapper>
			<IconWrapper>
				<SuccessIcon />
			</IconWrapper>
			<Title>Translation completed successfully</Title>
			<WithdrawButton onPress={ goHome }>
				<WithdrawButtonTitle>Go to Wallet</WithdrawButtonTitle>
			</WithdrawButton>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	flex: 1;
	padding-top: ${verticalScale(250)}px;
	align-items: center;
	padding: 250px 16px 0;
	background-color: #fff;
`;

const IconWrapper = styled.View`
	width: ${scale(55)}px;
	height: ${scale(55)}px;
	border-radius: ${scale(27)}px;
	border-width: ${scale(2)}px;
	border-color: #566aec;
	align-items: center;
	justify-content: center;
	margin-bottom: ${verticalScale(16)}px;
`;

const Title = styled.Text`
	font-family: "ProximaNova-Bold";
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	text-align: center;
	max-width: ${scale(292)}px;
	margin-bottom: auto;
`;

const WithdrawButton = styled.TouchableOpacity`
	width: 100%;
	background: #566aec;
	border-radius: ${scale(10)}px;
	padding: ${verticalScale(14)}px 0;
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

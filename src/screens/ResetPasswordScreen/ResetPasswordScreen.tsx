import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import ArrowLeft from "../../assets/arrowLeft.svg";
// import { UniversalButtonBlock } from "../LoginScreen/LoginScreen";
import { RootStackParamList } from "../../routes/Routing";

type ResetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, "ResetPassword">;

type ResetPasswordScreenPropsType = {
	navigation: ResetPasswordScreenNavigationProp;
};

export const ResetPasswordScreen: React.FC<ResetPasswordScreenPropsType> = ({ navigation }) => {
	const [isMobile, setIsMobile] = useState(false);

	const setVariantResetPassword = () => {
		setIsMobile(!isMobile);
	};

	return (
		<Container>
			<Header onPress={ () => Alert.alert("Back to Login") }>
				<WrapperArrow>
					<ArrowLeft />
				</WrapperArrow>
				<BackToLogin onPress={ () => navigation.navigate("LoginScreen") }>Log in</BackToLogin>
			</Header>
			<ResetPasswordWrapper>
				<TitleHeader>Reset Password</TitleHeader>
			</ResetPasswordWrapper>
			<EmailGroup>
				{!isMobile ? (
					<>
						<Text>Email</Text>
						<LoginWithMobile onPress={ setVariantResetPassword }>Switch to Mobile</LoginWithMobile>
					</>
				) : (
					<>
						<Text>Phone</Text>
						<LoginWithMobile onPress={ setVariantResetPassword }>Switch to Email</LoginWithMobile>
					</>
				)}
			</EmailGroup>
			{!isMobile ? (
				<InputEmail keyboardType={ "email-address" } />
			) : (
				<InputEmail keyboardType={ "numeric" } />
			)}
			{/* <UniversalButtonBlock onPress={ () => {} } buttonName={ "Submit" } /> */}
		</Container>
	);
};

const Container = styled.View`
	background: #fdfdfd;
	height: 100%;
	padding: 10px 16px 0 16px;
`;
const Header = styled.Text`
	flex-direction: row;
	width: 100px;
`;
const WrapperArrow = styled.Text`
	margin-top: 6px;
	padding-right: 10px;
`;
const BackToLogin = styled.Text`
	font-size: 20px;
	margin-left: 6px;
`;
const ResetPasswordWrapper = styled.View`
	flex-direction: row;
	justify-content: center;
	margin-top: -28px;
`;
const TitleHeader = styled.Text`
	font-size: 20px;
`;
const EmailGroup = styled.View`
	margin-top: 4%;
	flex-direction: row;
	justify-content: space-between;
`;
const LoginWithMobile = styled.Text`
	color: #344cd3;
`;
const InputEmail = styled.TextInput`
	background-color: rgba(37, 37, 37, 0.03);
	border-width: 2px;
	border-color: #252525;
	opacity: 0.25;
	border-radius: 5px;
	height: 34px;
	padding-left: 6px;
	font-size: 26px;
	margin-top: 5px;
`;

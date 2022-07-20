import React, { useEffect, useRef } from "react";
import { Keyboard, TextInput } from "react-native";
import styled from "styled-components/native";
import { Controller, FieldError } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { TextInputField } from "../../components/TextInputField/TextInputField";
import { CONTENT_WIDTH } from "../../constants/sizes";
import { SignInForm } from "./LoginScreen";

interface IProps {
	currentStep: number;
	navigation: any;
	usernameOrEmailError?: FieldError;
	passwordError?: FieldError;
	usernameErrorMessage?: string;
	passwordErrorMessage?: string;
	control: Control<SignInForm>;
	handleSubmit: () => void;
	setIsOpenRestorePassword: (isOpenRestorePassword: boolean) => void;
}

export const LoginStep1: React.FC<IProps> = (props) => {
	const { currentStep, navigation, usernameOrEmailError, setIsOpenRestorePassword, passwordError, usernameErrorMessage, passwordErrorMessage, control, handleSubmit } = props;
	const activeStep = 0;
	const isFocused = activeStep === currentStep;
	const usernameInputRef = useRef<TextInput>(null as TextInput | null);
	const usernameOrEmailRules = {
		required: "username/email is required",
		minLength: {
			value: 2,
			message: "Minimum length is 2"
		}
	};
	const passwordRules = {
		required: "Password is required",
		pattern: {
			value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
			message: "Error with validation password",
		},
	};

	function handlePressForgotPassword () {
		setTimeout(() => {
			setIsOpenRestorePassword(true);
		}, 0);
		Keyboard.dismiss();
	}

	useEffect(() => {
		if (isFocused) {
			usernameInputRef.current?.focus();
		}
	}, [currentStep]);

	return (
		<Container contentWidth={ CONTENT_WIDTH }>
			<StepTitle>Log in</StepTitle>
			<Controller
				control={ control }
				name="usernameOrEmail"
				render={ ({ onChange, onBlur, value }) => (
					<TextInputField
						handleChange={ onChange }
						handleBlur={ onBlur }
						value={ value }
						type="email-address"
						inputRef={ usernameInputRef }
						placeholder="Email or username"
						isError={ !!usernameOrEmailError }
						error={ usernameOrEmailError }
						onSubmitEditing={ handleSubmit }
					/>
				) }
				rules={ usernameOrEmailRules }
				defaultValue=""
			/>
			<Controller
				control={ control }
				name="password"
				render={ ({ onChange, onBlur, value }) => (
					<TextInputField
						password={ true }
						secureTextEntry={ true }
						handleChange={ onChange }
						handleBlur={ onBlur }
						value={ value }
						placeholder="Password"
						isError={ !!passwordError }
						error={ passwordError }
						onSubmitEditing={ handleSubmit }
					/>
				) }
				rules={ passwordRules }
				defaultValue=""
			/>
			<ForgotContainer
				onPress={ handlePressForgotPassword }
			>
				<ForgotText>Forgot password?</ForgotText>
			</ForgotContainer>

			{!!usernameErrorMessage && (
				<ErrorMessageContainer>
					<ErrorMessageTitle>{usernameErrorMessage}</ErrorMessageTitle>
				</ErrorMessageContainer>
			)}
			{!!passwordErrorMessage && (
				<ErrorMessageContainer>
					<ErrorMessageTitle>{passwordErrorMessage}</ErrorMessageTitle>
				</ErrorMessageContainer>
			)}
		</Container>
	);
};

const Container = styled.View<{contentWidth: number}>`
	width: ${({ contentWidth }) => contentWidth};
`;
const StepTitle = styled.Text`
	margin-top: ${verticalScale(32)}px;
	margin-bottom: ${verticalScale(24)}px;
	font-family: ProximaNova-Semibold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #03061d;
`;

const ErrorMessageContainer = styled.View`
	background: rgba(227, 31, 90, 0.1);
	padding: ${scale(8)}px;
	border-radius: ${scale(10)}px;
	margin-top: ${verticalScale(8)}px;
`;

const ErrorMessageTitle = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #e31f5a;
`;

const ForgotContainer = styled.TouchableOpacity`
	margin-bottom: ${verticalScale(5)}px;
`;
const ForgotText = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #566aec;
`;

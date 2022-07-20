import React, { useRef } from "react";
import { TextInput } from "react-native";
import { Control, Controller, FieldError } from "react-hook-form";
import styled from "styled-components/native";

import { TextInputField } from "../../components/TextInputField/TextInputField";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import CheckMarkCrossIcon from "../../assets/CheckMarkCrossIcon.svg";
import CheckMarkOkIcon from "../../assets/CheckMarkOkIcon.svg";
import { SignUpForm } from "./RegistrationScreen";
import { CONTENT_WIDTH } from "../../constants/sizes";

interface IProps {
	control: Control<SignUpForm>;
	currentStep: number;
	error?: FieldError;
	password: string;
	passwordRepeat: string;
}

export const RegistrationStep2: React.FC<IProps> = (props) => {
	const { control, password, passwordRepeat, currentStep, error } = props;
	const passwordInputRef = useRef<TextInput>(null as TextInput | null);
	const activeStep = 2;
	const isFocused = activeStep === currentStep;
	const isPasswordsAreSame =
		!!password?.length && !!passwordRepeat?.length && password === passwordRepeat;
	const passwordRules = {
		required: "Password is required",
		pattern: {
			value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
			message: "Error with validation password",
		},
	};

	const repeatedPasswordRules = {
		required: "Password repeat is required",
		validate: (value: string) => value === password || "The passwords do not match",
	};

	function returnCheckMark (condition: boolean) {
		if (condition) {
			return (
				<ErrorIconField>
					<CheckMarkOkIcon />
				</ErrorIconField>
			);
		}

		return (
			<ErrorIconField>
				<CheckMarkCrossIcon />
			</ErrorIconField>
		);
	}
	React.useEffect(() => {
		if (isFocused) {
			passwordInputRef.current?.focus();
		}
	}, [currentStep]);

	return (
		<Container width={ CONTENT_WIDTH }>
			<StepTitle>Pick a password</StepTitle>
			<Controller
				control={ control }
				name="password"
				render={ ({ onChange, onBlur, value }) => (
					<TextInputField
						password={ true }
						handleChange={ onChange }
						handleBlur={ onBlur }
						value={ value }
						inputRef={ passwordInputRef }
						placeholder="Min. 8 characters"
						secureTextEntry={ true }
						error={ error }
					/>
				) }
				rules={ passwordRules }
				defaultValue=""
			/>
			<Controller
				control={ control }
				name="passwordRepeat"
				render={ ({ onChange, onBlur, value }) => (
					<TextInputField
						password={ true }
						handleChange={ onChange }
						handleBlur={ onBlur }
						value={ value }
						secureTextEntry={ true }
						placeholder="Repeat it"
					/>
				) }
				rules={ repeatedPasswordRules }
				defaultValue=""
			/>
			<ErrorsPasswordContainer>
				<ErrorItem>
					<ErrorText>{returnCheckMark(password?.length >= 8)}8 characters</ErrorText>
				</ErrorItem>
				<ErrorItem>
					<ErrorText>
						{returnCheckMark(/(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/.test(password))}1 number and uppercase
						letter
					</ErrorText>
				</ErrorItem>
				<ErrorItem>
					<ErrorText>
						{returnCheckMark(isPasswordsAreSame)}
						Passwords match
					</ErrorText>
				</ErrorItem>
			</ErrorsPasswordContainer>
		</Container>
	);
};

const Container = styled.View<{width: number}>`
	width: ${({ width }) => `${width}px`}
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

const ErrorsPasswordContainer = styled.View`
	display: flex;
	flex-direction: column;

	margin-left: ${scale(2)}px;
`;

const ErrorItem = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 2px;
`;
const ErrorText = styled.Text`
	letter-spacing: ${scale(0.25)}px;
	color: #252525;
	line-height: ${verticalScale(20)}px;
	font-size: ${scale(14)}px;
`;

const ErrorIconField = styled.View`
	padding-right: ${scale(8)}px;
	transform: translateY(${verticalScale(2)}px);
`;

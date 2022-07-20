import React, { useRef } from "react";
import { TextInput } from "react-native";
import { Control, Controller, FieldError } from "react-hook-form";
import styled from "styled-components/native";

import { TextInputField } from "../../components/TextInputField/TextInputField";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { SignUpForm } from "./RegistrationScreen";
import { CONTENT_WIDTH } from "../../constants/sizes";

interface IProps {
	currentStep: number;
	error?: FieldError;
	errorMessage?: string;
	control: Control<SignUpForm>;
	onChangeInput: () => void;
	handleSubmit: () => void;
}

export const RegistrationStep1: React.FC<IProps> = (props) => {
	const { currentStep, error, errorMessage, handleSubmit, control, onChangeInput } = props;
	const activeStep = 1;
	const isFocused = activeStep === currentStep;
	const emailInputRef = useRef(null as | TextInput | null);
	const emailRules = {
		required: "Email is required",
		pattern: {
			value: /\S+@\S+\.\S+/,
			message: "Email can’t be verified",
		},
	};

	function renderError (message: string) {
		return (
			<ErrorMessageContainer>
				<ErrorMessageTitle>{message}</ErrorMessageTitle>
			</ErrorMessageContainer>
		);
	}

	React.useEffect(() => {
		if (isFocused) {
			emailInputRef?.current?.focus();
		}
	}, [currentStep]);

	return (
		<Container contentWidth={ CONTENT_WIDTH }>
			<StepTitle>Enter your email</StepTitle>
			<Controller
				control={ control }
				name="email"
				render={ ({ onChange, onBlur, value }) => (
					<TextInputField
						handleChange={ onChange }
						handleBlur={ onBlur }
						value={ value }
						inputRef={ emailInputRef }
						type="email-address"
						password={ false }
						placeholder="Elon@musk.com"
						isError={ !!error }
						onChangeInput={ onChangeInput }
						error={ error }
						onSubmitEditing={ handleSubmit }
					/>
				) }
				defaultValue=""
				rules={ emailRules }
			/>
			{errorMessage && renderError(errorMessage)}
		</Container>
	);
};

const Container = styled.View<{contentWidth: number}>`
	width: ${({ contentWidth }) => `${contentWidth}px`}
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

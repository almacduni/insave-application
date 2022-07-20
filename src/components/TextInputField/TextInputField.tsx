import React, { Dispatch, RefObject, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import ErrorIcon from "../../assets/error-info-icon.svg";
import HidePasswordIcon from "../../assets/hide-password-icon.svg";
import ShowPasswordIcon from "../../assets/show-password-icon.svg";

export interface FormType {
	email: string;
	userPassword: string;
}

type TextInputFieldProps = {
	handleChange: (text: string) => void;
	handleBlur: any;
	onSubmitEditing?: () => void;
	value: string;
	secureTextEntry?: boolean;
	placeholder?: string;
	isError?: boolean;
	password?: boolean;
	onChangeInput?: any;
	error?: any;
	type?: "email-address" | "numeric";
	inputRef?: RefObject<TextInput>;
	autoFocus?: boolean;
	setValueSecondInput?: (arg1: string) => void;
	setSecureTextEntry?: Dispatch<boolean>;
};

export const TextInputField: React.FC<TextInputFieldProps> = ({
	handleChange,
	handleBlur,
	onSubmitEditing,
	value,
	isError,
	secureTextEntry,
	placeholder,
	password,
	inputRef,
	onChangeInput,
	type,
	setValueSecondInput,
	error,
	autoFocus,
}) => {
	const [isFocusedInput, setIsFocusedInput] = useState<boolean>(false);
	const [checkError, setCheckError] = useState<boolean>(false);
	const [isShowingPass, setIsShowingPass] = useState(secureTextEntry);
	const checkerColorInput = () => {
		if (error?.hasOwnProperty("message") && isError) {
			return {
				borderWidth: 1,
				borderColor: "#E31F5A",
			};
		} else if (isFocusedInput) {
			return {
				borderWidth: 1,
				borderColor: "#566aec",
			};
		} else {
			return {
				borderWidth: 1,
				borderColor: "#e5e5e5",
			};
		}
	};

	function onShowPassword () {
		setIsShowingPass(false);
	}

	function onHidePassword () {
		setIsShowingPass(true);
	}
	function handleBlurInput () {
		handleBlur();
		setIsFocusedInput(false);
	}
	function handleFocusInput () {
		setIsFocusedInput(true);
	}

	async function handleChangeText (text: string) {
		handleChange(text);
		setCheckError(true);
		if (setValueSecondInput) {
			setValueSecondInput(text);
		}

		if (onChangeInput) {
			try {
				await onChangeInput(text);
			} catch (e) {
				console.log(e);
			}
		}
	}

	function renderPasswordIcon () {
		if (secureTextEntry && isShowingPass) {
			return (
				<IconContainer onPress={ onShowPassword }>
					<ShowPasswordIcon />
				</IconContainer>
			);
		}
		if (secureTextEntry && !isShowingPass) {
			return (
				<IconContainer onPress={ onHidePassword }>
					<HidePasswordIcon />
				</IconContainer>
			);
		}
	}
	function renderErrorIcon () {
		if (!!isError && checkError && !password) {
			return (
				<InfoErrorIcon />
			);
		}
	}

	return (
		<InputFieldWrapper>
			<TextInput
				ref={ inputRef }
				autoFocus={ autoFocus }
				onChangeText={ handleChangeText }
				onFocus={ handleFocusInput }
				onBlur={ handleBlurInput }
				keyboardType={ type ?? "default" }
				value={ value }
				blurOnSubmit={ false }
				onSubmitEditing={ onSubmitEditing }
				secureTextEntry={ isShowingPass }
				placeholder={ placeholder }
				placeholderTextColor={ "#9A9BA5" }
				autoCapitalize="none"

				style={ [ checkerColorInput(),
					styles.input ] }
			/>
			{renderErrorIcon()}
			{renderPasswordIcon()}
		</InputFieldWrapper>
	);
};

const styles = StyleSheet.create({
	input: {
		backgroundColor: "#fff",
		borderWidth: scale(1),
		borderRadius: scale(10),
		fontSize: scale(16),
		height: verticalScale(48),
		paddingVertical: 0,
		paddingHorizontal: scale(16),
		paddingRight: scale(45),
		marginBottom: verticalScale(8),
	}
});

const InputFieldWrapper = styled.View`
	position: relative;
	margin-bottom: ${verticalScale(12)}px;
`;

const InfoErrorIcon = styled(ErrorIcon)`
	position: absolute;
	top: ${verticalScale(13)}px;
	z-index: 2138181231;
	right: ${scale(18)}px;
`;

const IconContainer = styled.TouchableOpacity`
	position: absolute;
	top: ${verticalScale(13)}px;
	right: ${scale(18)}px;
`;

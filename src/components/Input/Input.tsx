import React, { FC, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Controller } from "react-hook-form";
import styled from "styled-components/native";

import ErrorIcon from "../../assets/error-info-icon.svg";
import HidePasswordIcon from "../../assets/hide-password-icon.svg";
import ShowPasswordIcon from "../../assets/show-password-icon.svg";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { CircleProgress } from "../CommentBox/CircleProgress";

interface InputProps {
	control: any;
	name: string;
	password?: boolean;
	required?: boolean;
	placeholder?: string;
	defaultValue?: string;
	label?: string;
	type?: "email-address" | "numeric";
	isBio?: boolean;
	isError?: boolean;
	autoFocus?: boolean;
	multiline?: boolean;
	onUserNameChange?: () => void;
	maxLength?: number;
	onChangeText?: (args: any) => any;
	getValues?: any;
}

export const Input: FC<InputProps> = ({
	control,
	name,
	password = false,
	required = true,
	placeholder = "",
	defaultValue = "",
	label = "",
	type,
	isError = false,
	isBio = false,
	autoFocus = false,
	onUserNameChange,
	maxLength,
	multiline = false,
	onChangeText = () => {},
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [valueInput, setValueInput] = useState(defaultValue);
	const textLimitPercent = Math.round((valueInput.length / 140) * 100);
	const [passwordVisible, setPasswordVisible] = useState(true);

	const showPassword = (
		<TouchableOpacity onPress={ () => setPasswordVisible(false) }>
			<ShowPasswordIcon />
		</TouchableOpacity>
	);

	const hidePassword = (
		<TouchableOpacity onPress={ () => setPasswordVisible(true) }>
			<HidePasswordIcon />
		</TouchableOpacity>
	);

	return (
		<InputWrapper>
			{!!label && <InputLabel>{label}</InputLabel>}
			<Controller
				control={ control }
				rules={ { required } }
				render={ ({ onChange, onBlur, value }) => (
					<FieldWrapper>
						<Field
							{ ...{
								value,
								placeholder,
								isFocused,
								isError: isError && !!value,
								autoFocus,
								multiline,
							} }
							keyboardType={ type ? type : "default" }
							secureTextEntry={ password ? passwordVisible : false }
							onChangeText={ (text) => {
								onChange(text);
								onChangeText(text);
								if (isBio) {
									setValueInput(text);
								}
								if (onUserNameChange) {
									onUserNameChange();
								}
							} }
							onBlur={ () => {
								onBlur();
								setIsFocused(false);
							} }
							isBio={ isBio }
							onFocus={ () => setIsFocused(true) }
							selectionColor={ "rgba(86, 106, 236, 1)" }
							maxLength={ maxLength }
						/>
						{isBio && (
							<CircularContainer>
								<CircleProgress percentage={ textLimitPercent } />
							</CircularContainer>
						)}
						<IconWrapper>
							{isError && (
								<ErrorIcon />
							)}
							{password && passwordVisible ? (
								showPassword
							) : password && (
								hidePassword
							)}

						</IconWrapper>
					</FieldWrapper>
				) }
				name={ name }
				defaultValue={ defaultValue }
			/>
		</InputWrapper>
	);
};

const InputWrapper = styled.View`
	flex-direction: column;
`;

const InputLabel = styled.Text`
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
	color: rgba(3, 6, 29, 1);
	margin-bottom: ${verticalScale(16)}px;
`;

const Field = styled.TextInput<{
	isError: boolean;
	isFocused: boolean;
	isBio: boolean;
}>`
	border-width: ${scale(1)}px;
	border-color: ${({ isError, isFocused }) => {
		if (isError) {
			return "#E31F5A";
		}
		if (isFocused) {
			return "rgba(86, 106, 236, 1)";
		}

		return "#CDCDD2";
	}};
	border-radius: ${scale(10)}px;
	font-family: ProximaNova-Regular;
	font-weight: 400;
	font-size: ${scale(16)}px;
	min-height: ${verticalScale(48)}px;
	padding: ${verticalScale(15)}px 16px;
	padding-right: ${({ isBio }) => (isBio ? `${scale(30)}px` : `${scale(5)}px`)};
	margin-bottom: ${verticalScale(16)}px;
	font-variant: lining-nums;
`;

const FieldWrapper = styled.View`
	position: relative;
`;

const IconWrapper = styled.View`
	position: absolute;
	right: ${scale(14)}px;
	top: ${verticalScale(13)}px;
	align-items: center;
`;

const CircularContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: absolute;
	right: ${scale(8)}px;
	bottom: 50%;
`;

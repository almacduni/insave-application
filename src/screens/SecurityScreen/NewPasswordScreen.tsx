import React, { FC, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components/native";
import { TextInput } from "react-native";

import CheckMarkOkIcon from "../../assets/CheckMarkOkIcon.svg";
import { TopBar } from "../../components/TopBar/TopBar";
import CheckMarkCrossIcon from "../../assets/CheckMarkCrossIcon.svg";
import { Title } from "./ChangeEmailScreen";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { changePassword } from "../../redux/userSlice";
import { TextInputField } from "../../components/TextInputField/TextInputField";
import { KeyboardAvoid } from "../../components/KeyboardAvoid/KeyboardAvoid";

interface NewPasswordScreen {
	navigation: any;
}
//
enum ErrorTypes {
	LENGTH = "lengthError",
	UPPERCASE = "upperCaseError",
	NUMBER = "numberError",
	MATCH = "matchError",
}

export const NewPasswordScreen: FC<NewPasswordScreen> = ({ navigation }) => {
	const { control, handleSubmit, errors, getValues, watch } =
		useForm();
	const dispatch = useAppDispatch();
	const userId = useAppSelector((state) => state.user.userId);
	const [valueSecondInput, setValueSecondInput] = useState("");
	const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
	const [secureTextEntrySecond, setSecureTextEntrySecond] = useState<boolean>(true);
	const onSubmit = (data: any) => {
		if (data.password === data.passwordRepeat && userId) {
			const password = data.password;

			dispatch(changePassword({ userId, password }));
		}
	};

	const password = useRef({});

	password.current = watch("password", "");
	let passwordRefInput: null | TextInput;
	let passwordSecRefInput: null | TextInput;

	const checkIsDisabled = (values: typeof getValues): boolean | undefined => {
		const valuesInputs = values();

		if (valuesInputs.password && valuesInputs.passwordRepeat)
			return (
				(!valuesInputs.password.length && !valuesInputs.passwordRepeat.length) ||
				valuesInputs.password !== valuesInputs.passwordRepeat
			);
		else return true;
	};

	return (
		<KeyboardAvoid>
			<TopBar navigation={ navigation } title={ "Password" } backButtonTitle={ "Cancel" } />
			<Wrapper>
				<Title>New password</Title>
				<Controller
					control={ control }
					name="password"
					render={ ({ onChange, onBlur, value }) => (
						<TextInputField
							password={ true }
							handleChange={ onChange }
							handleBlur={ onBlur }
							value={ value }
							inputRef={ passwordRefInput }
							autoFocus={ true }
							placeholder="Your password"
							secureTextEntry={ secureTextEntry }
							setSecureTextEntry={ setSecureTextEntry }
							error={ errors.password }
						/>
					) }
					rules={ {
						required: "Password is required",
						pattern: {
							value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
							message: "Error with validation password",
						},
					} }
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
							setValueSecondInput={ setValueSecondInput }
							secureTextEntry={ secureTextEntrySecond }
							setSecureTextEntry={ setSecureTextEntrySecond }
							placeholder="Repeat it"
							error={ errors.passwordRepeat }
							inputRef={ passwordSecRefInput }
						/>
					) }
					rules={ {
						required: "Password repeat is required",
					} }
					defaultValue=""
				/>
				{/* {errors && errors.password && (
											<ErrorMessageContainer>
												<ErrorMessageTitle>{errors.password.message}</ErrorMessageTitle>
											</ErrorMessageContainer>
										)}
										{errors && errors.passwordRepeat && (
											<ErrorMessageContainer>
												<ErrorMessageTitle>{errors.passwordRepeat.message}</ErrorMessageTitle>
											</ErrorMessageContainer>
										)} */}
				<ErrorsPasswordContainer>
					<ErrorItem>
						<ErrorText>
							{getValues().password && getValues().password.length >= 8 ? (
								<ErrorIconField>
									<CheckMarkOkIcon />
								</ErrorIconField>
							) : (
								<ErrorIconField>
									<CheckMarkCrossIcon />
								</ErrorIconField>
							)}
							Min. 8 characters
						</ErrorText>
					</ErrorItem>
					<ErrorItem>
						<ErrorText>
							{/(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/.test(getValues().password) ? (
								<ErrorIconField>
									<CheckMarkOkIcon />
								</ErrorIconField>
							) : (
								<ErrorIconField>
									<CheckMarkCrossIcon />
								</ErrorIconField>
							)}
							1 number and uppercase letter
						</ErrorText>
					</ErrorItem>
					<ErrorItem>
						<ErrorText>
							{
								getValues().password &&
							getValues().password?.length !== 0 &&
							getValues().passwordRepeat?.length !== 0 &&
							getValues().password === getValues().passwordRepeat ? (
								<ErrorIconField>
											<CheckMarkOkIcon />
										</ErrorIconField>
									) : (
										<ErrorIconField>
											<CheckMarkCrossIcon />
										</ErrorIconField>
									)}
							Passwords match
						</ErrorText>
					</ErrorItem>
				</ErrorsPasswordContainer>

				<SubmitBtn
					primary={ !checkIsDisabled(getValues) }
					disabled={ checkIsDisabled(getValues) }
					onPress={ handleSubmit(onSubmit) }
				>
					<SubmitTitle>Save</SubmitTitle>
				</SubmitBtn>
			</Wrapper>
		</KeyboardAvoid>
	);
};
const Wrapper = styled.View`
	flex: 1;
	padding: 32px 16px;
	padding-bottom: 0;
`;

const ErrorIconField = styled.View`
	padding-right: ${scale(8)}px;
	transform: translateY(${verticalScale(2)}px);
`;

const SubmitBtn = styled.TouchableOpacity<{
	primary?: boolean;
	secondary?: boolean;
	disabled?: boolean;
}>`
	height: ${verticalScale(48)}px;
	align-items: center;
	justify-content: center;
	border-radius: ${scale(10)}px;
	background-color: ${({ primary }) => {
		if (primary) {
			return "#566AEC";
		}

		return "rgba(86, 106, 236, 0.5)";
	}};
	margin-bottom: ${verticalScale(16)}px;
`;

const ErrorsPasswordContainer = styled.View`
	display: flex;
	flex-direction: column;
	margin-top: ${verticalScale(10)}px;
	margin-left: ${scale(2)}px;
	margin-bottom: auto;
`;

const ErrorItem = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const ErrorText = styled.Text`
	letter-spacing: ${scale(0.25)}px;
	color: #252525;
	line-height: ${verticalScale(20)}px;
	font-size: ${scale(14)}px;
`;

const SubmitTitle = styled.Text`
	color: #ffffff;
	font-size: ${scale(17)}px;
	font-family: ProximaNova-Semibold;
`;

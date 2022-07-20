import React, { useRef } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";

import { verticalScale } from "../../helpers/sizeConverter";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { resetPassword } from "../../redux/userSlice";
import { TextInputField } from "../../components/TextInputField/TextInputField";
import { ButtonBack, Button, Circle, ExplanationBox, WithSafeArea } from "../../shared/ui";
import { KeyboardAvoid } from "../../components/KeyboardAvoid/KeyboardAvoid";
import MessageIcon from "../../assets/MessageIcon.svg";

export const RecoveryPasswordScreen: React.FC = ({ navigation }: any) => {
	const { control, errors, watch } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
	});

	const emailRefInput = useRef(null);
	const dispatch = useAppDispatch();
	const isFetching = useAppSelector((state) => state.user.isFetching);
	const emailFieldValue = watch("email");

	function handleGoBack () {
		navigation.navigate("LoginScreen");
	}
	async function onSubmitHandler () {
		await dispatch(resetPassword({ email: emailFieldValue }));

		Alert.alert(
			"Check your email",
			"If you're registered, then you should have received a recovery link to your email",
			[
				{ text: "Ok" }
			]
		);
	}

	function checkIsDisabled (): boolean {

		if (emailFieldValue) {

			return !/\S+@\S+\.\S+/.test(emailFieldValue);
		}

		return true;
	}

	function renderSubmitButton () {
		const isDisabled = checkIsDisabled();

		return (
			<Button
				size={ {
					height: 48,
				} }
				disabled={ isDisabled }
				text={ isFetching ? "Loading" : "Send" }
				onPress={ onSubmitHandler }
			/>
		);
	}

	return (
		<WithSafeArea>

			<KeyboardAvoid style={ { paddingTop: 12 } }>
				<HeaderBlock>
					<ButtonBack onPress={ handleGoBack } />
				</HeaderBlock>
				<DescriptionBox>
					<Circle size={ 48 } >
						<MessageIcon />
					</Circle>
					<Separator />
					<ExplanationBox
						sizes={ {
							title: {
								fontSize: 25,
								lineHeight: 36,
								marginBottom: 16,
							}
						} }
						title={ "Enter your email" }
						description={ `
						Enter your email address, we will send you
						a link to change your password
					` }
					/>
				</DescriptionBox>
				<ScreenView key="0">
					<Controller
						control={ control }
						name="email"
						render={ ({ onChange, onBlur, value }) => (
							<TextInputField
								handleChange={ onChange }
								handleBlur={ onBlur }
								value={ value }
								type="email-address"
								inputRef={ emailRefInput }
								placeholder="elonmusk@gmail.com"
								isError={ !!errors.email }
								error={ errors.email }
								autoFocus={ true }
							/>
						) }
						rules={ {
							required: "Email is required",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Email can’t be verified",
							},
						} }
						defaultValue=""
					/>
					{renderSubmitButton()}
				</ScreenView>
			</KeyboardAvoid>
		</WithSafeArea>

	);
};

const ScreenView = styled.View`
	flex: 0.5;
	flex-direction: column;
	justify-content: flex-end;
	padding-bottom: 16px;
`;

const DescriptionBox = styled.View`
	flex-direction: column;
	align-items: center;
	flex: 1;
`;

const HeaderBlock = styled.TouchableOpacity`
	align-self: flex-start;
	margin-bottom: ${verticalScale(10)}px;
`;

const Separator = styled.View`
	margin-top: ${verticalScale(48)}px;
`;

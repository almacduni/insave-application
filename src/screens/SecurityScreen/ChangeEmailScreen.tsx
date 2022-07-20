import React, { FC, useMemo } from "react";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { debounce } from "debounce";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { TopBar } from "../../components/TopBar/TopBar";
import { Input } from "../../components/Input/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { cutEmail } from "../../helpers/text";
import { authAPI } from "../../api/auth-api";
import { sendSecurityCodeEmail } from "../../redux/userSlice";
import { KeyboardAvoid } from "../../components/KeyboardAvoid/KeyboardAvoid";

interface ChangeEmailScreenProps {
	navigation: any;
}

export const ChangeEmailScreen: FC<ChangeEmailScreenProps> = ({ navigation }) => {
	const { control, handleSubmit, setError, errors, trigger, clearErrors, getValues } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
	});
	const { email, userId } = useAppSelector((state) => state.user);
	const cutedEmail = useMemo(() => cutEmail(email), [email]);
	const dispatch = useAppDispatch();
	const onSubmit = (data: any) => {
		dispatch(sendSecurityCodeEmail({ userId, email: data.email }));
		navigation.navigate("EmailCodeScreen", { email: data.email });
	};

	const onEmailChange = debounce(async (text: string) => {
		const result = await trigger("email");

		if (result) {
			try {
				await authAPI.checkEmail(text);
				clearErrors("email");
			} catch (e: any) {
				setError("email", { message: e.response.data.email, type: "email" });
			}
		}
	}, 400);

	return (
		<KeyboardAvoid>
			<TopBar navigation={ navigation } title={ "Email" } backButtonTitle={ "Cancel" } />
			<Wrapper>
				<Title>Change email</Title>
				<Input
					control={ control }
					label={ `Current email: ${cutedEmail}` }
					name={ "email" }
					type="email-address"
					autoFocus={ true }
					placeholder={ "Enter a new email" }
					onChangeText={ onEmailChange }
					isError={ !!errors.email?.message }
				/>

				<SubmitBtn disabled={ !!errors.email || !/\S+@\S+\.\S+/.test(getValues().email) } onPress={ handleSubmit(onSubmit) }>
					<SubmitTitle>Save</SubmitTitle>
				</SubmitBtn>
			</Wrapper>
		</KeyboardAvoid>
	);
};

export const Wrapper = styled.View`
	flex: 1;
	padding: 32px 16px;
	padding-bottom: 15px;
`;

export const ButtonWrapper = styled.View`
	position: absolute;
	left: ${scale(16)}px;
	right: ${scale(16)}px;
	bottom: ${verticalScale(2)}px;
`;

export const Title = styled.Text`
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	font-family: ProximaNova-Semibold;
	font-weight: 700;
	color: rgba(3, 6, 29, 1);
	margin-bottom: 32px;
`;

const SubmitBtn = styled.TouchableOpacity<{
	disabled?: boolean;
}>`
	height: ${verticalScale(48)}px;
	margin-top: auto;
	align-items: center;
	justify-content: center;
	border-radius: ${scale(10)}px;
	background-color: ${({ disabled }) =>
		disabled ? "rgba(86, 106, 236, 0.5)" : "rgba(86, 106, 236, 1)"};
`;

const SubmitTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #fff;
`;

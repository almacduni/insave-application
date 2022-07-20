import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";

import { TopBar } from "../../components/TopBar/TopBar";
import { Input } from "../../components/Input/Input";
import { Wrapper, Title } from "./ChangeEmailScreen";
import { authAPI } from "../../api/auth-api";
import { useAppSelector } from "../../hooks/useRedux";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { KeyboardAvoid } from "../../components/KeyboardAvoid/KeyboardAvoid";
import { SecurityScreens } from "../../shared/model";

interface IProps {
	navigation: any;
}
interface DataForm {
	oldPassword: string;
}
export const OldPasswordScreen: FC<IProps> = ({ navigation }) => {
	const { control, handleSubmit } = useForm<DataForm>();
	const [isError, setIsError] = useState(false);
	const [valueInput, setValueInput] = useState("");
	const userId = useAppSelector((state) => state.user.userId);

	const handleChangePassword = (value: string) => {
		if (isError) {
			setIsError(false);
		}
		setValueInput(value);
	};
	const onSubmit = async (data: DataForm): Promise<void> => {
		const password = data.oldPassword;

		if (userId) {
			try {
				const error: string | undefined = await authAPI.checkCurrentPassword({ userId, password });

				if (error) {
					setIsError(true);

					return;
				}
				navigation.navigate(SecurityScreens.NEW_PASSWORD);
			} catch (error) {
				console.log("Error", error);
			}
		}
	};

	return (
		<KeyboardAvoid>
			<TopBar navigation={ navigation } title={ "Password" } backButtonTitle={ "Cancel" } />
			<Wrapper>
				<Title>Enter password</Title>
				<Input
					password
					control={ control }
					label={ "Enter you current password to continue" }
					name={ "oldPassword" }
					placeholder={ "Password" }
					isError={ isError }
					onChangeText={ handleChangePassword }
					autoFocus
				/>
				<SubmitBtn
					disabled={ !/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(valueInput) }
					onPress={ handleSubmit(onSubmit) }
				>
					<SubmitTitle>Send</SubmitTitle>
				</SubmitBtn>
			</Wrapper>
		</KeyboardAvoid>
	);
};

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
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #fff;
`;

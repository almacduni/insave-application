import React, { FC } from "react";
import styled from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImagePickerResponse } from "react-native-image-picker";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { debounce } from "debounce";

import { TopBar } from "../../components/TopBar/TopBar";
import { ImageUploader } from "../../components/ImageUploader/ImageUploader";
import { Input } from "../../components/Input/Input";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { updateAvatar, updateBio } from "../../redux/userSlice";
import { userAPI } from "../../api/user-api";

enum InputNames {
	USERNAME = "username",
	BIO = "bio",
	IMAGE = "image",
}
interface SubmitDataType {
	[InputNames.USERNAME]: string;
	[InputNames.BIO]: string;
	[InputNames.IMAGE]: ImagePickerResponse;
	userId: null | number;
}

interface AccountEditProps {
	navigation: StackNavigationProp<any, "AccountEdit">;
}

export const AccountEdit: FC<AccountEditProps> = ({ navigation }) => {
	const { control, register, getValues, trigger, setError, errors } = useForm();
	const { username, bio, userId } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const onSubmit = (data: SubmitDataType) => {
		dispatch(updateBio({ ...data, userId }));
		// const formData = new FormData();

		// formData.append("file", {
		// 	file: data.image.assets[0].uri,
		// 	type: data.image.assets[0].type || "image/jpg",
		// 	name: data.image.assets[0].fileName,
		// });
		dispatch(updateAvatar({ data: data.image, userId }));

		navigation.goBack();
	};
	const onUserNameChange = debounce(async () => {
		const result = await trigger("username");

		if (result) {
			try {
				const error = await userAPI.checkUserNameInput(getValues().username);

				if (error) {
					return setError("username", { message: "Username is already in use", type: "username" });
				}
			} catch (error) {
				console.log("Error onUserNameChange", error);
			}
		}
	}, 300);

	return (
		<>
			<TopBar
				navigation={ navigation }
				title={ "" }
				backButtonTitle={ "Back" }
				paddingByY={ 8 }
				paddingRight={ 10 }
				goBack={ () => {
					navigation.navigate("Account");
				} }
			>
				<SaveButton
					activeOpacity={ 0.8 }
					disabled={ !!errors.username }
					onPress={ () => {
						onSubmit(control.getValues() as any);
					} }
				>
					<SaveButtonTitle>save</SaveButtonTitle>
				</SaveButton>
			</TopBar>
			<Wrapper>
				<ImageUploader
					title={ "Update image" }
					username={ username }
					onImageSelect={ (response) => {
						register({ name: InputNames.IMAGE });
						control.setValue(InputNames.IMAGE, response);
					} }
				/>
				<InputsBox>
					<Input
						autoFocus
						control={ control }
						name={ InputNames.USERNAME }
						placeholder={ "Username" }
						onUserNameChange={ onUserNameChange }
						defaultValue={ username || "" }
					/>
					<Input
						multiline={ true }
						maxLength={ 140 }
						isBio
						getValues={ getValues }
						control={ control }
						name={ InputNames.BIO }
						placeholder={ "Genius, billionaire, playboy, philanthropist" }
						defaultValue={ bio || "" }
					/>
					{errors.username && errors.username.message === "Username is already in use" && (
						<Text>Username is already in use</Text>
					)}
				</InputsBox>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	background-color: #fff;
	padding: 16px;
`;

const SaveButton = styled.TouchableOpacity`
	width: ${scale(72)}px;
	height: ${verticalScale(28)}px;
	border-radius: ${scale(44)}px;
	background: #566aec;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-left: auto;
`;

const SaveButtonTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	text-align: center;
	letter-spacing: ${scale(0.25)}px;
	color: #ffffff;
`;

const InputsBox = styled.View`
	padding-top: ${verticalScale(32)}px;
`;

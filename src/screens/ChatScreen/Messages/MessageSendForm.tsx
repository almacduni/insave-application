import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import { launchImageLibrary } from "react-native-image-picker";

import SendMessageIcon from "../../../assets/sendMessageIcon.svg";
import UploadImageIcon from "../../../assets/image.svg";
import { scale } from "../../../helpers/sizeConverter";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { sendMessage, setAssets, deleteAsset } from "../../../redux/chatSlice";
import { SelectedImage } from "../../../components/SelectedImage/SelectedImage";

export const MessageSendForm = () => {
	const { control, handleSubmit, reset } = useForm<any>();
	const userId = useAppSelector((state) => state.user.userId);
	const images = useAppSelector((state) => state.chat.selectedImages);
	const chat = useAppSelector((state) => state.chat.activeChat);
	const dispatch = useAppDispatch();

	function onSubmit (data: any) {
		if (chat) {
			const formData = new FormData();

			formData.append("chatId", `${chat?.chatId}`);
			formData.append("userId", `${userId || ""}`);
			formData.append("creationDate", `${Date.now()}`);
			formData.append("text", data.message);
			images.forEach((image) => {
				formData.append("files", {
					uri: image.uri,
					type: image.type ?? "",
					name: image.fileName,
				});
			});
			dispatch(sendMessage(formData));
			dispatch(setAssets([]));
			reset({ message: "" });
		}
	}

	function renderMessageInput ({ onChange, onBlur, value }: {
		onChange: (...event: any[]) => void;
		onBlur: () => void;
		value: any;
	}) {
		return (
			<Input
				multiline={ true }
				onBlur={ onBlur }
				onChangeText={ onChange }
				value={ value }
				placeholder={ "Hi, what’s happening there?" }
			/>
		);
	}

	function loadImages ({ assets }: any) {
		dispatch(setAssets(assets));
	}

	function renderImage ({ item }: any) {
		return (
			<SelectedImage
				uri={ item.uri }
				onClose={ () => {
					dispatch(deleteAsset({ uri: item.uri }));
				} }
			/>
		);
	}

	function showImageLibrary () {
		launchImageLibrary(
			{
				mediaType: "photo",
				selectionLimit: 10,
			},
			loadImages,
		);
	}

	return (
		<Wrapper>
			<FormContainer>
				<Button
					onPress={ showImageLibrary }
				>
					<UploadImageIcon />
				</Button>
				<Controller
					control={ control }
					rules={ {
						maxLength: 100,
					} }
					render={ renderMessageInput }
					name="message"
					defaultValue=""
				/>
				<Button onPress={ handleSubmit(onSubmit) }>
					<SendMessageIcon />
				</Button>
			</FormContainer>
			<ImagesList
				showsHorizontalScrollIndicator={ false }
				data={ images }
				renderItem={ renderImage }
				horizontal
				contentContainerStyle={ {
					paddingRight: scale(16),
				} }
			/>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	display: flex;
	flex-direction: column;
`;

const FormContainer = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0 16px;
`;

const Input = styled.TextInput`
	max-width: ${scale(260)}px;
	width: 100%;
`;

const Button = styled.TouchableOpacity`
	padding-top: 12px;
`;

const ImagesList = styled.FlatList`
	height: ${scale(56)}px;
	padding: 0 16px;
`;

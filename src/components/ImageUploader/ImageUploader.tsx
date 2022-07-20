import React, { FC, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { ImagePickerResponse, launchImageLibrary } from "react-native-image-picker";
import styled from "styled-components/native";

import { sc, scale } from "../../helpers/sizeConverter";
import { RandomAvatar } from "../RandomAvatar/RandomAvatar";
import { useAppSelector } from "../../hooks/useRedux";

interface ImageUploaderProps {
	username: string | null;
	title?: string;
	onImageSelect: (response: ImagePickerResponse) => void;
}

export const ImageUploader: FC<ImageUploaderProps> = ({
	title,
	username,
	onImageSelect,
}) => {
	const [selectedImage, setSelectedImage] = useState({ uri: "" });
	const userAvatar = useAppSelector((state) => state.user.avatar);
	const handleLaunchImage = async () => {
		try {
			if (Platform.OS === "ios") {
				const statusPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

				if (
					statusPermission === RESULTS.BLOCKED ||
					statusPermission === RESULTS.UNAVAILABLE ||
					statusPermission === RESULTS.DENIED
				) {
					return;
				}
				const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

				if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
					launchGallery();
				}
			} else {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					launchGallery();
				}
			}
		} catch (error) {
			console.log("Error", error);
		}
	};
	const launchGallery = () => {
		launchImageLibrary(
			{
				mediaType: "photo",
			},
			(response: ImagePickerResponse) => {
				if (response) {
					try {
						setSelectedImage({
							uri: response?.assets[0]?.uri || "",
						});
					} catch (e) {
						console.log(e);
					}
					onImageSelect(response);
				}
			},
		);
	};
	const renderUserImage = () => {
		if (!!selectedImage.uri) {
			return 	<Avatar source={ { uri: selectedImage.uri } } />;
		}
		if (!!userAvatar) {
			return <Avatar source={ { uri: userAvatar } } />;
		}

		return	<RandomAvatar username={ username } width={ 92 } height={ 92 } fontSize={ 36 } />;

	};

	return (
		<Wrapper>
			{renderUserImage()}
			<Button onPress={ handleLaunchImage }>
				<Title>{title}</Title>
			</Button>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	flex-direction: column;
	align-items: center;
`;

const Button = styled.TouchableOpacity`
	margin-top: ${sc(16)}px;
`;

const Title = styled.Text`
	font-family: Proxima Nova;
	font-style: normal;
	font-weight: 600;
	font-size: ${sc(17)}px;
	line-height: ${sc(20)}px;
	letter-spacing: ${sc(0.25)}px;
	color: #566aec;
`;

const Avatar = styled.Image`
	width: ${scale(95)}px;
	height: ${scale(95)}px;
	flex-direction: row;
	justify-content: center;
	border-radius: ${scale(95 / 2)}px;
	align-items: center;
	background: #b3b4bb;
	text-transform: uppercase;
`;

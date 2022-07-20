import React, { useState } from "react";
import {
	Image,
	PermissionsAndroid,
	Platform,
	FlatList,
} from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";
import styled from "styled-components/native";
import { launchImageLibrary, MediaType } from "react-native-image-picker";

import DeleteIcon from "../../assets/deleteImgIcon.svg";
import UploadDocIcon from "../../assets/uploadDocIcon.svg";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { UriImage } from "./VerificationScreen";
import { CONTENT_WIDTH } from "../../constants/sizes";

type Options = {
	mediaType: MediaType;
	includeBase64: boolean;
};

type ImageList = (prevImages: UriImage[]) => UriImage[];

interface IProps {
	verificationType: string;
	imageList: UriImage[];
	setImageList: (image: UriImage[] | ImageList) => void;
}

export const VerificationStep5: React.FC<IProps> = (props) => {
	const { verificationType, imageList, setImageList } = props;
	const [countClickImage, setCountClickImage] = useState(0);

	const requirementsList = [
		`All data must be clearly visible on the ${verificationType}`,
		"The document must belong to you",
		"The document must be valid",
	];

	const handleLaunchLibrary = () => {
		const options: Options = {
			mediaType: "photo",
			includeBase64: true,
		};

		launchImageLibrary(options, async (result) => {
			if (result.didCancel) {
				return;
			}
			const source: { uri: string } = {
				uri: `data:${result.assets[0].type};base64,` + result.assets[0].base64,
			};

			if (imageList.length !== 0) {
				setImageList([...imageList, source]);
			} else {
				setImageList([source]);
			}

			setCountClickImage(0);
		});
	};

	const handleTakePhoto = async () => {
		if (countClickImage < 1) {
			try {
				if (Platform.OS === "ios") {
					const result = await request(PERMISSIONS.IOS.CAMERA);

					if (result === "granted") {
						handleLaunchLibrary();
					}
				} else {
					const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
						setCountClickImage(1);
						handleLaunchLibrary();
					} else {
						console.log("Camera permission denied");
					}
				}
			} catch (err) {
				console.warn(err);
			}
		}
	};

	const deleteImageList = (index: number) => {
		setImageList((prevImages) => prevImages.filter((item) => item !== imageList[index]));
	};

	return (
		<Container contentWidth={ CONTENT_WIDTH }>
			<StepTitle>{verificationType}</StepTitle>
			<UploadDocumentContainer onPress={ handleTakePhoto }>
				<UploadDocIcon />
				<UploadText>Upload document</UploadText>
			</UploadDocumentContainer>
			<RequirementsContainer>
				<FlatList
					data={ requirementsList }
					renderItem={ ({ item }) => (
						<RequirementItem>
							<Dot />
							<Requirement>{item}</Requirement>
						</RequirementItem>
					) }
				/>
			</RequirementsContainer>
			{imageList.length !== 0 && (
				<ImagesListContainer>
					{imageList.map((image, index) => (
						<ImageListItemContainer key={ `${image}_${index}` }>
							<Image source={ image } style={ { height: 60, width: 60, borderRadius: 10 } } />
							<DeleteImg onPress={ () => deleteImageList(index) }>
								<DeleteIcon />
							</DeleteImg>
						</ImageListItemContainer>
					))}
				</ImagesListContainer>
			)}
		</Container>
	);
};

const Container = styled.View<{contentWidth: number}>`
	width: ${({ contentWidth }) => `${contentWidth}px`}
`;
const RequirementsContainer = styled.View`
	margin-top: ${verticalScale(24)}px;
`;
const RequirementItem = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: ${scale(8)}px;
`;

const Dot = styled.View`
	width: ${scale(4)}px;
	height: ${scale(4)}px;
	background: #03061d;
	border-radius: 2px;
	margin-right: ${scale(8)}px;
`;
const Requirement = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(13)}px;
	line-height: ${verticalScale(16)}px;
	letter-spacing: 0.4px;
	color: #03061d;
`;

const ImageListItemContainer = styled.View`
	position: relative;
	margin-right: ${scale(8)}px;
`;

const DeleteImg = styled.TouchableOpacity`
	position: absolute;
	right: ${scale(4)}px;
	top: ${verticalScale(4)}px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${scale(8)}px;
	width: ${scale(22)}px;
	height: ${scale(22)}px;
	background: #ffffff;
`;

const ImagesListContainer = styled.View`
	display: flex;
	flex-direction: row;
	margin-bottom: ${verticalScale(15)}px;
	transform: translateX(3px);
`;

const UploadText = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	color: #566aec;
	margin-left: ${scale(16)}px;
`;

const UploadDocumentContainer = styled.Pressable`
	flex-direction: row;
	align-items: center;
`;

const StepTitle = styled.Text`
	margin-top: ${verticalScale(32)}px;
	margin-bottom: ${verticalScale(24)}px;
	font-weight: bold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	letter-spacing: ${scale(0.15)}px;
	color: #03061d;
`;

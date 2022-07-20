import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { scale, verticalScale } from "../../../helpers/sizeConverter";
import { Message as MessageType } from "../../../types/commonTypes";

enum MessageBgColors {
	CURRENT_USER = "rgba(86, 106, 236, 1)",
	USER = "rgba(169, 181, 255, 0.2)",
}

enum MessageTextColors {
	CURRENT_USER = "rgba(231, 234, 254, 1)",
	USER = "rgba(59, 71, 115, 1)",
}

const DEFAULT_IMAGE_SIZE = 150;

const processImages = (images: string[]) => {
	const IMAGES_NUMBER_PER_INTERVAL = 5;
	const intervalsNumber = Math.ceil(images.length / IMAGES_NUMBER_PER_INTERVAL);
	const result = [];

	for (let i = 0; i < intervalsNumber; i += 1) {
		result.push(images.slice(i * IMAGES_NUMBER_PER_INTERVAL, (i + 1) * IMAGES_NUMBER_PER_INTERVAL));
	}

	return result;
};

const renderImages = (imagesBoxes: string[][], messageIsSelf: boolean, navigation: any) => imagesBoxes.map((images, rowIndex) => {
	const firstImage = images[0];

	function showImagesScreen () {
		navigation.navigate("ImagesScreen", {
			params: { images: images.map((uri) => ({ url: uri })) },
		});
	}

	return (
		<Row key={ `image-row-${rowIndex}-${images.length - rowIndex}` }>
			<TouchableOpacity
				onPress={ showImagesScreen }
			>
				<Image source={ { uri: firstImage } } messageIsSelf={ messageIsSelf } />
			</TouchableOpacity>
			<Col>
				{images.slice(1, images.length).map((imageUri, index) => (
					<TouchableOpacity
						key={ `${imageUri}-${index}` }
						onPress={ showImagesScreen }
					>
						<Image
							key={ `image-${imageUri}` }
							source={ { uri: imageUri } }
							messageIsSelf={ messageIsSelf }
							width={ DEFAULT_IMAGE_SIZE / (images.length - 1) - 4 }
							height={ DEFAULT_IMAGE_SIZE / (images.length - 1) - 4 }
						/>
					</TouchableOpacity>
				))}
			</Col>
		</Row>
	);
});

export const Message: FC<MessageType & { currentUserId: number }> = React.memo(
	function MessageComponent (message) {
		const { currentUserId, creationDate, files, text, userId } = message;
		const navigation = useNavigation();

		const messageIsSelf = currentUserId === userId;

		return (
			<Wrapper messageIsSelf={ messageIsSelf }>
				{files && renderImages(processImages(files), messageIsSelf, navigation)}
				<MessageWrapper messageIsSelf={ messageIsSelf }>
					<MessageText messageIsSelf={ messageIsSelf }>{text}</MessageText>
				</MessageWrapper>
				<Time>{moment(creationDate).format("LT")}</Time>
			</Wrapper>
		);
	},
	(prevProps, nextProps) => prevProps.text !== nextProps.text,
);

const Row = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

const Col = styled.View``;

const Wrapper = styled.View<{ messageIsSelf: boolean }>`
	max-width: ${scale(200)}px;
	min-width: ${scale(70)}px;
	display: flex;
	flex-direction: column;
	margin-left: ${({ messageIsSelf }) => (messageIsSelf ? "auto" : "0px")};
	margin-right: ${({ messageIsSelf }) => (!messageIsSelf ? "auto" : "0px")};
	margin-bottom: ${verticalScale(8)}px;
	margin-top: ${verticalScale(8)}px;
`;

const MessageWrapper = styled.View<{ messageIsSelf: boolean }>`
	border-radius: 10px;
	padding: 8px;
	background-color: ${({ messageIsSelf }) =>
		messageIsSelf ? MessageBgColors.CURRENT_USER : MessageBgColors.USER};
`;

const MessageText = styled.Text<{ messageIsSelf: boolean }>`
	font-family: "ProximaNova-Regular";
	font-size: ${scale(14)}px;
	letter-spacing: ${scale(0.25)}px;
	font-weight: 400;
	color: ${({ messageIsSelf }) =>
		messageIsSelf ? MessageTextColors.CURRENT_USER : MessageTextColors.USER};
`;

const Time = styled.Text`
	font-size: ${scale(10)}px;
	color: rgba(89, 91, 105, 1);
	margin-left: auto;
	margin-top: ${verticalScale(4)}px;
	margin-right: 5px;
`;

const Image = styled.Image<{ messageIsSelf: boolean; width?: number; height?: number }>`
	width: ${({ width }) => scale(width || DEFAULT_IMAGE_SIZE - 4)}px;
	height: ${({ height }) => scale(height || DEFAULT_IMAGE_SIZE - 4)}px;
	border-width: 2px;
	border-radius: 5px;
	margin: ${scale(2)}px;
	border-color: ${({ messageIsSelf }) =>
		messageIsSelf ? MessageBgColors.CURRENT_USER : MessageBgColors.USER};
`;

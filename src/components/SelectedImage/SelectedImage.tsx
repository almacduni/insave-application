import React, { FC } from "react";
import styled from "styled-components/native";

import DeleteIcon from "../../assets/deleteImgIcon.svg";
import { scale } from "../../helpers/sizeConverter";

interface SelectedImageProps {
	uri: string;
	onClose: () => void;
}

export const SelectedImage: FC<SelectedImageProps> = ({ uri, onClose }) => (
	<Container>
		<Image source={ { uri } } />
		<CloseButton onPress={ onClose }>
			<DeleteIcon />
		</CloseButton>
	</Container>
);

const Container = styled.View`
	position: relative;
	width: ${scale(56)}px;
	height: ${scale(56)}px;
	border-radius: ${scale(10)}px;
	border-width: 1px;
	margin-right: ${scale(16)}px;
	overflow: hidden;
`;

const Image = styled.Image`
	width: ${scale(56)}px;
	height: ${scale(56)}px;
`;

const CloseButton = styled.TouchableOpacity`
	position: absolute;
	right: ${scale(4)}px;
	top: ${scale(4)}px;
	padding: ${scale(2)}px;
	background-color: #fff;
	border-radius: ${scale(5)}px;
`;

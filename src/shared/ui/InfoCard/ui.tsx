import * as React from "react";
import styled from "styled-components/native";

import { scale } from "../../../helpers/sizeConverter";
import { Side } from "../Side";
import { FontStyles } from "../../model";
import { Circle } from "../Circle";
import { Text } from "../Text";

interface DataCardProps {
	data?: {
		image?: {
			uri: string | undefined;
			size: number;
		},
		title: string;
		subtitle?: string;
		right?: any;
	};
}

function renderImage (image: {uri: string | undefined, size: number, title: string}) {
	return image?.uri ? (
		<Image imageSize={ image.size } source={ { uri: image.uri } } />
	) : (
		<Circle size={ image.size } color={ "rgba(3, 6, 29, 0.3)" }>
			<Text fontStyle={ FontStyles.BOLD } color={ "#fff" }>
				{image.title ? image.title[0].toUpperCase() : ""}
			</Text>
		</Circle>
	);
}

export const InfoCard: React.FC<DataCardProps> = (props) => {
	const { data } = props;
	const { title = "" } = data || {};
	const { uri = "", size = 36 } = data?.image || {};

	return (
		<Wrapper>
			<Side.Left>
				<ImageWrapper>
					{ renderImage({ uri, size, title }) }
				</ImageWrapper>
				<TextBox>
					<Text size={ 17 } fontStyle={ FontStyles.SEMI_BOLD }>
						{data?.title}
					</Text>
					<Text size={ 12 } color={ "rgba(118, 118, 118, 1)" }>
						{data?.subtitle}
					</Text>
				</TextBox>
			</Side.Left>
			<Side.Right>{data?.right}</Side.Right>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const ImageWrapper = styled.View`
	margin-right: 16px;
`;

const Image = styled.Image<{ imageSize: number }>`
	width: ${({ imageSize }) => scale(imageSize)}px;
	height: ${({ imageSize }) => scale(imageSize)}px;
	border-radius: ${({ imageSize }) => scale(imageSize) / 2}px;
`;

const TextBox = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

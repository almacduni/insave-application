import React, { FC, useMemo, useState } from "react";
import styled from "styled-components/native";

import { sizeConverter } from "../../helpers/sizeConverter";

export const assets = [
	require("../../assets/slide-1.jpeg"),
	require("../../assets/slide-2.jpeg"),
	require("../../assets/slide-3.jpeg"),
];

type PropsType = {
	imageList: string[];
};

const Slider: FC<PropsType> = ({ imageList }) => {
	const [active, setActive] = useState(0);

	const handleScroll = ({ nativeEvent }) => {
		const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);

		if (slide !== active) setActive(slide);
	};

	const imageListLimit = useMemo(() => {
		if (imageList.length > 3) return imageList.slice(0, 3);

		return imageList;
	}, [imageList]);

	return (
		<SliderContainer>
			<SliderImageContainer
				snapToInterval={ sizeConverter(343) }
				horizontal
				pagingEnabled
				onScroll={ (e) => handleScroll(e) }
				showsHorizontalScrollIndicator={ false }
				decelerationRate="fast"
			>

				{imageListLimit.length > 1 ? (
					imageListLimit.map((source, index) => (
						<SliderImage key={ index } source={ { uri: source } } />
					))
				) : (
					<SliderImage source={ { uri: imageList[0] } } />
				)}
			</SliderImageContainer>

			<SliderProgress>
				{imageListLimit.length > 1 &&
					imageListLimit.map((_, index) => (
						<SliderProgressItem
							key={ index }
							active={ index === active }
							lastElement={ index === imageList.length - 1 }
						/>
					))}
			</SliderProgress>
		</SliderContainer>
	);
};

const SliderContainer = styled.View`
	background: #ffffff;
	overflow: hidden;
	width: ${sizeConverter(343)}px;
	height: ${sizeConverter(183)}px;
	position: relative;
	border-radius: ${sizeConverter(6)}px;
`;

const SliderImageContainer = styled.ScrollView``;
const SliderImage = styled.Image`
	/* FIXME: */
	resize-mode: cover;
	width: ${sizeConverter(343)}px;
	height: ${sizeConverter(183)}px;
`;

const SliderProgress = styled.View`
	position: absolute;
	flex-direction: row;
	left: ${sizeConverter(343) / 2 - 25}px;
	bottom: ${sizeConverter(11)}px;
`;
const SliderProgressItem = styled.View<{
	active?: boolean;
	lastElement?: boolean;
}>`
	width: ${sizeConverter(14)}px;
	height: ${sizeConverter(4)}px;
	margin-right: ${(props) => (props.lastElement ? "0px" : sizeConverter(8) + "px")};
	border-radius: ${sizeConverter(18)}px;
	background-color: ${(props) => (props.active ? "#ffffff" : "rgba(255, 255, 255, 0.5)")};
`;

export default Slider;

import React from "react";
import styled from "styled-components/native";
import ContentLoader from "react-content-loader/native";
import { Rect } from "react-native-svg";

import { scale } from "../helpers/sizeConverter";
import { SCREEN_WIDTH } from "../constants/sizes";

export const SkeletonLineChart = () => {
	const HEIGHT = scale(376);

	return (
		<Container>
			<ContentLoader
				foregroundColor="#ffffff"
				height={ HEIGHT }
				viewBox={ `0 0 ${SCREEN_WIDTH} ${HEIGHT}` }
			>
				<Rect x="0" y="0" width="100%" height={ HEIGHT } fill="#E0E0E0" />
			</ContentLoader>
		</Container>
	);
};

const Container = styled.View``;

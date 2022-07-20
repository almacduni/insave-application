import React, { useEffect, useRef } from "react";
import ContentLoader, { Rect, } from "react-content-loader/native";
import { Animated } from "react-native";
import styled from "styled-components/native";

import { sc, scale, verticalScale } from "../helpers/sizeConverter";
import { runFadeAnimation } from "../shared/lib";

export const SkeletonSearchOpen = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<Container>
			<Animated.View style={ { opacity: fadeAnim } }>
				<ContentLoader
					speed={ 1 }
					width={ scale(343) }
					height={ verticalScale(376) }
					viewBox={ `0 0 ${scale(343)} ${verticalScale(376)}` }
					backgroundColor="#E6E6E8"
					animate={ false }
					foregroundColor="#b5b0b0"
				>
					<Rect
						x="0"
						y={ verticalScale(25) }
						rx={ scale(4) }
						ry={ verticalScale(4) }
						width={ scale(343) }
						height={ verticalScale(8) }
					/>
					<Rect
						x="0"
						y={ verticalScale(197) }
						rx={ scale(4) }
						ry={ verticalScale(4) }
						width={ scale(207) }
						height={ verticalScale(8) }
					/>
					<Rect
						x="0"
						y={ verticalScale(368) }
						rx={ scale(4) }
						ry={ verticalScale(4) }
						width={ scale(343) }
						height={ verticalScale(8) }
					/>
					<Rect
						x="0"
						y={ verticalScale(83) }
						rx={ scale(4) }
						ry={ verticalScale(4) }
						width={ scale(207) }
						height={ verticalScale(8) }
					/>
					<Rect
						x="0"
						y={ verticalScale(254) }
						rx={ scale(4) }
						ry={ verticalScale(4) }
						width={ scale(343) }
						height={ verticalScale(8) }
					/>
					<Rect
						x="0"
						y={ verticalScale(140) }
						rx={ scale(4) }
						ry={ verticalScale(4) }
						width={ scale(343) }
						height={ verticalScale(8) }
					/>
					<Rect
						x="0"
						y={ verticalScale(311) }
						rx={ scale(4) }
						ry={ verticalScale(4) }
						width={ scale(207) }
						height={ verticalScale(8) }
					/>
					<Rect
						x="0"
						y="0"
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(50) }
						height={ verticalScale(12) }
					/>
					<Rect
						x="0"
						y={ verticalScale(171) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(50) }
						height={ verticalScale(12) }
					/>
					<Rect
						x="0"
						y={ verticalScale(342) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(50) }
						height={ verticalScale(12) }
					/>
					<Rect
						x="0"
						y={ verticalScale(57) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(50) }
						height={ verticalScale(12) }
					/>
					<Rect
						x="0"
						y={ verticalScale(228) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(50) }
						height={ verticalScale(12) }
					/>
					<Rect
						x="0"
						y={ verticalScale(114) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(50) }
						height={ verticalScale(12) }
					/>
					<Rect
						x="0"
						y={ verticalScale(285) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(50) }
						height={ verticalScale(12) }
					/>
				</ContentLoader>
			</Animated.View>
		</Container>
	);
};

const Container = styled.ScrollView`
	padding: ${verticalScale(5)}px ${sc(0)}px;
	padding-bottom: 7%;
	background: white;
	height: 100%;
	z-index: 1293871398;
`;

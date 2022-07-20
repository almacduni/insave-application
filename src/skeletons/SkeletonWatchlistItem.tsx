import React, { useEffect, useRef } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Animated } from "react-native";
import styled from "styled-components/native";

import { scale, sizeConverter as sz, verticalScale } from "../helpers/sizeConverter";
import { runFadeAnimation } from "../shared/lib";

export const SkeletonWatchlistItem = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<Container>
			<Animated.View style={ { opacity: fadeAnim } }>
				<ContentLoader
					speed={ 2 }
					width={ scale(375) }
					height={ verticalScale(64) }
					viewBox={ `0 0 ${scale(375)} ${verticalScale(64)}` }
					animate={ false }
					backgroundColor="#E6E6E8"
					foregroundColor="#b5b0b0"
				>
					<Rect
						x={ scale(16) }
						y={ verticalScale(8) }
						rx={ scale(20) }
						ry={ verticalScale(20) }
						width={ scale(40) }
						height={ scale(40) }
					/>
					<Rect
						x={ scale(69) }
						y={ verticalScale(11) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(45) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(314) }
						y={ verticalScale(11) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(45) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(69) }
						y={ verticalScale(34) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(89) }
						height={ verticalScale(10) }
					/>
					<Rect
						x={ scale(270) }
						y={ verticalScale(34) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(89) }
						height={ verticalScale(10) }
					/>
				</ContentLoader>
			</Animated.View>
		</Container>
	);
};

const Container = styled.View`
	padding: ${sz(1)}px ${sz(8)}px;
`;

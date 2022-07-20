import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Animated } from "react-native";

import { sc } from "../helpers/sizeConverter";
import { HEIGHT, WIDTH } from "../constants/sizes";
import { ButtonBack } from "../shared/ui";
import { runFadeAnimation } from "../shared/lib";

export const SkeletonHistoryScreen = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<Container>
			<ButtonBack title="Back" onPress={ () => {} }/>
			<Animated.View style={ { opacity: fadeAnim } }>
				<ContentLoader
					speed={ 2 }
					width={ WIDTH }
					height={ HEIGHT }
					animate={ false }
					viewBox={ `0 0 ${WIDTH} ${HEIGHT}` }
					backgroundColor="#E6E6E8"
					foregroundColor="#b5b0b0"
				>
					<Rect x={ sc(16) } y={ sc(0) } rx={ sc(5) } ry={ sc(5) } width={ sc(59) } height={ sc(10) } />
					<Rect x={ sc(15) } y={ sc(123) } rx={ sc(5) } ry={ sc(5) } width={ sc(59) } height={ sc(10) } />
					<Rect x={ sc(65) } y={ sc(50) } rx={ sc(6) } ry={ sc(6) } width={ sc(43) } height={ sc(12) } />
					<Rect x={ sc(305) } y={ sc(74) } rx={ sc(5) } ry={ sc(5) } width={ sc(54) } height={ sc(9) } />
					<Rect x={ sc(288) } y={ sc(50) } rx={ sc(6) } ry={ sc(6) } width={ sc(71) } height={ sc(12) } />
					<Rect x={ sc(65) } y={ sc(74) } rx={ sc(5) } ry={ sc(5) } width={ sc(138) } height={ sc(10) } />
					<Rect x={ sc(16) } y={ sc(47) } rx={ sc(20) } ry={ sc(20) } width={ sc(40) } height={ sc(40) } />
					<Rect x={ sc(65) } y={ sc(206) } rx={ sc(5) } ry={ sc(5) } width={ sc(138) } height={ sc(10) } />
					<Rect x={ sc(65) } y={ sc(174) } rx={ sc(6) } ry={ sc(6) } width={ sc(43) } height={ sc(12) } />
					<Rect x={ sc(305) } y={ sc(198) } rx={ sc(5) } ry={ sc(5) } width={ sc(54) } height={ sc(9) } />
					<Rect x={ sc(288) } y={ sc(174) } rx={ sc(6) } ry={ sc(6) } width={ sc(71) } height={ sc(12) } />
					<Rect x={ sc(16) } y={ sc(171) } rx={ sc(20) } ry={ sc(20) } width={ sc(40) } height={ sc(40) } />
					<Rect x={ sc(65) } y={ sc(278) } rx={ sc(5) } ry={ sc(5) } width={ sc(138) } height={ sc(10) } />
					<Rect x={ sc(65) } y={ sc(246) } rx={ sc(6) } ry={ sc(6) } width={ sc(43) } height={ sc(12) } />
					<Rect x={ sc(305) } y={ sc(270) } rx={ sc(5) } ry={ sc(5) } width={ sc(54) } height={ sc(9) } />
					<Rect x={ sc(288) } y={ sc(246) } rx={ sc(6) } ry={ sc(6) } width={ sc(71) } height={ sc(12) } />
					<Rect x={ sc(16) } y={ sc(243) } rx={ sc(20) } ry={ sc(20) } width={ sc(40) } height={ sc(40) } />
					<Rect x={ sc(65) } y={ sc(350) } rx={ sc(5) } ry={ sc(5) } width={ sc(138) } height={ sc(10) } />
					<Rect x={ sc(65) } y={ sc(318) } rx={ sc(6) } ry={ sc(6) } width={ sc(43) } height={ sc(12) } />
					<Rect x={ sc(305) } y={ sc(342) } rx={ sc(5) } ry={ sc(5) } width={ sc(54) } height={ sc(9) } />
					<Rect x={ sc(288) } y={ sc(318) } rx={ sc(6) } ry={ sc(6) } width={ sc(71) } height={ sc(12) } />
					<Rect x={ sc(16) } y={ sc(315) } rx={ sc(20) } ry={ sc(20) } width={ sc(40) } height={ sc(40) } />
				</ContentLoader>
			</Animated.View>
		</Container>
	);
};

const Container = styled.View`
	background-color: #fff;
	flex: 1;
	padding: 12px 0;
`;

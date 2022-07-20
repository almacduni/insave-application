import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import ContentLoader, { Rect, Path } from "react-content-loader/native";
import { Animated } from "react-native";

import { sc } from "../helpers/sizeConverter";
import IconBack from "../assets/IconBack.svg";
import { runFadeAnimation } from "../shared/lib";

export const SkeletonOpenPlaylistsInCompany = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<Wrapper>
			<Header>
				<IconBack />
				<HeaderTitle>Back</HeaderTitle>
			</Header>
			<Animated.View style={ { opacity: fadeAnim } }>
				<ContentLoader
					speed={ 1 }
					width={ sc(343) }
					height={ 189 }
					viewBox={ `0 0 ${sc(343)} ${sc(189)}` }
					animate={ false }
					backgroundColor="#E6E6E8"
					foregroundColor="#b5b0b0"
					style={ { transform: [{ scale: 1.05 }], marginLeft: 8, marginBottom: 20 } }
				>
					<Path d="M 176 0 h 167 v 167 H 176 z" />
					<Rect x={ sc(0) } y={ sc(0) } rx={ sc(6) } ry={ sc(6) } width={ sc(167) } height={ sc(167) } />
					<Rect x={ sc(0) } y={ sc(179) } rx={ sc(5) } ry={ sc(5) } width={ sc(167) } height={ sc(10) } />
					<Rect x={ sc(176) } y={ sc(179) } rx={ sc(5) } ry={ sc(5) } width={ sc(167) } height={ sc(10) } />
				</ContentLoader>
				<ContentLoader
					speed={ 1 }
					width={ sc(343) }
					height={ 189 }
					viewBox={ `0 0 ${sc(343)} ${sc(189)}` }
					animate={ false }
					backgroundColor="#E6E6E8"
					foregroundColor="#b5b0b0"
					style={ { transform: [{ scale: 1.05 }], marginLeft: 8, marginBottom: 20 } }
				>
					<Path d="M 176 0 h 167 v 167 H 176 z" />
					<Rect x={ sc(0) } y={ sc(0) } rx={ sc(6) } ry={ sc(6) } width={ sc(167) } height={ sc(167) } />
					<Rect x={ sc(0) } y={ sc(179) } rx={ sc(5) } ry={ sc(5) } width={ sc(167) } height={ sc(10) } />
					<Rect x={ sc(176) } y={ sc(179) } rx={ sc(5) } ry={ sc(5) } width={ sc(167) } height={ sc(10) } />
				</ContentLoader>
				<ContentLoader
					speed={ 1 }
					width={ sc(343) }
					height={ 189 }
					viewBox={ `0 0 ${sc(343)} ${sc(189)}` }
					animate={ false }
					backgroundColor="#E6E6E8"
					foregroundColor="#b5b0b0"
					style={ { transform: [{ scale: 1.05 }], marginLeft: 8, marginBottom: 20 } }
				>
					<Path d="M 176 0 h 167 v 167 H 176 z" />
					<Rect x={ sc(0) } y={ sc(0) } rx={ sc(6) } ry={ sc(6) } width={ sc(167) } height={ sc(167) } />
					<Rect x={ sc(0) } y={ sc(179) } rx={ sc(5) } ry={ sc(5) } width={ sc(167) } height={ sc(10) } />
					<Rect x={ sc(176) } y={ sc(179) } rx={ sc(5) } ry={ sc(5) } width={ sc(167) } height={ sc(10) } />
				</ContentLoader>
			</Animated.View>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	padding: 0 ${sc(16)}px;
	justify-content: center;
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	padding: ${sc(12)}px 0;
	transform: translateX(-3px);
`;

const HeaderTitle = styled.Text`
	font-family: Proxima Nova;
	font-size: ${sc(16)}px;
	line-height: 20px;
	color: #03061d;
`;

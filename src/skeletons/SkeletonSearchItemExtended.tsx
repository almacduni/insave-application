import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { Animated } from "react-native";

import IconBack from "../assets/BackIcon.svg";
import { sc, scale } from "../helpers/sizeConverter";
import ExploreGraphic from "../assets/ExploreGraphic.svg";
import { runFadeAnimation } from "../shared/lib";

export const SkeletonSearchItemExtended = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<Wrapper>
			<Header>
				<IconBack />
				<HeaderTitle>Explore</HeaderTitle>
			</Header>
			<Content>
				<Skeleton>
					<Animated.View style={ { opacity: fadeAnim } }>
						<ContentLoader
							speed={ 2 }
							width={ sc(343) }
							height={ sc(50) }
							viewBox={ `0 0 ${sc(343)} ${sc(50)}` }
							backgroundColor="#E6E6E8"
							animate={ false }
							foregroundColor="#b5b0b0"
							style={ { transform: [{ scale: 1.05 }] } }
						>
							<Circle cx={ sc(34) } cy={ sc(19) } r={ sc(18) } />
							<Rect x={ sc(60) } y={ sc(3) } rx={ sc(7) } ry={ sc(7) } width={ sc(144) } height={ sc(13) } />
							<Rect x={ sc(60) } y={ sc(25) } rx={ sc(5) } ry={ sc(5) } width={ sc(36) } height={ sc(9) } />
							<Rect x={ sc(231) } y={ sc(3) } rx={ sc(7) } ry={ sc(7) } width={ sc(96) } height={ sc(13) } />
						</ContentLoader>
						<ExploreGraphic style={ { marginLeft: 12, transform: [{ scale: 1.04 }] } } />
					</Animated.View>
				</Skeleton>
				<Title>Company Profile</Title>
				<Skeleton>
					<Animated.View style={ { opacity: fadeAnim } }>
						<ContentLoader
							speed={ 2 }
							width={ sc(311) }
							height={ sc(40) }
							viewBox={ `0 0 ${sc(311)} ${sc(40)}` }
							animate={ false }
							backgroundColor="#E6E6E8"
							foregroundColor="#b5b0b0"
							style={ { transform: [{ scale: 1.05 }] } }
						>
							<Rect x={ sc(0) } y={ sc(5) } rx={ sc(5) } ry={ sc(5) } width={ sc(311) } height={ sc(9) } />
							<Rect x={ sc(0) } y={ sc(26) } rx={ sc(5) } ry={ sc(5) } width={ sc(311) } height={ sc(9) } />
						</ContentLoader>
					</Animated.View>
				</Skeleton>
				<List>
					<ListItem isFirst={ true }>
						<ListTitle>AMG</ListTitle>
						<Animated.View style={ { opacity: fadeAnim } }>
							<ContentLoader
								speed={ 2 }
								width={ sc(82) }
								height={ sc(24) }
								viewBox={ `0 0 ${sc(82)} ${sc(24)}` }
								animate={ false }
								backgroundColor="#E6E6E8"
								foregroundColor="#b5b0b0"
							>
								<Rect x={ sc(0) } y={ sc(0) } rx={ sc(3) } ry={ sc(3) } width={ sc(82) } height={ sc(24) } />
							</ContentLoader>
						</Animated.View>
					</ListItem>
					<ListItem isFirst={ false }>
						<ListTitle>Analyst rating</ListTitle>
						<Animated.View style={ { opacity: fadeAnim } }>
							<ContentLoader
								speed={ 2 }
								width={ sc(82) }
								height={ sc(24) }
								viewBox={ `0 0 ${sc(82)} ${sc(24)}` }
								backgroundColor="#E6E6E8"
								animate={ false }
								foregroundColor="#b5b0b0"
							>
								<Rect x={ sc(0) } y={ sc(0) } rx={ sc(3) } ry={ sc(3) } width={ sc(82) } height={ sc(24) } />
							</ContentLoader>
						</Animated.View>
					</ListItem>
					<ListItem isFirst={ false }>
						<ListTitle>Target price</ListTitle>
						<Animated.View style={ { opacity: fadeAnim } }>
							<ContentLoader
								speed={ 2 }
								width={ sc(82) }
								height={ sc(24) }
								viewBox={ `0 0 ${sc(82)} ${sc(24)}` }
								animate={ false }
								backgroundColor="#E6E6E8"
								foregroundColor="#b5b0b0"
							>
								<Rect x={ sc(0) } y={ sc(0) } rx={ sc(3) } ry={ sc(3) } width={ sc(82) } height={ sc(24) } />
							</ContentLoader>
						</Animated.View>
					</ListItem>
				</List>
			</Content>
			<Block>
				<BlockTitle>Key statistics</BlockTitle>
			</Block>
			<Block>
				<BlockTitle>Financials</BlockTitle>
			</Block>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	padding: 0 ${sc(12)}px;
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	padding: ${sc(10)}px 0;
`;

const HeaderTitle = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #03061d;
`;

const Content = styled.View`
	width: 100%;

	background: #fafafb;
	border-radius: 6px;
	padding: ${sc(19)}px ${sc(16)}px 0 ${sc(16)}px;
	text-align: left;
`;

const Skeleton = styled.View`
	align-items: center;
`;

const Title = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${sc(14)}px;
	line-height: ${sc(20)}px;
	color: #03061d;
	margin-top: ${sc(20)}px;
	margin-bottom: ${sc(13)}px;
`;

const List = styled.View``;

const ListItem = styled.View<{ isFirst: boolean }>`
	flex-direction: row;
	justify-content: space-between;
	margin-top: ${({ isFirst }) => (isFirst ? `${sc(30)}px` : "0")};
	margin-bottom: ${sc(12)}px;
`;
const ListTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${sc(14)}px;
	line-height: ${sc(20)}px;
	color: #03061d;
`;

const Block = styled.View`
	width: 100%;
	height: ${sc(48)}px;
	background: #f8f8f8;
	margin-top: ${sc(8)}px;
	padding: ${sc(14)}px 0 ${sc(14)}px ${sc(16)}px;
`;

const BlockTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${sc(14)}px;
	line-height: ${sc(20)}px;
	color: #03061d;
`;

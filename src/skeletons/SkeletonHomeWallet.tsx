import React, { useEffect, useRef } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import styled from "styled-components/native";
import { Animated } from "react-native";

import { sc, scale, verticalScale } from "../helpers/sizeConverter";
import GraphicLine from "../assets/GraphicLine.svg";
import { ButtonBack } from "../shared/ui";
import { runFadeAnimation } from "../shared/lib";

export const SkeletonHomeWallet = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<Container>
			<BalanceContainer>
				<Animated.View style={ { opacity: fadeAnim } }>
					<ContentLoader
						speed={ 2 }
						width={ scale(140) }
						height={ verticalScale(32) }
						animate={ false }
						viewBox={ `0 0 ${scale(140)} ${verticalScale(32)}` }
						backgroundColor="#E6E6E8"
						foregroundColor="#ecebeb"
					>
						<Rect
							x={ scale(0) }
							y={ verticalScale(0) }
							rx={ scale(16) }
							ry={ scale(16) }
							width={ scale(140) }
							height={ verticalScale(32) }
						/>
					</ContentLoader>
				</Animated.View>
				<CurrencyIcon source={ require("../assets/usa.png") } />
			</BalanceContainer>
			<TitleContainer>
				<Title>history</Title>
				<TitleMore>more</TitleMore>
			</TitleContainer>
			<Animated.View style={ { opacity: fadeAnim } }>
				<ContentLoader
					speed={ 2 }
					width={ scale(311) }
					height={ verticalScale(40) }
					animate={ false }
					viewBox={ `0 0 ${scale(311)} ${verticalScale(40)}` }
					backgroundColor="#E6E6E8"
					foregroundColor="#ecebeb"
					style={ { marginBottom: 7 } }
				>
					<Rect
						x={ scale(0) }
						y={ scale(0) }
						rx={ scale(20) }
						ry={ scale(20) }
						width={ scale(40) }
						height={ scale(40) }
					/>
					<Rect
						x={ scale(48) }
						y={ verticalScale(3) }
						rx={ scale(6) }
						ry={ scale(6) }
						width={ scale(43) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(240) }
						y={ verticalScale(3) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(71) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(48) }
						y={ verticalScale(27) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(32) }
						height={ verticalScale(9) }
					/>
					<Rect
						x={ scale(257) }
						y={ verticalScale(27) }
						rx={ scale(5) }
						ry={ scale(5) }
						width={ scale(54) }
						height={ verticalScale(9) }
					/>
				</ContentLoader>
			</Animated.View>
		</Container>
	);
};

export const SkeletonHistoryWallet = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	Animated.loop(
		Animated.sequence([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnim, {
				toValue: 0.5,
				duration: 1000,
				useNativeDriver: true,
			}),
		]),
		{},
	).start();

	return (
		<ContainerHistory>
			<ButtonBack title="Back" onPress={ () => {} }/>
			<Animated.View style={ { opacity: fadeAnim } }>
				<ContentLoader
					speed={ 2 }
					width={ 375 }
					animate={ false }
					height={ 363 }
					viewBox="0 0 375 363"
					backgroundColor="#E6E6E8"
					foregroundColor="#b5b0b0"
				>
					<Rect
						x={ scale(16) }
						y={ verticalScale(0) }
						rx={ scale(5) }
						ry={ scale(5) }
						width={ scale(59) }
						height={ verticalScale(10) }
					/>
					<Rect
						x={ scale(15) }
						y={ verticalScale(123) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(59) }
						height={ verticalScale(10) }
					/>
					<Rect
						x={ scale(65) }
						y={ verticalScale(50) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(43) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(305) }
						y={ verticalScale(74) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(54) }
						height={ verticalScale(9) }
					/>
					<Rect
						x={ scale(288) }
						y={ verticalScale(50) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(71) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(65) }
						y={ verticalScale(74) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(138) }
						height={ verticalScale(10) }
					/>
					<Rect
						x={ scale(16) }
						y={ verticalScale(47) }
						rx={ scale(20) }
						ry={ verticalScale(20) }
						width={ scale(40) }
						height={ verticalScale(40) }
					/>
					<Rect
						x={ scale(65) }
						y={ verticalScale(206) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(138) }
						height={ verticalScale(10) }
					/>
					<Rect
						x={ scale(65) }
						y={ verticalScale(174) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(43) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(305) }
						y={ verticalScale(198) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(54) }
						height={ verticalScale(9) }
					/>
					<Rect
						x={ scale(288) }
						y={ verticalScale(174) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(71) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(16) }
						y={ verticalScale(171) }
						rx={ scale(20) }
						ry={ verticalScale(20) }
						width={ scale(40) }
						height={ verticalScale(40) }
					/>
					<Rect
						x={ scale(65) }
						y={ verticalScale(278) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(138) }
						height={ verticalScale(10) }
					/>
					<Rect
						x={ scale(65) }
						y={ verticalScale(246) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(43) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(305) }
						y={ verticalScale(270) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(54) }
						height={ verticalScale(9) }
					/>
					<Rect
						x={ scale(288) }
						y={ verticalScale(246) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(71) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(16) }
						y={ verticalScale(243) }
						rx={ scale(20) }
						ry={ verticalScale(20) }
						width={ scale(40) }
						height={ verticalScale(40) }
					/>
					<Rect
						x={ scale(65) }
						y={ verticalScale(350) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(138) }
						height={ verticalScale(10) }
					/>
					<Rect
						x={ scale(65) }
						y={ verticalScale(318) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(43) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(305) }
						y={ verticalScale(342) }
						rx={ scale(5) }
						ry={ verticalScale(5) }
						width={ scale(54) }
						height={ verticalScale(9) }
					/>
					<Rect
						x={ scale(288) }
						y={ verticalScale(318) }
						rx={ scale(6) }
						ry={ verticalScale(6) }
						width={ scale(71) }
						height={ verticalScale(12) }
					/>
					<Rect
						x={ scale(16) }
						y={ verticalScale(315) }
						rx={ scale(20) }
						ry={ verticalScale(20) }
						width={ scale(40) }
						height={ verticalScale(40) }
					/>
				</ContentLoader>
			</Animated.View>
		</ContainerHistory>
	);
};

export const SkeletonHomePortfolio = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	Animated.loop(
		Animated.sequence([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnim, {
				toValue: 0.5,
				duration: 1000,
				useNativeDriver: true,
			}),
		]),
		{},
	).start();

	return (
		<ContainerPortfolio>
			{/* Can use Later when we add chart on portfolio screen

				<TItleContainer>
					<TitlePortfolio>Performance</TitlePortfolio>
					<Animated.View style={ { opacity: fadeAnim } }>
						<ContentLoader
							speed={ 2 }
							width={ sc(108) }
							height={ sc(33) }
							viewBox={ `0 0 ${sc(108)} ${sc(33)}` }
							backgroundColor="#E6E6E8"
							foregroundColor="#F7F7F8"
							animate={ false }
						>
							<Rect x={ sc(0) } y={ sc(0) } rx={ sc(7) } ry={ sc(7) } width={ sc(108) } height={ sc(14) } />
							<Rect x={ sc(2) } y={ sc(24) } rx={ sc(5) } ry={ sc(5) } width={ sc(106) } height={ sc(9) } />
						</ContentLoader>
					</Animated.View>
				</TItleContainer>
			*/}
			<ContentGraphic>
				<Animated.View style={ { opacity: fadeAnim, justifyContent: "flex-start" } }>
					{/* Can use Later when we add chart on portfolio screen

						<GraphicLine style={ { transform: [{ scale: 1.08 }], marginBottom: 30 } } />
					*/}
					<ContentLoader
						speed={ 1 }
						width={ scale(375) }
						height={ verticalScale(168) }
						viewBox={ `0 0 ${scale(375)} ${verticalScale(168)}` }
						backgroundColor="#E6E6E8"
						foregroundColor="#b5b0b0"
						animate={ false }
						style={ { transform: [{ scale: 1.08 }] } }
					>
						<Rect
							x={ scale(16) }
							y={ verticalScale(8) }
							rx={ scale(20) }
							ry={ scale(20) }
							width={ scale(40) }
							height={ scale(40) }
						/>
						<Rect
							x={ scale(64) }
							y={ verticalScale(11) }
							rx={ scale(6) }
							ry={ verticalScale(6) }
							width={ scale(46) }
							height={ verticalScale(12) }
						/>
						<Rect
							x={ scale(64) }
							y={ verticalScale(34) }
							rx={ scale(5) }
							ry={ verticalScale(5) }
							width={ scale(90) }
							height={ verticalScale(10) }
						/>
						<Rect
							x={ scale(271) }
							y={ verticalScale(11) }
							rx={ scale(6) }
							ry={ verticalScale(6) }
							width={ scale(88) }
							height={ verticalScale(12) }
						/>
						<Rect
							x={ scale(251) }
							y={ verticalScale(34) }
							rx={ scale(5) }
							ry={ verticalScale(5) }
							width={ scale(108) }
							height={ verticalScale(10) }
						/>
						<Rect
							x={ scale(16) }
							y={ verticalScale(64) }
							rx={ scale(20) }
							ry={ verticalScale(20) }
							width={ scale(40) }
							height={ verticalScale(40) }
						/>
						<Rect
							x={ scale(64) }
							y={ verticalScale(67) }
							rx={ scale(6) }
							ry={ verticalScale(6) }
							width={ scale(46) }
							height={ verticalScale(12) }
						/>
						<Rect
							x={ scale(64) }
							y={ verticalScale(90) }
							rx={ scale(5) }
							ry={ verticalScale(5) }
							width={ scale(90) }
							height={ verticalScale(10) }
						/>
						<Rect
							x={ scale(271) }
							y={ verticalScale(67) }
							rx={ scale(6) }
							ry={ verticalScale(6) }
							width={ scale(88) }
							height={ verticalScale(12) }
						/>
						<Rect
							x={ scale(251) }
							y={ verticalScale(90) }
							rx={ scale(5) }
							ry={ verticalScale(5) }
							width={ scale(108) }
							height={ verticalScale(10) }
						/>
						<Rect
							x={ scale(16) }
							y={ verticalScale(120) }
							rx={ scale(20) }
							ry={ verticalScale(20) }
							width={ scale(40) }
							height={ verticalScale(40) }
						/>
						<Rect
							x={ scale(64) }
							y={ verticalScale(123) }
							rx={ scale(6) }
							ry={ verticalScale(6) }
							width={ scale(46) }
							height={ verticalScale(12) }
						/>
						<Rect
							x={ scale(64) }
							y={ verticalScale(146) }
							rx={ scale(5) }
							ry={ verticalScale(5) }
							width={ scale(90) }
							height={ verticalScale(10) }
						/>
						<Rect
							x={ scale(271) }
							y={ verticalScale(123) }
							rx={ scale(6) }
							ry={ verticalScale(6) }
							width={ scale(88) }
							height={ verticalScale(12) }
						/>
						<Rect
							x={ scale(251) }
							y={ verticalScale(146) }
							rx={ scale(5) }
							ry={ verticalScale(5) }
							width={ scale(108) }
							height={ verticalScale(10) }
						/>
					</ContentLoader>
				</Animated.View>
			</ContentGraphic>
		</ContainerPortfolio>
	);
};

const ContainerHistory = styled.View`
	background-color: #fff;
	height: 100%;
	padding: 12px 0;
`;

const Container = styled.View`
	background: #ffffff;
	box-shadow: 0 ${scale(3)}px ${scale(8)}px #e4e4e4;
	border-radius: ${sc(6)}px;
	margin: 16px 4px 32px;
	padding: 16px 16px 8px;
	elevation: 3;
`;

const ContainerPortfolio = styled.View``;
const TItleContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: ${verticalScale(60)}px;
`;
const BalanceContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: ${verticalScale(25)}px;
`;

const CurrencyIcon = styled.Image`
	width: ${scale(40)}px;
	height: ${scale(40)}px;
	resize-mode: contain;
`;
const TitleContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;
const Title = styled.Text`
	font-family: "ProximaNova-Semibold";
	text-transform: uppercase;
	font-size: ${scale(14)}px;
	color: rgba(25, 25, 25, 0.4);
	margin-bottom: ${verticalScale(12)}px;
`;
const ContentGraphic = styled.View`
	justify-content: center;
`;
const TitleMore = styled.Text`
	font-size: ${scale(16)}px;
	letter-spacing: 0.5px;
	color: #566aec;
`;

const TitlePortfolio = styled.Text`
	font-family: "ProximaNova-Bold";
	font-size: ${scale(21)}px;
`;

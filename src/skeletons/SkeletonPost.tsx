import { useRoute } from "@react-navigation/native";
import React, { FC, useLayoutEffect, useRef, useState, useEffect } from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import styled from "styled-components/native";
import { Animated } from "react-native";

import ArrowLeft from "../assets/arrowLeft.svg";
import { scale, verticalScale } from "../helpers/sizeConverter";
import { runFadeAnimation } from "../shared/lib";
import { FeedSections } from "../widgets/feed-sections";

type PostSkeletonProps = {
	isComments: boolean;
};

export const SkeletonPost: FC<PostSkeletonProps> = ({ isComments }) => {
	const nav = useRoute();
	const [isVisible, setIsVisible] = useState(false);

	useLayoutEffect(() => setIsVisible(nav.name === "ArticleExtended"), [isVisible, nav.name]);
	console.log(isVisible);
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<>
			{isComments ? (
				<Container isVisible={ isVisible }>
					<Wrapper>
						<HeaderContainer>
							<ArrowLeft style={ { transform: [{ scale: 1.25 }] } } />
							<HeaderBackText>Back</HeaderBackText>
						</HeaderContainer>
						<Animated.View style={ { opacity: fadeAnim } }>
							<ContentLoader
								speed={ 2 }
								width={ scale(375) }
								height={ verticalScale(394) }
								viewBox={ `0 0 ${scale(375)} ${verticalScale(394)}` }
								backgroundColor="#E6E6E8"
								animate={ false }
								foregroundColor="#ecebeb"
							>
								<Circle cx={ scale(23) } cy={ verticalScale(24) } r={ scale(23) } />
								<Rect
									x={ scale(55) }
									y={ verticalScale(7) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(42) }
									height={ verticalScale(12) }
								/>
								<Rect
									x={ scale(55) }
									y={ verticalScale(33) }
									rx={ scale(4) }
									ry={ verticalScale(4) }
									width={ scale(42) }
									height={ verticalScale(8) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(74) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(94) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(114) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(134) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(154) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(187) }
									rx={ scale(10) }
									ry={ verticalScale(10) }
									width={ scale(343) }
									height={ verticalScale(182) }
								/>
							</ContentLoader>
						</Animated.View>

						<Header>Comments</Header>
						<Animated.View style={ { opacity: fadeAnim } }>
							<ContentLoader
								speed={ 2 }
								width={ scale(375) }
								height={ verticalScale(394) }
								viewBox={ `0 0 ${scale(375)} ${verticalScale(394)}` }
								backgroundColor="#E6E6E8"
								animate={ false }
								foregroundColor="#ecebeb"
							>
								<Circle cx={ scale(23) } cy={ verticalScale(24) } r={ scale(23) } />
								<Rect
									x={ scale(55) }
									y={ verticalScale(7) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(42) }
									height={ verticalScale(12) }
								/>
								<Rect
									x={ scale(55) }
									y={ scale(33) }
									rx={ scale(4) }
									ry={ verticalScale(4) }
									width={ scale(42) }
									height={ verticalScale(8) }
								/>

								<Circle cx={ scale(23) } cy={ verticalScale(153) } r={ scale(23) } />
								<Rect
									x={ scale(56) }
									y={ verticalScale(136) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(42) }
									height={ verticalScale(12) }
								/>
								<Rect
									x={ scale(56) }
									y={ verticalScale(162) }
									rx={ scale(4) }
									ry={ verticalScale(4) }
									width={ scale(42) }
									height={ verticalScale(8) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(74) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(1) }
									y={ verticalScale(203) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(94) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(1) }
									y={ verticalScale(223) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
							</ContentLoader>
						</Animated.View>
					</Wrapper>
				</Container>
			) : (
				<>
					<FeedSections />
					<Wrapper>
						<Animated.View style={ { opacity: fadeAnim } }>
							<ContentLoader
								speed={ 2 }
								width={ scale(375) }
								height={ verticalScale(394) }
								viewBox={ `0 0 ${scale(375)} ${verticalScale(394)}` }
								backgroundColor="#E6E6E8"
								animate={ false }
								foregroundColor="#ecebeb"
							>
								<Circle cx={ scale(23) } cy={ scale(23) } r={ scale(23) } />
								<Rect
									x={ scale(55) }
									y={ verticalScale(7) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(42) }
									height={ verticalScale(12) }
								/>
								<Rect
									x={ scale(55) }
									y={ verticalScale(33) }
									rx={ scale(4) }
									ry={ verticalScale(4) }
									width={ scale(42) }
									height={ verticalScale(8) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(74) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(94) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(114) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(134) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(154) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(187) }
									rx={ scale(10) }
									ry={ verticalScale(10) }
									width={ scale(343) }
									height={ verticalScale(182) }
								/>
							</ContentLoader>
							<ContentLoader
								speed={ 2 }
								width={ scale(375) }
								height={ verticalScale(394) }
								viewBox={ `0 0 ${scale(375)} ${verticalScale(394)}` }
								backgroundColor="#E6E6E8"
								animate={ false }
								foregroundColor="#ecebeb"
							>
								<Circle cx={ scale(23) } cy={ scale(23) } r={ scale(23) } />
								<Rect
									x={ scale(55) }
									y={ verticalScale(7) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(42) }
									height={ verticalScale(12) }
								/>
								<Rect
									x={ scale(55) }
									y={ verticalScale(33) }
									rx={ scale(4) }
									ry={ verticalScale(4) }
									width={ scale(42) }
									height={ verticalScale(8) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(74) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(94) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(114) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(134) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(154) }
									rx={ scale(6) }
									ry={ verticalScale(6) }
									width={ scale(343) }
									height={ verticalScale(11) }
								/>
								<Rect
									x={ scale(0) }
									y={ verticalScale(187) }
									rx={ scale(10) }
									ry={ verticalScale(10) }
									width={ scale(343) }
									height={ verticalScale(182) }
								/>
							</ContentLoader>
						</Animated.View>
					</Wrapper>
				</>
			)}
		</>
	);
};
const Container = styled.View<{ isVisible: boolean }>`
	display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
	background: #fff;
	padding-bottom: ${verticalScale(10)}px;
`;
const Wrapper = styled.View`
	padding: 0 16px 0 16px;
	margin-top: 8px;
	background: #fff;
	margin-bottom: 200px;
`;

const HeaderContainer = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	margin-bottom: 16px;
	margin-top: 8px;
`;
const HeaderBackText = styled.Text`
	font-family: Proxima Nova;
	color: #000000;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	margin-left: ${scale(8)}px;
`;

const Header = styled.Text`
	margin: ${verticalScale(0)}px 0 ${verticalScale(15)}px 0;
	font-family: Raleway-Bold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
`;

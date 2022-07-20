import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Animated, } from "react-native";

import { scale, verticalScale } from "../helpers/sizeConverter";
import ArrowLeftIcon from "../assets/backArrowIcon.svg";
import LikeBlackIcon from "../assets/likeBlackIcon.svg";
import ShareBlackIcon from "../assets/shareBlackIcon.svg";
import ArrowDown from "../assets/playlistExtendedArrow.svg";
import { runFadeAnimation } from "../shared/lib";

export const SkeletonPlayList = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<Container>
			<Wrapper>
				<HeaderWrapper>
					<HeaderContainer>
						<HeaderActionContainer>
							<ActionWrapper>
								<TouchableWrapper>
									<ArrowLeftIcon width={ scale(24) } height={ verticalScale(24) } />
									<HeaderBackText>Explore</HeaderBackText>
								</TouchableWrapper>
							</ActionWrapper>
							<ActionWrapper>
								<TouchableWrapper>
									<LikeBlackIcon width={ scale(24) } height={ verticalScale(24) } />
								</TouchableWrapper>
								<TouchableWrapper style={ { marginLeft: scale(8) } }>
									<ShareBlackIcon width={ scale(24) } height={ verticalScale(24) } />
								</TouchableWrapper>
							</ActionWrapper>
						</HeaderActionContainer>
					</HeaderContainer>
				</HeaderWrapper>
				<Animated.View style={ { opacity: fadeAnim } }>
					<ContentLoader
						speed={ 2 }
						width={ scale(375) }
						height={ verticalScale(375) }
						viewBox={ `0 0 ${scale(375)} ${verticalScale(375)}` }
						backgroundColor="#E6E6E8"
						foregroundColor="#ecebeb"
						animate={ false }
					>
						<Rect
							x={ scale(88) }
							y={ verticalScale(60) }
							rx={ scale(8) }
							ry={ verticalScale(8) }
							width={ scale(200) }
							height={ verticalScale(200) }
						/>
						<Rect
							x={ scale(109) }
							y={ verticalScale(282) }
							rx={ scale(10) }
							ry={ verticalScale(10) }
							width={ scale(157) }
							height={ verticalScale(15) }
						/>
						<Rect
							x={ scale(16) }
							y={ verticalScale(330) }
							rx={ scale(7) }
							ry={ verticalScale(7) }
							width={ scale(343) }
							height={ verticalScale(11) }
						/>
						<Rect
							x={ scale(16) }
							y={ verticalScale(352) }
							rx={ scale(7) }
							ry={ verticalScale(7) }
							width={ scale(343) }
							height={ verticalScale(11) }
						/>
					</ContentLoader>
				</Animated.View>
			</Wrapper>
			<Grid>
				<Row
					style={ {
						maxHeight: verticalScale(5),
						paddingHorizontal: 16,
						paddingBottom: verticalScale(28),
					} }
				>
					<Col size={ scale(50) }>
						<TableHeader isFirst>
							<HeaderText>Name</HeaderText>
							<IconWrapper>
								<ArrowDown />
							</IconWrapper>
						</TableHeader>
					</Col>
					<Col size={ scale(25) }>
						<TableHeader style={ { textAlign: "left" } }>
							<HeaderText>Cap</HeaderText>
							<IconWrapper>
								<ArrowDown />
							</IconWrapper>
						</TableHeader>
					</Col>
					<Col size={ scale(25) }>
						<TableHeader>
							<HeaderText>AMG</HeaderText>
							<IconWrapper>
								<ArrowDown />
							</IconWrapper>
						</TableHeader>
					</Col>
				</Row>
				<Animated.View style={ { opacity: fadeAnim } }>
					{Array(4)
						.fill("")
						.map((_, index) => (
							<Row
								style={ {
									position: "relative",
									alignContent: "center",
									height: verticalScale(40),
									paddingHorizontal: 16,
								} }
								key={ index.toString() }
							>
								<Col size={ scale(25) }>
									<ContentLoader
										speed={ 2 }
										width={ scale(163) }
										height={ verticalScale(40) }
										viewBox={ `0 0 ${scale(163)} ${verticalScale(40)}` }
										backgroundColor="#E6E6E8"
										foregroundColor="#ecebeb"
										animate={ false }
									>
										<Rect
											x={ scale(0) }
											y={ verticalScale(7) }
											rx={ scale(5) }
											ry={ verticalScale(5) }
											width={ scale(60) }
											height={ verticalScale(10) }
										/>
									</ContentLoader>
								</Col>
								<Col size={ 25 }>
									<ContentLoader
										speed={ 2 }
										width={ scale(100) }
										height={ verticalScale(40) }
										viewBox={ `0 0 ${scale(100)} ${verticalScale(40)}` }
										backgroundColor="#E6E6E8"
										foregroundColor="#ecebeb"
										animate={ false }
									>
										<Rect
											x={ scale(55) }
											y={ verticalScale(7) }
											rx={ scale(5) }
											ry={ verticalScale(5) }
											width={ scale(34) }
											height={ verticalScale(10) }
										/>
									</ContentLoader>
								</Col>
								<Col size={ scale(25) }>
									<ContentLoader
										speed={ 2 }
										width={ scale(110) }
										height={ verticalScale(24) }
										viewBox={ `0 0 ${scale(110)} ${verticalScale(24)}` }
										backgroundColor="#E6E6E8"
										foregroundColor="#ecebeb"
										animate={ false }
									>
										<Rect
											x={ scale(30) }
											y={ verticalScale(0) }
											rx={ scale(5) }
											ry={ verticalScale(5) }
											width={ scale(82) }
											height={ verticalScale(24) }
										/>
									</ContentLoader>
								</Col>
							</Row>
						))}
					<Row
						style={ {
							position: "relative",
							alignContent: "center",
							height: verticalScale(35),
							transform: [{ translateY: verticalScale(-1) }],
							paddingHorizontal: 16,
						} }
					>
						<Col size={ scale(25) }>
							<ContentLoader
								speed={ 2 }
								width={ scale(163) }
								height={ verticalScale(20) }
								viewBox={ `0 0 ${scale(163)} ${verticalScale(20)}` }
								backgroundColor="#E6E6E8"
								foregroundColor="#ecebeb"
								animate={ false }
							>
								<Rect
									x={ scale(0) }
									y={ verticalScale(7) }
									rx={ scale(5) }
									ry={ verticalScale(5) }
									width={ scale(60) }
									height={ verticalScale(10) }
								/>
							</ContentLoader>
						</Col>
						<Col size={ scale(25) }>
							<ContentLoader
								speed={ 2 }
								width={ scale(100) }
								height={ verticalScale(20) }
								viewBox={ `0 0 ${scale(100)} ${verticalScale(20)}` }
								backgroundColor="#E6E6E8"
								foregroundColor="#ecebeb"
								animate={ false }
							>
								<Rect
									x={ scale(55) }
									y={ verticalScale(7) }
									rx={ scale(5) }
									ry={ verticalScale(5) }
									width={ scale(34) }
									height={ verticalScale(10) }
								/>
							</ContentLoader>
						</Col>
						<Col size={ scale(25) }>
							<ContentLoader
								speed={ 2 }
								width={ scale(110) }
								height={ verticalScale(24) }
								viewBox={ `0 0 ${scale(110)} ${verticalScale(24)}` }
								backgroundColor="#E6E6E8"
								foregroundColor="#ecebeb"
								animate={ false }
							>
								<Rect
									x={ scale(30) }
									y={ verticalScale(0) }
									rx={ scale(5) }
									ry={ verticalScale(5) }
									width={ scale(82) }
									height={ verticalScale(24) }
								/>
							</ContentLoader>
						</Col>
					</Row>
				</Animated.View>
			</Grid>
		</Container>
	);
};

const Container = styled.View`
	height: 100%;
	overflow: hidden;
	background-color: white;
`;

const Wrapper = styled.View`
	margin-bottom: ${verticalScale(37)}px;
`;

const TableHeader = styled.Text<{ isFirst?: boolean }>`
	${({ isFirst }) => (isFirst ? "" : "text-align: center;")}
	font-weight: 600;
	align-items: center;
	height: ${verticalScale(25)}px;
	justify-content: center;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(20)}px;
	font-variant: lining-nums;
`;

const HeaderText = styled.Text``;
const IconWrapper = styled.View`
	padding-left: ${scale(7)}px;
	transform: translateY(-5px);
`;

const HeaderWrapper = styled.View`
	position: relative;
	padding-top: ${verticalScale(8)}px;
`;

const HeaderContainer = styled.View`
	flex-direction: row;
	align-items: center;
	z-index: 1;
	position: absolute;
	top: 0;
	margin: 0 16px;
`;

const HeaderActionContainer = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: ${verticalScale(16)}px;
`;

const ActionWrapper = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const TouchableWrapper = styled.View`
	padding: ${scale(0)}px;
	flex-direction: row;
	align-items: center;
`;

const HeaderBackText = styled.Text`
	font-family: ProximaNova-Regular;
	font-style: normal;
	font-weight: 400;
	color: #252525;
	font-size: ${scale(16)}px;
	margin-left: ${scale(4)}px;
`;

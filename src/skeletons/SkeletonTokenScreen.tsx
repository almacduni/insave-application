import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Animated } from "react-native";

import { sc } from "../helpers/sizeConverter";
import BackIcon from "../assets/backArrowIconWhite.svg";
import ShareIcon from "../assets/tokens-wallet-share.svg";
import Logo from "../assets/tokenLogo.svg";
import AddVideoIcon from "../assets/AddVideoIcon.svg";
import FriendsIcon from "../assets/FriendsIcon.svg";
import WritePostIcon from "../assets/WritePostIcon.svg";
import { runFadeAnimation } from "../shared/lib";

export const SkeletonTokenScreen = () => {
	const fadeAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		runFadeAnimation(fadeAnim);
	}, []);

	return (
		<Wrapper>
			<TokenInfoWrapper>
				<Header>
					<Container header>
						<CloseButton>
							<BackIcon width={ sc(24) } height={ 24 } />
							<CloseButtonText>Wallet</CloseButtonText>
						</CloseButton>
						<ShareButton>
							<ShareIcon width={ sc(24) } height={ sc(24) } />
						</ShareButton>
					</Container>
				</Header>
				<HeroContainer>
					<Container>
						<Title>Tokens</Title>
						<Animated.View style={ { opacity: fadeAnim } }>
							<ContentLoader
								speed={ 2 }
								width={ sc(155) }
								height={ sc(118) }
								animate={ false }
								viewBox={ `0 0 ${sc(155)} ${sc(118)}` }
								backgroundColor="#6376ED"
								foregroundColor="#b5b0b0"
							>
								<Rect x={ sc(0) } y={ sc(0) } rx={ sc(22) } ry={ sc(22) } width={ sc(155) } height={ sc(43) } />
								<Rect x={ sc(24) } y={ sc(109) } rx={ sc(5) } ry={ sc(5) } width={ sc(106) } height={ sc(9) } />
								<Rect x={ sc(53) } y={ sc(85) } rx={ sc(7) } ry={ sc(7) } width={ sc(47) } height={ sc(13) } />
							</ContentLoader>
						</Animated.View>
					</Container>
				</HeroContainer>
				<ProgressContainer>
					<Container>
						<Row>
							<ProgressTitle>Progress</ProgressTitle>
							<Logo />
						</Row>
						<ProgressCardWrapper>
							<ProgressCard isFirst={ true }>
								<ProgressIcon>
									<FriendsIcon />
									<Animated.View style={ { opacity: fadeAnim } }>
										<ContentLoader
											speed={ 2 }
											width={ sc(29) }
											height={ sc(12) }
											animate={ false }
											viewBox={ `0 0 ${sc(29)} ${sc(12)}` }
											backgroundColor="#E6E6E8"
											foregroundColor="#b5b0b0"
										>
											<Rect
												x={ sc(0) }
												y={ sc(0) }
												rx={ sc(6) }
												ry={ sc(6) }
												width={ sc(29) }
												height={ sc(12) }
											/>
										</ContentLoader>
									</Animated.View>
								</ProgressIcon>
								<Animated.View style={ { opacity: fadeAnim } }>
									<ContentLoader
										speed={ 2 }
										width={ sc(57) }
										animate={ false }
										height={ sc(24) }
										viewBox={ `0 0 ${sc(57)} ${sc(24)}` }
										backgroundColor="#E6E6E8"
										foregroundColor="#b5b0b0"
									>
										<Rect
											x={ sc(0) }
											y={ sc(0) }
											rx={ sc(10) }
											ry={ sc(10) }
											width={ sc(57) }
											height={ sc(24) }
										/>
									</ContentLoader>
								</Animated.View>
								<ProgressName>Friends Invited</ProgressName>
								<InviteButton>
									<InviteButtonTitle>Invite</InviteButtonTitle>
								</InviteButton>
							</ProgressCard>
							<ProgressCard isFirst={ false }>
								<ProgressIcon>
									<WritePostIcon />
									<Animated.View style={ { opacity: fadeAnim } }>
										<ContentLoader
											speed={ 2 }
											width={ sc(29) }
											height={ sc(12) }
											animate={ false }
											viewBox={ `0 0 ${sc(29)} ${sc(12)}` }
											backgroundColor="#E6E6E8"
											foregroundColor="#b5b0b0"
										>
											<Rect
												x={ sc(0) }
												y={ sc(0) }
												rx={ sc(6) }
												ry={ sc(6) }
												width={ sc(29) }
												height={ sc(12) }
											/>
										</ContentLoader>
									</Animated.View>
								</ProgressIcon>
								<Animated.View style={ { opacity: fadeAnim } }>
									<ContentLoader
										speed={ 2 }
										width={ sc(57) }
										height={ sc(24) }
										viewBox={ `0 0 ${sc(57)} ${sc(24)}` }
										animate={ false }
										backgroundColor="#E6E6E8"
										foregroundColor="#b5b0b0"
									>
										<Rect
											x={ sc(0) }
											y={ sc(0) }
											rx={ sc(10) }
											ry={ sc(10) }
											width={ sc(57) }
											height={ sc(24) }
										/>
									</ContentLoader>
								</Animated.View>
								<ProgressName>Posts published</ProgressName>
								<Animated.View style={ { opacity: fadeAnim } }>
									<ContentLoader
										speed={ 2 }
										width={ sc(55) }
										height={ sc(30) }
										animate={ false }
										viewBox={ `0 0 ${sc(55)} ${sc(30)}` }
										backgroundColor="#E6E6E8"
										foregroundColor="#b5b0b0"
										style={ { marginTop: 2 } }
									>
										<Rect x={ sc(0) } y={ sc(0) } rx={ sc(5) } ry={ sc(5) } width={ sc(55) } height={ sc(9) } />
										<Rect
											x={ sc(0) }
											y={ sc(21) }
											rx={ sc(5) }
											ry={ sc(5) }
											width={ sc(55) }
											height={ sc(9) }
										/>
									</ContentLoader>
								</Animated.View>
							</ProgressCard>

							<ProgressFooter>
								<ProgressFooterTop>
									<AddVideoIcon />
									<Animated.View style={ { opacity: fadeAnim } }>
										<ContentLoader
											speed={ 2 }
											width={ sc(29) }
											animate={ false }
											height={ sc(12) }
											viewBox={ `0 0 ${sc(29)} ${sc(12)}` }
											backgroundColor="#E6E6E8"
											foregroundColor="#b5b0b0"
										>
											<Rect
												x={ sc(0) }
												y={ sc(0) }
												rx={ sc(6) }
												ry={ sc(6) }
												width={ sc(29) }
												height={ sc(12) }
											/>
										</ContentLoader>
									</Animated.View>
								</ProgressFooterTop>
								<ProgressFooterMiddle>
									<Animated.View style={ { opacity: fadeAnim } }>
										<ContentLoader
											speed={ 2 }
											width={ sc(57) }
											height={ sc(24) }
											viewBox={ `0 0 ${sc(57)} ${sc(24)}` }
											animate={ false }
											backgroundColor="#E6E6E8"
											foregroundColor="#b5b0b0"
										>
											<Rect
												x={ sc(0) }
												y={ sc(0) }
												rx={ sc(10) }
												ry={ sc(10) }
												width={ sc(57) }
												height={ sc(24) }
											/>
										</ContentLoader>
									</Animated.View>
								</ProgressFooterMiddle>
								<ProgressFooterBottom>
									<ProgressName>Videos published</ProgressName>
									<Animated.View style={ { opacity: fadeAnim } }>
										<ContentLoader
											speed={ 2 }
											width={ sc(92) }
											height={ sc(29) }
											animate={ false }
											viewBox={ `0 0 ${sc(92)} ${sc(29)}` }
											backgroundColor="#E6E6E8"
											foregroundColor="#b5b0b0"
										>
											<Rect
												x={ sc(0) }
												y={ sc(20) }
												rx={ sc(5) }
												ry={ sc(5) }
												width={ sc(92) }
												height={ sc(9) }
											/>
											<Rect
												x={ sc(25) }
												y={ sc(0) }
												rx={ sc(5) }
												ry={ sc(5) }
												width={ sc(67) }
												height={ sc(9) }
											/>
										</ContentLoader>
									</Animated.View>
								</ProgressFooterBottom>
							</ProgressFooter>
						</ProgressCardWrapper>
					</Container>
				</ProgressContainer>
			</TokenInfoWrapper>
		</Wrapper>
	);
};

const Row = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
`;

const Wrapper = styled.View`
	flex: 1;
	height: 100%;
`;
const Container = styled.View<{ header?: boolean }>`
	padding: 0 ${16}px;
	align-items: center;
	width: 100%;
	flex-direction: ${({ header }) => (header ? "row" : "column")};
`;

const TokenInfoWrapper = styled.View`
	flex: 1;
	position: relative;
	height: 100%;
	background: #566aec;
`;

const HeroContainer = styled.View`
	margin-bottom: ${sc(20)}px;
	align-items: center;
`;

const ProgressCard = styled.View<{ isFirst: boolean }>`
	min-width: ${sc(168)}px;
	height: ${sc(216)}px;
	padding: ${sc(16)}px;
	margin-right: ${({ isFirst }) => (isFirst ? `${sc(8)}px` : "0")};
	background: #ffffff;
	border-radius: 10px;
`;
const ProgressIcon = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: ${sc(19)}px;
`;
const Header = styled.View`
	width: 100%;
	padding: ${sc(10)}px 0;
	margin-bottom: ${sc(8)}px;
	position: relative;
`;

const ShareButton = styled.TouchableOpacity`
	margin-left: auto;
`;

const CloseButton = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
`;

const CloseButtonText = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${16}px;
	letter-spacing: ${sc(0.5)}px;
	color: #ffffff;
	margin-left: ${sc(4)}px;
`;

const ProgressName = styled.Text`
	font-family: ProximaNova-SemiBold;
	font-size: ${sc(17)}px;
	line-height: ${sc(20)}px;
	color: #03061d;
	margin-top: ${sc(13)}px;
	margin-bottom: ${sc(16)}px;
`;

const Title = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${17}px;
	line-height: ${20}px;
	letter-spacing: ${sc(0.15)}px;
	margin-bottom: ${sc(15)}px;
	color: rgba(255, 255, 255, 0.7);
`;

const ProgressContainer = styled.View`
	background: #f3f2f4;
	flex: 1;
	padding-top: ${32}px;
	width: 100%;
`;

const ProgressTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${21}px;
	line-height: ${28}px;
	letter-spacing: ${sc(0.15)}px;
	color: #03061d;
	align-self: flex-start;
	margin-bottom: ${24}px;
`;

const ProgressCardWrapper = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const InviteButton = styled.TouchableOpacity`
	padding: ${8}px 0;

	width: 100%;
	background: #566aec;
	align-items: center;
	border-radius: ${sc(6)}px;
`;

const InviteButtonTitle = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${14}px;
	line-height: ${20}px;
	letter-spacing: ${sc(0.1)}px;
	color: #ffffff;
`;

const ProgressFooter = styled.View`
	width: 100%;
	height: ${sc(166)}px;
	background: #fff;
	margin-top: ${sc(8)}px;
	padding: ${sc(16)}px;
	border-radius: ${sc(10)}px;
`;

const ProgressFooterTop = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

const ProgressFooterMiddle = styled.View`
	margin-top: ${sc(19)}px;
`;

const ProgressFooterBottom = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

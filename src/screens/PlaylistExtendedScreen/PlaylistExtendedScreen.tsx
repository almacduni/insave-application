import React from "react";
import { Col, Grid, Row } from "react-native-easy-grid";
import styled from "styled-components/native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PlaylistExtendedCol } from "../../components/Playlists/PlaylistExtendedCol";
import { MoreTextPlaylist } from "../../components/MoreText/MoreTextPlaylist";
import ArrowDown from "../../assets/playlistExtendedArrow.svg";
import { authenticationCheck } from "../../helpers/authenticationCheck";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { setCompanyDescriptionTC } from "../../redux/searchSlice";
import { SkeletonPlayList } from "../../skeletons/SkeletonPlayList";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useCurrencyConverter, useHeaderScroll } from "./hooks";
import { PlaylistButton } from "./components/PlaylistButton";
import { PlaylistBackBtnIcon, PlaylistLikeBtnIcon, PlaylistShareBtnIcon } from "./assets";
import { convertAmgNumber } from "../../helpers/converterPlaylistNumbers";
import { WithSafeArea } from "../../shared/ui";
import { CustomStatusBar } from "../../processes";

export const PlaylistExtendedScreen = ({ navigation, route }: any) => {
	const dispatch = useAppDispatch();
	const state = useAppSelector((appState) => appState.SearchScreenR);
	const insets = useSafeAreaInsets();

	const currencyConverter = useCurrencyConverter();
	const { headerScrollHandler, progress } = useHeaderScroll();

	const headerAnimatedStyles = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			["rgba(255,255,255, 0)", "rgba(255,255,255,1)"],
			"RGB",
		);

		return {
			backgroundColor,
		};
	});

	const { updateSearch, backgroundColor } = route.params;

	const togglePressItem = (ItemFullName: string, ticker: string) => {
		dispatch(setCompanyDescriptionTC({ ticker }));

		updateSearch(ItemFullName);
		navigation.navigate("SearchItemExtended");
	};

	const pressBack = () => {
		navigation.goBack();
	};

	return (
		<WithSafeArea>
			{state.isFetching ? (
				<SkeletonPlayList />
			) : (
				<Wrapper >
					<HeaderWrapper style={ [headerAnimatedStyles] }>
						<HeaderContainer>
							<HeaderActionContainer>
								<ActionWrapper>
									<PlaylistButton progress={ progress } handler={ pressBack }>
										<PlaylistBackBtnIcon progress={ progress } />
									</PlaylistButton>
								</ActionWrapper>
								<ActionWrapper>
									<PlaylistButton
										progress={ progress }
										handler={ () => authenticationCheck(() => {}, null, navigation) }
									>
										<PlaylistLikeBtnIcon progress={ progress } />
									</PlaylistButton>
									<PlaylistButton
										progress={ progress }
										last
										handler={ () => authenticationCheck(() => {}, null, navigation) }
									>
										<PlaylistShareBtnIcon progress={ progress } />
									</PlaylistButton>
								</ActionWrapper>
							</HeaderActionContainer>
						</HeaderContainer>
					</HeaderWrapper>
					<Animated.ScrollView onScroll={ headerScrollHandler } scrollEventThrottle={ 16 }>
						<InfoContainer>
							<ImageAndTitleWrapper>
								<ImageWrapper>
									{backgroundColor && (
										<Image
											source={ {
												uri: backgroundColor,
											} }
										/>
									)}
								</ImageWrapper>
							</ImageAndTitleWrapper>
							<About>
								<Title>{state.playlistExtendedTitle}</Title>
								<MoreTextPlaylist fontSize={ 16 } line={ state.playlistExtendedDescription || "" } charLimit={ 110 } />
							</About>
						</InfoContainer>
						<Grid>
							<Row
								style={ {
									maxHeight: verticalScale(5),
									paddingHorizontal: scale(16),
									paddingBottom: verticalScale(35),
								} }
							>
								<Col size={ scale(46) }>
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
							{state.playlistExtendedData?.map(
								(item, index) =>
									item && (
										<Row
											style={ {
												position: "relative",
												alignItems: "center",
												height: verticalScale(40),
												paddingHorizontal: 16,
												paddingVertical: verticalScale(10),
												borderTopColor: "rgba(17, 3, 32, 0.05)",
												borderTopWidth: 1,
											} }
											key={ index.toString() }
										>
											<PlaylistExtendedCol
												item={ item }
												key={ index }
												togglePressItem={ () => togglePressItem(item.company, item.name) }
											/>
											<Col size={ scale(25) }>
												<TableColText style={ { textAlign: "left" } }>
													${currencyConverter(item.marketCapitalization)}
												</TableColText>
											</Col>
											<Col size={ scale(25) }>
												<ButtonFlip negative={ item.amg <= 0 }>
													<ButtonTitle negative={ item.amg <= 0 }>
														{item.amg <= 0 ? convertAmgNumber(item.amg) : `+${convertAmgNumber(item.amg)}`}%
													</ButtonTitle>
												</ButtonFlip>
											</Col>
										</Row>
									),
							)}
						</Grid>
					</Animated.ScrollView>
				</Wrapper>
			)}
		</WithSafeArea>
	);
};

const Wrapper = styled.View`
	height: 100%;
	flex: 1;
	padding: 0;
	position: relative;
	background-color: #ffffff;
`;

const ImageAndTitleWrapper = styled.View`
	flex: 1;
`;
const ImageWrapper = styled.View`
	width: 100%;
	height: ${scale(250)}px;
	border-radius: ${scale(10)}px;
`;

const Image = styled.Image`
	width: ${scale(375)}px;
	height: ${scale(250)}px;
`;

const HeaderWrapper = styled(Animated.View)`
	width: 100%;
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	right: 0;
	height: ${scale(62)}px;
`;
const Title = styled.Text`
	font-family: ProximaNova-Regular;
	font-weight: bold;
	max-width: ${scale(209)}px;
	font-size: ${scale(20)}px;
	line-height: ${verticalScale(24)}px;
	letter-spacing: ${scale(0.25)}px;
	font-variant: lining-nums;
	color: #252525;
`;
const InfoContainer = styled.View``;
const About = styled.View`
	margin: -${verticalScale(20)}px 0 ${verticalScale(20)}px 0;
	padding: ${verticalScale(32)}px 16px 0;
	border-top-left-radius: ${scale(16)}px;
	border-top-right-radius: ${scale(16)}px;
	background-color: #fff;
`;

const HeaderText = styled.Text`
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${verticalScale(0.25)}px;
`;
const IconWrapper = styled.View`
	padding-left: ${scale(7)}px;
	transform: translateY(-5px);
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

const TableColText = styled.Text`
	font-family: ProximaNova-Regular;
	font-style: normal;
	font-weight: normal;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(24)}px;
	font-variant: lining-nums;
	color: #252525;
`;

const HeaderContainer = styled.View`
	flex-direction: row;
	align-items: center;
	z-index: 1;
	position: absolute;
	top: 0;
	padding: 0 16px;
`;

const TableHeader = styled.Text<{ isFirst?: boolean }>`
	${({ isFirst }) => (isFirst ? "" : "text-align: center;")}
	flex-direction: row;
	align-items: center;
	font-weight: 600;
	font-size: ${scale(14)}px;
	height: ${verticalScale(25)}px;
`;

const ButtonFlip = styled.TouchableOpacity<{ negative?: boolean }>`
	width: ${scale(82)}px;
	padding: ${verticalScale(3)}px 0;
	background-color: ${({ negative }) =>
		negative ? "rgba(235, 0, 70, 0.07)" : "rgba(16, 168, 121, 0.1)"};
	border-radius: ${scale(3)}px;
	justify-content: center;
	align-items: center;
`;
const ButtonTitle = styled.Text<{ negative?: boolean }>`
	font-family: ProximaNova-Regular;
	font-size: ${scale(14)}px;
	font-variant: lining-nums;
	color: ${(props) => (props.negative ? "#EB0046" : "#0C7D5A")};
`;

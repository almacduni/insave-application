import React, { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSharedValue } from "react-native-reanimated";
import { useVector } from "react-native-redash";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { FlipItem } from "./FlipItem/FlipItem";
import { CompanyDescriptionType, GraphType } from "../../types/commonTypes";
import { parseDescription } from "../../helpers/parseDescription";
import BackIcon from "../../assets/BackIcon.svg";
import { buildGraph, createSize } from "../AreaChart/Model";
import { AreaChart } from "../AreaChart/AreaChart";
import { Header } from "./Header/Header";
import { CollapseBlock } from "../CollapseBlock/CollapseBlock";
import { Financials } from "../Financials/Financials";
import { WIDTH, PADDING } from "../../constants/sizes";
import { convertBigNumber } from "../../helpers/convertBigNumber";
import { MoreTextPlaylist } from "../MoreText/MoreTextPlaylist";
import { useAppSelector } from "../../hooks/useRedux";
import { SkeletonSearchItemExtended } from "../../skeletons/SkeletonSearchItemExtended";
import { Playlists } from "../Playlists/Playlists";
import { WithSafeArea } from "../../shared/ui";

type PropsType = {
	updateSearch: (search: string) => void;
	toggleOnClear: () => void;
	search: string;
	route?: any;
	navigation: any;
};

const getWithFractionalPart = (n: number): number => {
	const processedNumber = +n.toFixed(2);
	const wholePart = Math.trunc(processedNumber);

	if (wholePart === processedNumber) return wholePart;

	return processedNumber;
};

const toKeyStatistics = (data: CompanyDescriptionType | null) => {
	if (data && data.leverageRatio) {
		return [
			{ name: "Market cap", value: convertBigNumber(data.marketCap) },
			{ name: "Volume (avg.)", value: convertBigNumber(data.volAvg) },
			{ name: "P/E", value: data.peRatioTTM || 0 },
			{ name: "Dividends", value: `${data.dividendYieldTTM}%` || "-" },
			{ name: "Insiders", value: `${data.insiderOwn}%` || 0 },
			{ name: "Institutions", value: `${data.instOwn}%` || 0 },
			{
				name: "ROE",
				value: `${getWithFractionalPart(data.returnOnEquityTTM * 100)}%`,
			},
			{
				name: "ROA",
				value: `${getWithFractionalPart(data.returnOnAssetsTTM * 100)}%`,
			},
			{ name: "Leverage", value: `${data.leverageRatio.toFixed(2)}` },
			{ name: "Current ratio", value: `${data.currentRatio.toFixed(2)}` },
			{
				name: "Earnings date",
				value: moment(data.nextEarningsDate).format("DD MMM YYYY"),
			},
		];
	}
};

const checkColorCreator = (color1: string, color2: string) => (price: number) => (price < 0 ? color1 : color2);

const targetPriceColorCreator = (color1: string, color2: string) => (targetPrice: number, currentPrice: number) => {
	if (targetPrice === currentPrice) {
		return "#000000";
	}
	if (targetPrice > currentPrice) {
		return color1;
	}

	return color2;
};

export const SearchItemExtended: FC<PropsType> = ({
	updateSearch,
	route,
}: any) => {
	const state = useAppSelector((appState) => appState.SearchScreenR);
	const keyStatistics = toKeyStatistics(state.companyDescription);
	const [graph, setGraph] = useState<GraphType>();
	const sizeGraph = createSize(WIDTH - PADDING * 4);
	const translation = useVector();
	const isActive = useSharedValue(false);
	const navigation = useNavigation();

	useEffect(() => {
		if (state.companyDescription)
			setGraph(buildGraph(state.companyDescription.historical, sizeGraph));
	}, [state.companyDescription?.historical]);

	const checkPrice = (price: number | string) =>
		+price < 0 ? price : "+" + price;
	const checkColor = checkColorCreator(
		"rgba(235, 0, 70, 1.0)",
		"rgba(12, 125, 90, 1.0)"
	);
	const checkBgColor = checkColorCreator(
		"rgba(235, 0, 70, 0.15)",
		"rgba(16, 168, 121, 0.2)"
	);

	const targetPriceColor = targetPriceColorCreator(
		"rgba(12, 125, 90, 1.0)",
		"rgba(235, 0, 70, 1.0)"
	);
	const targetPriceBgColor = targetPriceColorCreator(
		"rgba(16, 168, 121, 0.2)",
		"rgba(235, 0, 70, 0.15)"
	);

	return (
		<WithSafeArea>
			{state.isFetching || !state.companyDescription ? (
				<SkeletonSearchItemExtended />
			) : (
				<Container>
					<WrapperHeader
						onPress={ () => {
							route?.params?.handleOpenSearchList();
							navigation.goBack();
						} }
					>
						<BackIcon />
						<BackToLogin>Explore</BackToLogin>
					</WrapperHeader>
					{state.companyDescription && (
						<>
							<Wrapper>
								<InfoContainer>
									<Header
										translation={ translation }
										graph={ graph }
										historycal={ state.companyDescription?.historical?.reduce(
											(acc, historycalItem) => ({
												...acc,
												[historycalItem.date]: historycalItem.close,
											}),
											{}
										) }
										companyDescription={ state.companyDescription }
										isActive={ isActive }
										size={ sizeGraph }
									/>
									{graph && (
										<AreaChart
											translation={ translation }
											graph={ graph }
											isActive={ isActive }
											size={ sizeGraph }
										/>
									)}
									<ProfileContainer>
										<ProfileHeader>About</ProfileHeader>
										<MoreTextPlaylist
											line={ parseDescription(
												state.companyDescription.description
											) }
											charLimit={ 100 }
											fontSize={ 14 }
											lineHeight={ 20 }
											widthOfLastLine={ 270 }
										/>
									</ProfileContainer>
									{state.companyDescription.recom && (
										<>
											<RatingContainer>
												<RatingTitle>AMG</RatingTitle>
												<TargetPrice
													color={ checkColor(state?.companyDescription?.amg) }
													bgColor={ checkBgColor(state.companyDescription?.amg) }
												>
													{checkPrice(state.companyDescription.amg?.toFixed(1))}%
												</TargetPrice>
											</RatingContainer>
											<RatingContainer>
												<RatingTitle>Analyst rating</RatingTitle>
												<FlipItem
													index={ 2 }
													price={ state.companyDescription.recom }
													isSearch
												/>
											</RatingContainer>
										</>
									)}
									{state.companyDescription.targetPrice && (
										<RatingContainer>
											<RatingTitle>Target price</RatingTitle>
											<TargetPrice
												color={ targetPriceColor(
													state.companyDescription.targetPrice,
													state.companyDescription.price
												) }
												bgColor={ targetPriceBgColor(
													state?.companyDescription?.targetPrice || 0,
													state?.companyDescription?.price || 0
												) }
											>
												{state.companyDescription.targetPrice}
											</TargetPrice>
										</RatingContainer>
									)}
								</InfoContainer>
								{keyStatistics && (
									<CollapseBlock
										title="Key statistics"
										data={ keyStatistics }
										isSearch
									/>
								)}
								{state.financialStatement && (
									<Financials data={ state.financialStatement } />
								)}
							</Wrapper>
							{ !!state.companyDescriptionPlaylists?.length && (<Playlists
								fromCompany
								updateSearch={ updateSearch }
								navigation={ navigation }
								data={ state.companyDescriptionPlaylists || [] }
							/>) }
						</>
					)}

				</Container>
			)}
		</WithSafeArea>
	);
};

const Container = styled.ScrollView`
	padding-top: ${verticalScale(12)}px;
	background-color: #fdfdfd;
	height: 100%;
`;

const Wrapper = styled.ScrollView`
	padding: 0 18px;
`;
const WrapperHeader = styled.TouchableOpacity`
	padding: 0 12px;
	align-items: center;
	flex-direction: row;
`;
const InfoContainer = styled.View`
	padding: ${verticalScale(13)}px ${scale(12)}px ${verticalScale(8)}px
		${scale(12)}px !important;
	margin-top: ${wp("5.3%")}px;
	background: #f8f8f8;
	border-color: #ffffff;
	border-width: ${scale(0.3)}px;
	box-shadow: 0 ${scale(3)}px ${scale(8)}px rgba(6, 181, 174, 0.1);
	border-radius: ${scale(6)}px;
`;

const RatingContainer = styled.View`
	width: 98.5%;
	margin-bottom: ${verticalScale(8)}px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const RatingTitle = styled.Text`
	font-family: ProximaNova-SemiBold;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(16)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #252525;
	font-variant: lining-nums;
`;

const ProfileContainer = styled.View`
	margin-top: ${verticalScale(30)}px;
	margin-bottom: ${verticalScale(15)}px;
`;

const ProfileHeader = styled.Text`
	font-family: ProximaNova-SemiBold;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(16)}px;
	letter-spacing: ${scale(0.25)}px;
	margin-bottom: ${verticalScale(4)}px;
	color: #03061d;
`;

const TargetPrice = styled.Text<{ color?: string; bgColor: string }>`
	font-family: ProximaNova-Regular;
	font-style: normal;
	font-weight: normal;
	text-align: center;
	padding: ${verticalScale(5)}px 0;
	width: ${scale(82)}px;
	height: ${verticalScale(24)}px;
	font-size: ${scale(12)}px;
	line-height: ${verticalScale(14)}px;
	border-radius: ${scale(3)}px;
	font-variant: lining-nums;
	color: ${({ color }) => color};
	background-color: ${({ bgColor }) => bgColor};
	border-color: ${({ color }) => color};
`;

const BackToLogin = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
	letter-spacing: ${scale(0.25)}px;
	color: #03061d;
`;

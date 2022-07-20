import React, { FC, useMemo } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

import { getPlaylistExtendedDataTC } from "../../redux/searchSlice";
import { sc, scale, verticalScale } from "../../helpers/sizeConverter";
import { GradientText, GradientDirection } from "../GradientText/GradientText";
import { useAppDispatch } from "../../hooks/useRedux";

type PropsType = {
	title: string;
	isLogged: boolean;
	imageURL: string;
	navigation?: any;
	updateSearch: any;
	isCompanyProfile?: boolean;
	tickerList: { name: string }[];
	playlistId: number;
	backgroundColor?: string;
	fromCompany?: boolean;
};

export const PlaylistsItem: FC<PropsType> = ({
	title,
	imageURL,
	updateSearch,
	tickerList,
	isCompanyProfile,
	playlistId,
	fromCompany,
}) => {
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	function toggleClickPlaylist () {
		dispatch(
			getPlaylistExtendedDataTC({
				playlistId,
				playlistExtendedTitle: title,
				playlistExtendedImage: imageURL,
			}),
		);
		navigation.navigate("PlaylistExtendedScreen" as never, {
			updateSearch,
			backgroundColor: imageURL,
			fromCompany,
		} as never);
	}

	const tickerListRenderer = useMemo(() => {
		const tickersStringMaxLength = Math.ceil(320 / sc(14));

		return tickerList
			.map((item) => item.name)
			.join(", ")
			.slice(0, tickersStringMaxLength);
	}, [tickerList]);

	return (
		<PlayListContainer>
			<CardContainer
				isCompanyProfile={ isCompanyProfile }
				activeOpacity={ 1.0 }
				onPress={ toggleClickPlaylist }
			>
				{imageURL && imageURL !== "someUrl" && (
					<FastImage
						style={ {
							position: "absolute",
							width: isCompanyProfile ? scale(164) : scale(150),
							height: isCompanyProfile ? scale(164) : scale(150),
							borderRadius: scale(12),
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						} }
						source={ {
							uri: imageURL,
							priority: FastImage.priority.high,
						} }
						resizeMode={ FastImage.resizeMode.cover }
					/>
				)}
			</CardContainer>
			<GradientText
				width={ isCompanyProfile ? scale(154) : scale(140) }
				fontSize={ scale(13) }
				height={ verticalScale(18) }
				text={ title }
				fontFamily={ "semi-bold" }
				gradientDirection={ GradientDirection.HORIZONTAL }
				gradientColors={ [
					{
						color: "#03061D",
						offset: "70%",
					},
					{
						color: "#fff",
						offset: "100%",
					},
				] }
			/>
			{!!tickerListRenderer && (
				<GradientText
					width={ scale(150) }
					fontSize={ scale(11) }
					height={ verticalScale(13) }
					text={ tickerListRenderer }
					fontFamily={ "semi-bold" }
					gradientDirection={ GradientDirection.HORIZONTAL }
					gradientColors={ [
						{
							color: "#03061D",
							opacity: 0.4,
							offset: "80%",
						},
						{
							color: "#fff",
							offset: "100%",
						},
					] }
				/>
			)}

		</PlayListContainer>
	);
};

const PlayListContainer = styled.TouchableOpacity`
	padding-bottom: ${verticalScale(20)}px;
	overflow: hidden;
`;

const CardContainer = styled.TouchableOpacity<{ isCompanyProfile?: boolean }>`
	width: ${({ isCompanyProfile }) => (isCompanyProfile ? `${scale(164)}px` : `${scale(144)}px`)};
	height: ${({ isCompanyProfile }) => (isCompanyProfile ? `${scale(164)}px` : `${scale(144)}px`)};
	background-color: #000;
	margin-right: ${scale(16)}px;
	border-radius: ${scale(12)}px;
	padding: 8px ${scale(8)}px 0;
	align-items: flex-start;
	justify-content: flex-end;
	position: relative;
	overflow: hidden;
	margin-bottom: ${verticalScale(8)}px;
`;

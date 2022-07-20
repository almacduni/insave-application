import React, { FC, useMemo } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { getPlaylistExtendedDataTC } from "../../redux/searchSlice";
import { sc, scale, verticalScale } from "../../helpers/sizeConverter";
import { GradientText, GradientDirection } from "../GradientText/GradientText";

type PropsType = {
	title: string;
	isLogged: boolean;
	imageURL: string;
	navigation?: any;
	// setIsModalVisible: (isVisible: boolean) => void;
	updateSearch: any;
	tickerList: string[];
	playlistId: number;
	backgroundColor: string;
	fromCompany?: boolean;
};

export const PlaylistsItemCP: FC<PropsType> = ({
	title,
	imageURL,
	updateSearch,
	tickerList,
	playlistId,
	backgroundColor,
	fromCompany,
}) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const toggleClickPlaylist = (
		playListName: string,
		playlistExtendedImageBackgroundColor: string,
	) => {
		dispatch(
			getPlaylistExtendedDataTC({
				playlistId,
				playlistExtendedTitle: title,
				playlistExtendedImage: imageURL,
				// FIXME:
				playlistExtendedGradientBg: playlistExtendedImageBackgroundColor,
			})
		);
		navigation.navigate("PlaylistExtendedScreen", {
			updateSearch,
			playlistExtendedImageBackgroundColor,
			fromCompany,
		});
	};

	const tickerListRenderer = useMemo(() => {
		const tikersStringMaxLength = Math.ceil(320 / sc(14));

		return tickerList.join(", ").slice(0, tikersStringMaxLength);
	}, [tickerList]);

	return (
		<PlayListContainer>
			<CardContainerCP
				activeOpacity={ 1.0 }
				// FIXME:
				onPress={ () => toggleClickPlaylist(title, backgroundColor) }
			>
				<FastImage
					style={ {
						position: "absolute",
						width: scale(167),
						height: scale(160),
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					} }
					source={ {
						uri: imageURL ? `${imageURL}` : "",
						priority: FastImage.priority.high,
					} }
					resizeMode={ FastImage.resizeMode.cover }
				/>
				<Header numberOfLines={ 2 } ellipsizeMode="tail">
					{title}
				</Header>
				<HeaderWrapper
					style={ {
						backgroundColor: backgroundColor,
					} }
				/>
			</CardContainerCP>

			<GradientText
				width={ scale(167) }
				fontSize={ scale(14) }
				height={ verticalScale(18) }
				text={ tickerListRenderer }
				gradientDirection={ GradientDirection.HORIZONTAL }
				gradientColors={ [
					{
						color: "#252525",
						offset: "75%",
					},
					{
						color: "#fff",
						offset: "100%",
					},
				] }
			/>
		</PlayListContainer>
	);
};

const PlayListContainer = styled.TouchableOpacity``;

const HeaderWrapper = styled.View`
	height: ${verticalScale(54)}px;
	width: ${scale(167)}px;
	position: absolute;
	left: 0;
	bottom: 0;
`;

const Header = styled.Text`
	font-family: ProximaNova-Bold;
	font-style: normal;
	color: #252525;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(19)}px;
	width: 100%;
	position: relative;
	z-index: 1;
	margin-bottom: ${verticalScale(8)}px;
	font-variant: lining-nums;
`;

const CardContainerCP = styled.Pressable`
	width: ${scale(167)}px;
	height: ${scale(160)}px;
	background-color: #000;
	margin-right: ${scale(16)}px;
	border-radius: ${scale(6)}px;
	padding: 8px ${scale(8)}px 0;
	align-items: flex-start;
	justify-content: flex-end;
	position: relative;
	overflow: hidden;
	margin-bottom: ${verticalScale(8)}px;
`;

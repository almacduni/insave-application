import React, { FC, useCallback, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { PlaylistsItem } from "./PlaylistsItem";
import { PlaylistItemDataType } from "../../types/commonTypes";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { getPlaylistsById } from "../../redux/searchSlice";

const palette = [
	"#71DECB",
	"#F4C7CC",
	"#F5C6BF",
	"#C7FBD0",
	"#D8E9EB",
	"#E7A0D2",
	"#ECAD63",
	"#C8E5F4",
	"#72F3DE",
];

const backgroundColors: { [key: string]: string } = {};

type PropsType = {
	navigation: any;
	data?: PlaylistItemDataType[] | null;
	fromCompany?: boolean;
	playlistsLimit?: number;
	updateSearch: (search: string) => void;
	handleLoadMore?: () => void;
};
export const Playlists: FC<PropsType> = ({
	navigation,
	data,
	fromCompany,
	playlistsLimit,
	updateSearch,
	handleLoadMore,
}) => {
	const playlistsData = useAppSelector(
		(state) => state.SearchScreenR.playlists
	);
	const dispatch = useAppDispatch();
	const listRef = useRef(null);
	const keyExtractor = (_: any, index: number) => index.toString();
	const handleLoadMorePlaylists = (id: number) => {
		if (playlistsLimit) {
			let page: number;
			const categoryPage = playlistsData.filter((category) => category.id === id)[0]?.page;

			if (categoryPage) {
				page = categoryPage + 1;
			} else {
				page = 2;
			}
			dispatch(getPlaylistsById({ id, pageLimit: playlistsLimit, page }));
		}
	};

	// TODO: move to shared
	function scrollToTop (nav: any, ref: any) {
		nav.setParams({
			scrollToTop: () => ref?.current?.scrollToOffset({ offset: 0, animated: true }),
		});
	}

	useEffect(() => {
		if (listRef && listRef.current) {
			scrollToTop(navigation, listRef);
		}
	}, []);
	const renderPlaylistItem = useCallback(({ item, index }) => {
		if (!backgroundColors[item.id])
			backgroundColors[item.id] =
				palette[Math.floor(palette.length * Math.random())];

		return (
			<PlaylistsItem
				key={ index.toString() }
				title={ item.title }
				isLogged={ false }
				imageURL={ item.imageURL }
				navigation={ navigation }
				updateSearch={ updateSearch }
				fromCompany={ fromCompany }
				tickerList={ item.tickers }
				playlistId={ item.id }
				backgroundColor={ backgroundColors[index] }
			/>
		);
	}, []);

	const renderList = useCallback(
		({ item, index }) => (
			<PlaylistWrapper isFirst={ index === 0 } key={ index.toString() }>
				<PlaylistHeader>
					<PlaylistHeaderTitle>{item.category}</PlaylistHeaderTitle>
					<PlaylistHeaderMoreButton onPress={ () => {} }>
						<PlaylistHeaderMoreButtonTitle>
							More
						</PlaylistHeaderMoreButtonTitle>
					</PlaylistHeaderMoreButton>
				</PlaylistHeader>
				<FlatList
					horizontal={ true }
					renderItem={ renderPlaylistItem }
					data={ item.playlists }
					onEndReached={ () => handleLoadMorePlaylists(item.id) }
					onEndReachedThreshold={ 0.5 }
					showsHorizontalScrollIndicator={ false }
					keyExtractor={ keyExtractor }
				/>
			</PlaylistWrapper>
		),
		[playlistsData]
	);

	return (
		<Container>
			{data ? (
				<PlaylistWrapper>
					<Row>
						<PlaylistHeaderTitle>Playlists</PlaylistHeaderTitle>
						<MoreButton
							onPress={ () => navigation.push("PlaylistsCompanyProfile") }
						>
							<MoreButtonText>More</MoreButtonText>
						</MoreButton>
					</Row>

					<FlatList
						horizontal={ true }
						renderItem={ renderPlaylistItem }
						data={ data }
						showsHorizontalScrollIndicator={ false }
						keyExtractor={ keyExtractor }
					/>
				</PlaylistWrapper>
			) : (
				<FlatList
					renderItem={ renderList }
					data={ playlistsData }
					ref={ listRef }
					onEndReached={ handleLoadMore }
					onEndReachedThreshold={ 0.5 }
					removeClippedSubviews={ true }
				/>
			)}
		</Container>
	);
};

const Container = styled.View`
	margin-left: 16px;
	flex-direction: column;
	flex: 1;
	height: 100%;
	position: relative;
`;

const PlaylistWrapper = styled.View<{ isFirst?: boolean; isOne?: boolean }>`
	margin-top: ${({ isFirst }) => (isFirst ? `${verticalScale(8)}px` : "24px")};
`;

const Row = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding-right: 17px;
`;

const MoreButton = styled.Pressable``;

const MoreButtonText = styled.Text`
	font-family: Proxima Nova;
	color: #566aec;
	font-size: ${scale(16)}px;
`;

const PlaylistHeaderTitle = styled.Text`
	font-family: ProximaNova-Bold;
	font-size: ${scale(21)}px;
	line-height: ${verticalScale(28)}px;
	margin-bottom: ${verticalScale(16)}px;
`;

const PlaylistHeader = styled.View<{ isSearch?: boolean }>`
	flex-direction: row;
	align-items: center;
`;

const PlaylistHeaderMoreButton = styled.TouchableOpacity`
	margin-left: auto;
	margin-right: ${scale(16)}px;
	padding-bottom: ${verticalScale(10)}px;
`;
const PlaylistHeaderMoreButtonTitle = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
	color: #566aec;
`;

import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

import { useAppDispatch } from "../../hooks/useRedux";
import { getPlaylists } from "../../redux/searchSlice";
import { Playlists } from "../../components/Playlists/Playlists";
import { SearchBarComponent } from "../../components/SearchBarComponent/SearchBarComponent";
import { SearchList } from "../../components/SearchList/SearchList";
import { verticalScale } from "../../helpers/sizeConverter";
import { SkeletonSearchScreen } from "../../skeletons/SkeletonSearchScreen";
import { WithSafeArea } from "../../shared/ui";

type SearchScreenPropsType = {
	navigation: any;
	search: string;
	updateSearch: (search: string) => void;
	toggleOnClear: () => void;
	isFetching: boolean;
	isLoadMore: boolean;
	handleLoadMoreSearch: () => void;
	setSearch: (arg1: string) => void;
};

export const SearchScreen: React.FC<SearchScreenPropsType> = ({
	navigation,
	search,
	updateSearch,
	toggleOnClear,
	isLoadMore,
	handleLoadMoreSearch,
	isFetching,
	setSearch,
}) => {
	const PAGE_LIMIT = 6;
	const PLAYLIST_LIMIT = 6;
	const [isInitialFetch, setIsInitialFetch] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [page, setPage] = useState(1);
	const dispatch = useAppDispatch();
	const overlay = modalVisible && <Overlay style={ StyleSheet.absoluteFill } />;

	const handleLoadMore = () => {
		dispatch(
			getPlaylists({
				page: page,
				pageLimit: PAGE_LIMIT,
				isLoadMore: true,
				playlistLimit: PLAYLIST_LIMIT,
			})
		);
		setPage((prev) => ++prev);
		if (isInitialFetch) {
			setIsInitialFetch(false);
		}
	};
	const handleOpenSearchList = () => {
		setModalVisible(true);
	};

	const handleCloseSearchList = () => {
		setModalVisible(false);
	};

	useEffect(() => {
		dispatch(
			getPlaylists({
				page: 1,
				pageLimit: PAGE_LIMIT,
				playlistLimit: PLAYLIST_LIMIT,
			})
		);
		setPage((prevPage) => (prevPage += 1));
	}, []);

	return (
		<WithSafeArea>

			<ContainerSearchScreen>
				{isFetching && !isLoadMore && isInitialFetch ? (
					<SkeletonSearchScreen />
				) : (
					<>
						<SearchBarContainer onPress={ handleOpenSearchList } />
						<SearchBarComponent />

						{!modalVisible ? (
							<Playlists
								updateSearch={ updateSearch }
								navigation={ navigation }
								handleLoadMore={ handleLoadMore }
								playlistsLimit={ PLAYLIST_LIMIT }
							/>
						) : (
							<>
								{overlay}
								<SearchList
									search={ search }
									visible={ modalVisible }
									toggleOnClear={ toggleOnClear }
									handleOpenSearchList={ handleOpenSearchList }
									hide={ handleCloseSearchList }
									isLoadMore={ isLoadMore }
									handleLoadMoreSearch={ handleLoadMoreSearch }
									setSearch={ setSearch }
									updateSearch={ updateSearch }
									navigation={ navigation }
									isFetching={ isFetching }
								/>
							</>
						)}
					</>
				)}
			</ContainerSearchScreen>
		</WithSafeArea>

	);
};

const Overlay = styled.View`
	background: #fff;
`;

const ContainerSearchScreen = styled.View`
	flex: 1;
	height: 100%;
	width: 100%;
	background: white;
`;

const SearchBarContainer = styled.Pressable`
	width: 100%;
	height: ${verticalScale(50)}px;
	position: absolute;
	z-index: 1231;
`;

import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";
import debounce from "debounce";
import { useDispatch } from "react-redux";

import { SearchScreen } from "./SearchScreen";
import { SearchItemExtended } from "../../components/SearchItemExtended/SearchItemExtended";
import { getSearchResults } from "../../redux/searchSlice";
import { useAppSelector } from "../../hooks/useRedux";
import { PlaylistExtendedScreen } from "../PlaylistExtendedScreen/PlaylistExtendedScreen";
import { PlaylistsCompanyProfile } from "../../components/Playlists/PlaylistsCompanyProfile";

const Stack = createStackNavigator();

type SearchScreenContainerPropsType = {
	navigation: any;
};

export const SearchScreenContainer: React.FC<SearchScreenContainerPropsType> =
	({ navigation }) => {
		const PAGE_LIMIT = 9;
		const dispatch = useDispatch();
		const [search, setSearch] = useState("");
		const [isLoadMore, setIsLoadMore] = useState(false);
		const state = useAppSelector((appState) => appState.SearchScreenR);
		const [page, setPage] = useState(1);

		const updateSearch = (searchValue: string) => {
			if (search !== searchValue) {
				debounce(
					dispatch(
						getSearchResults({
							ticker: searchValue,
							page: 1,
							pageLimit: PAGE_LIMIT,
							isLoadMore: false,
						})
					),
					30
				);
				setPage(2);

			} else {
				debounce(
					dispatch(
						getSearchResults({
							ticker: searchValue,
							page,
							pageLimit: PAGE_LIMIT,
							isLoadMore: false,
						})
					),
					30
				);
				setPage((prevPage) => prevPage + 1);
			}
			setSearch(searchValue);
			setIsLoadMore(true);
		};

		const handleLoadMoreSearch = () => {
			dispatch(
				getSearchResults({
					ticker: search,
					page,
					pageLimit: PAGE_LIMIT,
					isLoadMore: true,
				})
			);
			setPage((prevPage) => prevPage + 1);
		};
		const toggleOnClear = () => {
			setSearch("");
			setPage(1);
			setIsLoadMore(false);
		};

		return (
			<Container>
				<Stack.Navigator screenOptions={ { headerShown: false } }>
					<Stack.Screen name="SearchScreen">
						{() => (
							<SearchScreen
								toggleOnClear={ toggleOnClear }
								search={ search }
								setSearch={ setSearch }
								navigation={ navigation }
								updateSearch={ updateSearch }
								isLoadMore={ isLoadMore }
								handleLoadMoreSearch={ handleLoadMoreSearch }
								isFetching={ state.isFetching }
							/>
						)}
					</Stack.Screen>
					<Stack.Screen name="SearchItemExtended">
						{() => (
							<SearchItemExtended
								toggleOnClear={ toggleOnClear }
								search={ search }
								updateSearch={ updateSearch }
								navigation={ navigation }
							/>
						)}
					</Stack.Screen>
					<Stack.Screen name="PlaylistsCompanyProfile">
						{() => <PlaylistsCompanyProfile updateSearch={ updateSearch } />}
					</Stack.Screen>
					<Stack.Screen
						name="PlaylistExtendedScreen"
						component={ PlaylistExtendedScreen }
					/>
				</Stack.Navigator>
			</Container>
		);
	};

const Container = styled.View`
	flex: 1;
	height: 100%;
`;

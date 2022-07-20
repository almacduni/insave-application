import React, { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Keyboard } from "react-native";
import styled from "styled-components/native";
import { debounce } from "debounce";

import { SearchBarComponent } from "../SearchBarComponent/SearchBarComponent";
import { verticalScale } from "../../helpers/sizeConverter";
import { HEIGHT, WIDTH } from "../../constants/sizes";
import { setSearchResults, getSearchResultsWatchList } from "../../redux/chartSlice";
import { WatchListItemType } from "../../types/commonTypes";
import { WatchListSearchItem } from "./WatchListSearchItem";
import { useAppSelector } from "../../hooks/useRedux";

type Props = {
	update: (tickers: WatchListItemType[] | any[], ticker?: string) => void;
	visible: boolean;
	hide: () => any;
	onSelect: (ticker: string) => void;
};

export const WatchListSearch: FC<Props> = ({ update, visible, hide, onSelect }) => {
	const dispatch = useDispatch();
	const chartState = useAppSelector((state) => state.chart);
	const [search, setSearch] = useState("");

	const makeSearch = useCallback(
		debounce((searchString: string) => {
			if (searchString)
				dispatch(getSearchResultsWatchList({ searchPhrase: search, page: 1, pageLimit: 10 }));
		}, 1000),
		[],
	);

	const toggleOnClear = (ticker: string) => {
		Keyboard.dismiss();
		hide();
		setSearch("");
		dispatch(setSearchResults(null));
		if (typeof ticker === "string") onSelect(ticker);
	};

	const updateSearch = (searchString: string) => {
		setSearch(searchString);
		if (searchString) {
			makeSearch(searchString);
		}
	};

	const searchItem = ({ item }: any) => (
		<WatchListSearchItem { ...item } update={ update } toggleOnClear={ toggleOnClear } />
	);

	const renderSearchList = () => {
		if (search) {
			return (
				<SearchList
					keyExtractor={ (_, id) => id.toString() }
					data={ chartState.searchResults || [] }
					renderItem={ searchItem }
					keyboardShouldPersistTaps="always"
				/>
			);
		}

		return <></>;
	};

	return (
		<Modal animationType="none" visible={ visible } onRequestClose={ hide } transparent={ true }>
			<ModalWrapper>
				<ModalScroll keyboardShouldPersistTaps={ "always" } height={ HEIGHT } width={ WIDTH }>
					<SearchContainer>
						<Search
							search={ search }
							onChangeSearch={ updateSearch }
							toggleOnCancel={ () => toggleOnClear("") }
							isFocus
							withCancel
						/>
						{renderSearchList()}
					</SearchContainer>
				</ModalScroll>
			</ModalWrapper>
		</Modal>
	);
};

const ModalWrapper = styled.View`
	flex: 1;
	background-color: #fff;
`;

const ModalScroll = styled.ScrollView<{ height: number; width: number }>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
`;

const SearchContainer = styled.View`
	padding: 0 16px;
	margin-top: ${verticalScale(10)}px;
`;

const Search = styled(SearchBarComponent)`
	margin-top: ${verticalScale(10)}px;
`;

const SearchList = styled.FlatList`
	margin: 24px 0;
`;

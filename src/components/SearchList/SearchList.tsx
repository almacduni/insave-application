import React, { useRef } from "react";
import { FlatList, Modal, Platform } from "react-native";
import styled from "styled-components/native";

import { setCompanyDescriptionTC } from "../../redux/searchSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { SearchBarComponent } from "../../components/SearchBarComponent/SearchBarComponent";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { SkeletonSearchOpen } from "../../skeletons/SkeletonSearchOpen";
import { HEIGHT, WIDTH } from "../../constants/sizes";

interface IRenderItem {
	item: {
		ticker: string;
		companyName: string;
	};
	index: number;
}

type SearchListPropsType = {
	updateSearch: any;
	navigation: any;
	visible: boolean;
	hide: () => void;
	setSearch: (arg1: string) => void;
	toggleOnClear: any;
	search: any;
	inputRef?: any;
	isLoadMore: boolean;
	handleOpenSearchList: () => void;
	handleLoadMoreSearch: () => void;
	isFetching: boolean;
};

export const SearchList: React.FC<SearchListPropsType> = ({
	updateSearch,
	navigation,
	visible,
	setSearch,
	hide,
	toggleOnClear,
	search,
	handleOpenSearchList,
	isLoadMore,
	handleLoadMoreSearch,
	isFetching,
}) => {
	const dispatch = useAppDispatch();
	const state = useAppSelector((appState) => appState.SearchScreenR);

	const togglePressItem = (ticker: string) => {
		dispatch(setCompanyDescriptionTC({ ticker }));
		navigation.navigate("SearchItemExtended", { handleOpenSearchList });
		hide();
	};
	const toggleOnCancel = () => {
		hide();
		setSearch("");
	};
	const renderItem = ({ item, index }: IRenderItem) => (
		<ItemContainer onPress={ () => togglePressItem(item.ticker) } key={ index }>
			<ItemShortName>{item.ticker}</ItemShortName>
			<ItemFullName>{item.companyName}</ItemFullName>
		</ItemContainer>
	);
	const keyExtractor = (_: any, index: number) => index.toString();
	const inputRef = useRef(null);

	return (

		<Modal animationType="none" visible={ visible } onRequestClose={ hide } transparent={ true }>
			<ModalWrapper platform={ Platform.OS }>
				<ModalScroll keyboardShouldPersistTaps={ "always" } height={ HEIGHT + 200 } width={ WIDTH }>
					<SearchContainer>
						<SearchBarComponent
							search={ search }
							visible={ visible }
							inputRef={ inputRef }
							onChangeSearch={ updateSearch }
							toggleOnClear={ toggleOnClear }
							isFocus={ true }
							withCancel
							toggleOnCancel={ toggleOnCancel }
						/>
						{isFetching && isLoadMore ? (
							<SkeletonSearchOpen />
						) : (
							<FlatList
								keyboardShouldPersistTaps={ "always" }
								renderItem={ renderItem }
								data={ state.searchResults }
								showsHorizontalScrollIndicator={ false }
								keyExtractor={ keyExtractor }
								onEndReachedThreshold={ 0.3 }
								onEndReached={ handleLoadMoreSearch }
							/>
						)}
					</SearchContainer>
				</ModalScroll>
			</ModalWrapper>
		</Modal>
	);
};

const ItemContainer = styled.TouchableOpacity`
	margin-bottom: ${verticalScale(16)}px;
`;
const ItemShortName = styled.Text`
	font-family: ProximaNova-Bold;
	font-size: ${scale(17)}px;
	font-variant: lining-nums;
`;
const ItemFullName = styled.Text`
	font-family: ProximaNova-Semibold;
	font-size: ${scale(13)}px;
	color: rgba(3, 6, 29, 0.4);
	font-variant: lining-nums;
	margin-top: ${scale(4)}px;
`;

const ModalWrapper = styled.View<{platform: string}>`
	flex: 1;
	height: 100%;
	width: 100%;
	margin-top: ${({ platform }) => platform === "ios" ? `${verticalScale(40)}px` : 0};
	background-color: #fff;
`;

const ModalScroll = styled.ScrollView<{ height: number; width: number }>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
`;

const SearchContainer = styled.View`
	padding: 0 16px;
`;

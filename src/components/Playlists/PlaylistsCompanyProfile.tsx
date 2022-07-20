import React, { FC, useCallback, useRef } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

import { verticalScale } from "../../helpers/sizeConverter";
import { PlaylistsItem } from "./PlaylistsItem";
import { PlaylistItemDataType } from "../../types/commonTypes";
import { useAppSelector } from "../../hooks/useRedux";
import { ButtonBack } from "../../shared/ui";

const palette = [
	"#71DECB",
	"#F4C7CC",
	"#C7FBD0",
	"#D8E9EB",
	"#E7A0D2",
	"#ECAD63",
	"#F5C6BF",
	"#C8E5F4",
	"#72F3DE",
];

const backgroundColors: { [key: string]: string } = {};

type PropsType = {
	navigation?: any;
	data?: PlaylistItemDataType[] | null;
	fromCompany?: boolean;
	updateSearch: (search: string) => void;
};
export const PlaylistsCompanyProfile: FC<PropsType> = ({
	data,
	fromCompany,
	updateSearch,
}) => {
	const navigation = useNavigation();

	return (
		<Container isData={ !!data }>
			<Playlists
				navigation={ navigation }
				data={ data }
				fromCompany={ fromCompany }
				updateSearch={ updateSearch }
			/>
		</Container>
	);
};

const Playlists: FC<PropsType> = ({
	navigation,
	fromCompany,
	updateSearch,
}) => {
	const stateSearch = useAppSelector(
		(state) => state.SearchScreenR.companyDescriptionPlaylists
	);
	const listRef = useRef(null);

	const headerComponent = () => (
		<>
			<WrapperHeader>
				<ButtonBack title="Explore" onPress={ () => navigation.goBack() } />
			</WrapperHeader>
			<PlaylistsTitle>All playlists</PlaylistsTitle>
		</>
	);
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
				isCompanyProfile={ true }
				fromCompany={ fromCompany }
				tickerList={ item.tickers }
				playlistId={ item.id }
				backgroundColor={ backgroundColors[item.id] }
			/>
		);
	}, []);
	const renderList = useCallback(({ item, index }) => (
		<PlaylistWrapper key={ index.toString() }>
			<FlatList
				horizontal={ true }
				renderItem={ renderPlaylistItem }
				data={ [item] }
				showsHorizontalScrollIndicator={ false }
				keyExtractor={ keyExtractor }
			/>
		</PlaylistWrapper>
	), []);

	const keyExtractor = (_: any, index: number) => index.toString();

	return (
		<FlatList
			renderItem={ renderList }
			data={ stateSearch }
			numColumns={ 2 }
			ListHeaderComponent={ headerComponent }
			ref={ listRef }
		/>
	);
};
const Container = styled.View<{ isData: boolean }>`
	margin-left: 16px;
	flex-direction: column;
	flex: 1;
	height: 100%;
`;

const PlaylistWrapper = styled.View<{ isFirst?: boolean; isOne?: boolean }>`
	margin-top: ${({ isFirst }) => (isFirst ? "8px" : "24px")};
	margin-bottom ${({ isOne }) => (isOne ? `${verticalScale(150)}px` : "20px")}
`;

const PlaylistsTitle = styled.Text`
	font-family: Proxima Nova;
	font-weight: bold;
	font-size: 21px;
	line-height: 28px;
	letter-spacing: 0.15px;
	margin-top: ${verticalScale(34)}px;
	color: #03061d;
`;

const WrapperHeader = styled.View`
	margin-top: ${verticalScale(12)}px;
	align-self: flex-start;
`;

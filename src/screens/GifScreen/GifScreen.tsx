import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { debounce } from "debounce";

import BackIcon from "../../assets/BackIcon.svg";
import { feedAPI } from "../../api/feed-api";
import { SearchBarComponent } from "../../components/SearchBarComponent/SearchBarComponent";
import { scale, verticalScale } from "../../helpers/sizeConverter";

interface GifScreenProps {
	navigation: any;
	route: any;
}

export const GifScreen: React.FC<GifScreenProps> = ({ navigation, route }) => {
	const [withCancel, setWithCancel] = useState(false);
	const [search, setSearch] = useState("");
	const [gifs, setGifs] = useState([]);

	const updateSearch = debounce(async (gifsName: string) => {
		if (gifsName.length !== 0) {
			const request = await feedAPI.getGifsByName(gifsName);

			return setGifs(request);
		} else {
			const request = await feedAPI.getTrendingGifs();

			setGifs(request);
		}
	}, 100);
	const toggleOnClear = async () => {
		setSearch("");
		setWithCancel(false);
		const request = await feedAPI.getTrendingGifs();

		setGifs(request);
	};

	useEffect(() => {
		const fetchGifs = async () => {
			const request = await feedAPI.getTrendingGifs();

			setGifs(request);
		};

		fetchGifs();
	}, []);

	const renderItem = useCallback(
		({ item }) => (
			<GifPressWrapper
				onPress={ () => {
					navigation.goBack();
					route.params.setGifsList(`${item}.gif`);
				} }
			>
				<FastImage
					source={ { uri: `${item}.gif` } }
					style={ {
						width: "100%",
						height: verticalScale(124),
					} }
				/>
			</GifPressWrapper>
		),
		[],
	);
	const keyExtractor = (_: any, index: number) => index.toString();

	return (
		<Wrapper>
			<Header>
				<Btn onPress={ navigation.goBack }>
					<BackIcon />
					<BtnText>Feed</BtnText>
				</Btn>
			</Header>
			<SearchBarWrapper withCancel={ withCancel }>
				<SearchBarComponent
					changeWithCancel={ () => setWithCancel(true) }
					withCancel={ withCancel }
					search={ search }
					placeholder="Enter GIF"
					onChangeSearch={ updateSearch }
					onChangeStateSearch={ setSearch }
					toggleOnCancel={ toggleOnClear }
					setWithCancel={ setWithCancel }
				/>
			</SearchBarWrapper>
			{gifs.length !== 0 && (
				<GifContainer>
					<GifItems>
						<GifItemsContainer>
							<FlatListGifs
								keyboardShouldPersistTaps="always"
								showsVerticalScrollIndicator={ false }
								showsHorizontalScrollIndicator={ false }
								data={ gifs }
								horizontal={ false }
								numColumns={ 3 }
								renderItem={ renderItem }
								keyExtractor={ keyExtractor }
							/>
						</GifItemsContainer>
					</GifItems>
				</GifContainer>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	background: #fff;
`;

const Header = styled.View`
	width: 100%;
	height: ${verticalScale(44)}px;
	flex-direction: row;
	padding-top: ${verticalScale(16)}px;
	margin-left: 10px;
	margin-bottom: 3px;
`;

const Btn = styled.TouchableOpacity`
	width: 70px;
	min-height: 25px;
	flex-direction: row;
	align-items: center;
`;

const BtnText = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(20)}px;
	letter-spacing: ${scale(0.5)}px;
	color: #03061d;
`;

const SearchBarWrapper = styled.View<{ withCancel: boolean }>`
	width: 100%;
	padding: ${({ withCancel }) => (withCancel ? "0 16px" : "0px")};
`;

const GifContainer = styled.View``;
const GifItems = styled.ScrollView`
	height: 100%;
	width: 100%;
`;
const GifItemsContainer = styled.View`
	height: 100%;
	width: 100%;
	display: flex;
	padding-bottom: ${verticalScale(100)}px;
	flex-direction: row;
	flex-wrap: wrap;
`;
const GifPressWrapper = styled.TouchableOpacity`
	width: 33.3333%;
	margin-top: 1px;
	margin-right: 1px;
	height: ${verticalScale(124)}px;
`;

const FlatListGifs = styled.FlatList``;

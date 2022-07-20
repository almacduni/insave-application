import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { verticalScale } from "../../helpers/sizeConverter";
import { ArticleSmall } from "../ArticleSmall/ArticleSmall";
import { RootStackParamList } from "../../routes/Routing";
import { useAppSelector } from "../../hooks/useRedux";
// import { scrollToTop } from "../../routes/TabRouting";
import { FeedSections } from "../../widgets/feed-sections";

type FeedNavigationProp = StackNavigationProp<RootStackParamList, "FeedScreen">;

type FeedScreenPropsType = {
	userId: number | null;
	handleLoadMore: () => void;
	onRefresh: () => void;
	refreshing: boolean;
};

export const Feed: React.FC<FeedScreenPropsType> = ({
	userId,
	handleLoadMore,
	refreshing,
	onRefresh,
}) => {
	const navigation = useNavigation();
	const state = useAppSelector((s) => s.feed);
	const loginState = useAppSelector((s) => s.user);
	const listRef = useRef(null);

	// TODO: move to shared
	function scrollToTop (nav: any, ref: any) {
		nav.setParams({
			scrollToTop: () => ref?.current?.scrollToOffset({ offset: 0, animated: true }),
		});
	}

	useEffect(() => {
		if (listRef?.current) {
			scrollToTop(navigation, listRef);
		}
	}, []);
	const renderItem = useCallback(
		({ item }) => (
			<>
				{!!item && (
					<ArticleSmall
						feedBody={ item.text }
						publishedAt={ item.date }
						likesCount={ item.likesCount }
						logoLink={ item.userLogo }
						commentsCount={ item.commentsCount }
						username={ item.username }
						name={ `${item.userFirstName} ${item.userLastName}` }
						isLiked={ item.isLiked }
						itemId={ item.id }
						pictures={ item.pictures }
						poll={ item.poll }
						userId={ userId }
						isLogged={ loginState.isLogin }
						navigation={ navigation }
						type="articleSmall"
					/>
				)}
			</>
		),
		[state.feedItems],
	);
	const BottomRenderItem = () => {
		if (!state.isFetching) {
			return <></>;
		}

		return (
			<ContainerBottom>
				<ActivityIndicator size="small" color="#000000" />
			</ContainerBottom>
		);
	};
	const keyExtractor = (_: any, index: number) => index.toString();

	return (
		<>
			<Container>
				<FlatList
					data={ state.feedItems }
					extraData={ state.feedItems }
					renderItem={ renderItem }
					ref={ listRef }
					keyExtractor={ keyExtractor }
					onEndReached={ handleLoadMore }
					onEndReachedThreshold={ 0.5 }
					onRefresh={ onRefresh }
					refreshing={ refreshing }
					ListHeaderComponent={ FeedSections }
					ListFooterComponent={ BottomRenderItem }
				/>
			</Container>
		</>
	);
};

const Container = styled.View`
	position: relative;
	height: 100%;
`;

const ContainerBottom = styled.View`
	width: 100%;
	height: ${verticalScale(75)}px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

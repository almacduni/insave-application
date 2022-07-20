import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

import { SkeletonPost } from "../../skeletons/SkeletonPost";
import { Feed } from "../../components/Feed/Feed";
import { RootStackParamList } from "../../routes/Routing";
import { getFeedData } from "../../redux/feedSlice";
import { authenticationCheck } from "../../helpers/authenticationCheck";
import { useAppSelector } from "../../hooks/useRedux";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { WithSafeArea } from "../../shared/ui";

type FeedScreenPropsType = {
	navigation: FeedScreenNavigationProp;
};

type FeedScreenNavigationProp = StackNavigationProp<RootStackParamList, "FeedScreen">;

export const PAGE_LIMIT = 10;

export const FeedScreen: React.FC<FeedScreenPropsType> = ({ navigation }) => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const userId = useAppSelector((state) => state.user.userId);
	const section = useAppSelector((state) => state.feed.section);
	const stateFeed = useAppSelector((state) => state.feed);
	const onRefresh = useCallback(
		() => {
			dispatch(
				getFeedData({
					section,
					page: 1,
					pageLimit: PAGE_LIMIT,
				}),
			);
			setPage(2);
		},
		[page],
	);

	useEffect(() => {
		dispatch(
			getFeedData({
				section,
				page,
				pageLimit: PAGE_LIMIT,
			}),
		);
		setPage((prev) => prev + 1);
	}, []);

	const handleLoadMore = useCallback(() => {
		dispatch(
			getFeedData({
				section,
				page,
				pageLimit: PAGE_LIMIT,
				isLoadMore: true,
			}),
		);
		setPage((prev) => prev + 1);
	}, [page]);
	const router = useRoute();

	return (
		<WithSafeArea>
			{stateFeed.isFetching && router.name === "FeedScreen" && !stateFeed.isFirstLoad ? (
				<SkeletonPost isComments={ false } />
			) : (
				<Container>
					<Feed
						userId={ userId }
						handleLoadMore={ handleLoadMore }
						refreshing={ false }
						onRefresh={ onRefresh }
					/>
					<WriteContainer
						style={ {
							transform: [{ scale: 0.98 }],
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 1,
							},
							shadowOpacity: 0.22,
							shadowRadius: 2.22,

							elevation: 3,
						} }
						onPress={ () => {
							authenticationCheck(
								() =>
									navigation.push("WriteScreen", {
										userId,
									}),
								null,
								navigation,
							);
						} }
					>
						<ImageIconWriteScreen source={ require("../../assets/OpenToWriteScreenIcon.png") } />
					</WriteContainer>
				</Container>
			)}
		</WithSafeArea>
	);
};

const Container = styled.View`
	height: 100%;
`;

const WriteContainer = styled.TouchableOpacity`
	position: absolute;
	width: auto;
	right: ${scale(-3)}px;
	bottom: ${verticalScale(5)}px;
	background-color: rgba(0, 0, 0, 0);
	transform: scale(1.1);
`;
const ImageIconWriteScreen = styled.Image`
	width: ${scale(99)}px;
	height: ${verticalScale(99)}px;
`;

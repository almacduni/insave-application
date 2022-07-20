import moment from "moment";
import React, { useState } from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSharedValue } from "react-native-reanimated";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import { Comments } from "../Comments/Comments";
import { CommentBox } from "../CommentBox/CommentBox";
import { InfoActionBlock } from "../InfoActionBlock/InfoActionBlock";
import DotsIcon from "../../assets/dotsIcon.svg";
import { SkeletonPost } from "../../skeletons/SkeletonPost";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { RandomAvatar } from "../RandomAvatar/RandomAvatar";
import { LANDING_PAGE_URL } from "../../constants/urls";
import { setPostLink } from "../../redux/feedSlice";
import { setIsOpenPostSettings } from "../../entity/bottom-sheet";
import { ButtonBack, WithSafeArea } from "../../shared/ui";
import { KeyboardAvoid } from "../KeyboardAvoid/KeyboardAvoid";

type ArticleExtendedPropsType = {
	navigation: any;
	route: any;
};

export const ArticleExtended: React.FC<ArticleExtendedPropsType> = ({ navigation, route }) => {
	const dispatch = useAppDispatch();
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [isClickedBtn, setIsClickedBtn] = useState(false);
	const isFetching = useAppSelector((state) => state.feed.isFetching);
	const {
		publishedAt,
		feedBody,
		isLiked,
		likesCount,
		sharedCount,
		sharedLiked,
		commentsCount,
		itemId,
		userId,
		username,
		isLogged,
	} = route.params;
	const sharedLikesCount = useSharedValue(likesCount);
	const sharedIsLiked = useSharedValue(isLiked);

	const toggleBack = () => {
		if (!isClickedBtn) {
			navigation.goBack();
		}
		setIsClickedBtn(true);
	};
	const [comments, setCommentsCount] = useState<number>(commentsCount);
	const momentDate = moment(publishedAt).fromNow(true);
	const dateAddedPost = moment(publishedAt).format("L");

	const [reply, setReply] = useState({} as { username: string; id: number });
	const [inputValue, setInputValue] = useState("");
	const [repliedUsername, setRepliedUsername] = useState({});
	const handlePressSettings = () => {
		dispatch(setPostLink(`${LANDING_PAGE_URL}/feed/${itemId}`));
		dispatch(setIsOpenPostSettings(true));
	};

	return (
		<WithSafeArea>
			{isFetching && route.name === "ArticleExtended" && isFirstLoad ? (
				<SkeletonPost isComments={ true } />
			) : (
				<KeyboardAvoid withoutHorizontalPadding>
					<Item
						keyboardShouldPersistTaps="always"
					>
						{/* TODO: test on merged feed */}
						<HeaderContainer >
							<ButtonBack title="Back" onPress={ toggleBack }/>
						</HeaderContainer>
						<ItemContainer>
							<ItemHeaderBlock>
								<ImageContainer>
									<RandomAvatar width={ 45 } height={ 45 } username={ username } />
								</ImageContainer>
								<ItemInfoNameWrapper>
									<ItemSourceContainer>
										<SourceWrapper>
											<ItemSource>{username}</ItemSource>
										</SourceWrapper>
										<TouchableWrapper onPress={ handlePressSettings }>
											<DotsIcon />
										</TouchableWrapper>
									</ItemSourceContainer>
								</ItemInfoNameWrapper>
							</ItemHeaderBlock>
							<Article>{feedBody}</Article>
							<ActionBlock>
								<InfoActionBlock
									navigation={ navigation }
									isLiked={ sharedIsLiked }
									likesCount={ sharedLikesCount }
									sharedCount={ sharedCount }
									sharedLiked={ sharedLiked }
									commentsCount={ comments }
									itemId={ itemId }
									userId={ userId }
									type={ "articleExtended" }
								/>
								<InfoTime isDateMoreThenMonth={ momentDate.length >= 4 }>
									{momentDate.length <= 4 ? momentDate : dateAddedPost}
								</InfoTime>
							</ActionBlock>
						</ItemContainer>
						<Comments
							navigation={ navigation }
							userId={ userId }
							repliedUsername={ repliedUsername }
							setReply={ setReply }
							setRepliedUsername={ setRepliedUsername }
							setInputValue={ setInputValue }
						/>
					</Item>

					<ActionContainer>
						<CommentBox
							isExtended
							isLogged={ isLogged }
							navigation={ navigation }
							feedType={ "news" }
							feedId={ itemId }
							reply={ reply }
							commentsCount={ comments }
							setCommentsCount={ setCommentsCount }
							setReply={ setReply }
							setInputValue={ setInputValue }
							inputValue={ inputValue }
							repliedUsername={ repliedUsername }
							setRepliedUsername={ setRepliedUsername }
							setIsFirstLoad={ setIsFirstLoad }
						/>
					</ActionContainer>
				</KeyboardAvoid>
			)}
		</WithSafeArea>
	);
};

const ActionContainer = styled.View`
	border-top-width: ${scale(0.3)}px;
	border-top-color: rgba(37, 37, 37, 0.2);
	background-color: #ffffff;
	width: 100%;
	transform: translateY(10px);
`;
const Item = styled.ScrollView`
	height: 100%;
	position: relative;
`;

const HeaderContainer = styled.View`
	flex-direction: row;
	align-items: center;
	padding-top: ${verticalScale(16)}px;
	margin-bottom: ${verticalScale(20)}px;
	margin-left: 10px;
`;
const ItemHeaderBlock = styled.View`
	flex-direction: row;
	margin-bottom: ${verticalScale(10)}px;
`;
const ItemContainer = styled.View`
	padding: 0 16px;
`;
const ItemInfoNameWrapper = styled.View`
	flex: 1;
	padding-top: ${verticalScale(14)}px;
`;
const ItemSourceContainer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const SourceWrapper = styled.View`
	flex-direction: row;
	align-items: center;
`;
const ItemSource = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(19)}px;
	letter-spacing: ${scale(0.25)}px;
	font-variant: lining-nums;
	margin-right: ${scale(5)}px;
`;

const Article = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	font-variant: lining-nums;
`;
const ImageContainer = styled.View`
	margin-right: ${scale(6)}px;
	width: ${wp("12.26%")}px;
	height: ${wp("12.26%")}px;
`;
const TouchableWrapper = styled.TouchableOpacity``;
const ActionBlock = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${verticalScale(5)}px 0;
	margin-top: ${verticalScale(8)}px;
`;
const InfoTime = styled.Text<{ isDateMoreThenMonth?: boolean }>`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(21)}px;
	letter-spacing: ${scale(0.25)}px;
	font-variant: lining-nums;
	transform: ${({ isDateMoreThenMonth }) =>
		isDateMoreThenMonth ? `translateX(${scale(-45)}px)` : "translateX(0px)"};
	color: #000000;
`;

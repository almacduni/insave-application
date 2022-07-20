import React, { FC, useEffect } from "react";
import styled from "styled-components/native";
import moment from "moment";
import Animated, { useSharedValue } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";

import { weeksSince } from "../../helpers/weekSinceHelper";
import { scale, verticalScale } from "../../helpers/sizeConverter";
import { InfoActionBlock } from "../InfoActionBlock/InfoActionBlock";
import DotsIcon from "../../assets/dotsIcon.svg";
import OkIconChoice from "../../assets/OkIconChoice.svg";
import { getCommentsFromPost, setPostLink, setVoteToPoll } from "../../redux/feedSlice";
import { useAppDispatch } from "../../hooks/useRedux";
import { SwipeComment } from "../SwipeComment/SwipeComment";
import { authenticationCheck } from "../../helpers/authenticationCheck";
import { RandomAvatar } from "../RandomAvatar/RandomAvatar";
import { setIsOpenPostSettings } from "../../entity/bottom-sheet";
import { LANDING_PAGE_URL } from "../../constants/urls";

export interface PollType {
	id: string;
	isVoted: boolean;
	title: string;
	votes: number;
	choices: [];
}

export type PropsType = {
	feedBody: string;
	publishedAt: string;
	likesCount: number;
	commentsCount: number;
	logoLink: string;
	isLiked: boolean;
	itemId: number;
	userId: number | null;
	isLogged: boolean;
	navigation: any;
	name: string;
	gifUrl?: string;
	poll?: { choices: PollType[] };
	pictures?: string[];
	username: string;
	repliedUsername?: { commentValue: string };
	replyTo?: string;
	setInputValue?: (inputValue: (prevState: string) => string) => void;
	setRepliedUsername?: (repliedUsername: (prevState: object) => object) => void;
	videoUrl?: string;
	type: string;
	setReply?: any;
};

export const ArticleSmall: FC<PropsType> = ({
	feedBody,
	publishedAt,
	likesCount,
	commentsCount,
	logoLink,
	isLiked,
	itemId,
	type,
	gifUrl,
	setInputValue,
	setRepliedUsername,
	userId,
	isLogged,
	navigation,
	pictures,
	poll,
	name,
	username,
	replyTo,
	setReply,
}) => {
	const momentDate = moment(publishedAt).fromNow(true);
	const dateAddedPost = weeksSince(publishedAt);
	const sharedLikesCount = useSharedValue(likesCount);
	const sharedIsLiked = useSharedValue(isLiked);
	const typeofPublishedDate = momentDate.length <= 4 ? momentDate : dateAddedPost;
	const dispatch = useAppDispatch();
	const toggleArticleExtended = () => {
		navigation.push("ArticleExtended", {
			feedBody,
			publishedAt,
			likesCount,
			sharedCount: sharedLikesCount,
			commentsCount,
			logoLink,
			isLiked,
			sharedLiked: sharedIsLiked,
			itemId,
			name,
			username,
			userId,
			isLogged,
			navigation,
		});
		dispatch(getCommentsFromPost({ postId: itemId }));
	};
	const handleReplyComment = () => {
		setReply({ username, userId });

		if (setInputValue) {
			setInputValue((prevState: string) => {
				if (prevState.split(" ")[0] === `@${username}`) {
					return prevState;
				}

				return `@${username} ${prevState}`;
			});
		}
		if (setRepliedUsername) {
			setRepliedUsername((prevState: object) => ({
				...prevState,
				username: `@${username}`,
			}));
		}
	};
	const onChoicePress = (choiceId: string, postId: number, votes: number) => {
		dispatch(setVoteToPoll({ choiceId, postId, votes }));
	};
	const calcValueVoices = (voiceCount: number) => {
		let allVoicesCount = 0;

		poll?.choices.forEach((item: any) => {
			allVoicesCount += item.votes;
		});

		return (voiceCount * 100) / allVoicesCount;
	};
	const handlePressSettings = () => {
		dispatch(setPostLink(`${LANDING_PAGE_URL}/feed/${itemId}`));
		dispatch(setIsOpenPostSettings(true));
	};
	const isVotedPoll = (vote: { choices: PollType[] }) => {
		const result = vote.choices.some((item: any) => item.isVoted === true);

		return result;
	};

	useEffect(() => {
		sharedLikesCount.value = likesCount;
		sharedIsLiked.value = isLiked;
	}, [isLiked, likesCount]);

	return (
		<>
			{type !== "comments" ? (
				<Container>
					<Item>
						<ItemHeaderBlock>
							<ItemInfoContainer>
								<ImageContainer>
									<RandomAvatar width={ 45 } height={ 45 } username={ username } />
								</ImageContainer>
								<ItemInfoNameWrapper>
									<ItemSourceContainer>
										<SourceWrapper>
											<ItemSource>{username}</ItemSource>
										</SourceWrapper>
										<TouchableWrapper
											onPress={ handlePressSettings }
										>
											<DotsIcon width={ scale(24) } height={ verticalScale(24) } />
										</TouchableWrapper>
									</ItemSourceContainer>
								</ItemInfoNameWrapper>
							</ItemInfoContainer>

							<Article>{feedBody}</Article>
							{poll && (
								<PollWrapper>
									<PollContainer>
										{poll.choices.map((item: PollType) => (
											<>
												{isVotedPoll(poll) ? (
													<PollItemVoted isVoted={ item.isVoted } key={ item.id }>
														<PollTitle>{item.title}</PollTitle>

														<VoiceActive>
															{item.isVoted && (
																<OkIconChoice width={ scale(24) } height={ verticalScale(24) } />
															)}
															<PercentVoice>
																{Math.floor(calcValueVoices(item.votes))}%
															</PercentVoice>
														</VoiceActive>
													</PollItemVoted>
												) : (
													<PollItem
														isVoted={ item.isVoted }
														key={ item.id }
														onPress={ () =>
															authenticationCheck(
																() => onChoicePress(item.id, itemId, item.votes),
																null,
																navigation,
																"LoginScreen",
															)
														}
													>
														<PollTitle>{item.title}</PollTitle>

														{isVotedPoll(poll) && (
															<VoiceActive>
																{item.isVoted && (
																	<OkIconChoice width={ scale(24) } height={ verticalScale(24) } />
																)}
																<PercentVoice>
																	{Math.floor(calcValueVoices(item.votes))}%
																</PercentVoice>
															</VoiceActive>
														)}
													</PollItem>
												)}
											</>
										))}
									</PollContainer>
								</PollWrapper>
							)}
							{pictures && (
								<PicturesContainer>
									{pictures?.map((picture, index) => (
										<PictureCover key={ index }>
											<Picture style={ { resizeMode: "cover" } } source={ { uri: picture } } />
										</PictureCover>
									))}
								</PicturesContainer>
							)}
						</ItemHeaderBlock>
						<ActionBlock>
							<InfoActionBlock
								navigation={ navigation }
								isLiked={ sharedIsLiked }
								likesCount={ sharedLikesCount }
								commentsCount={ commentsCount }
								itemId={ itemId }
								userId={ userId }
								commentToggle={ toggleArticleExtended }
								type={ type }
							/>
							<InfoTime isDateMoreThenMonth={ momentDate.length >= 4 }>
								{typeofPublishedDate}
							</InfoTime>
						</ActionBlock>
					</Item>
				</Container>
			) : (
				<Container>
					<Animated.View>
						<SwipeComment onPressReply={ handleReplyComment }>
							<ScrollView>
								<Item>
									<ItemHeaderBlock>
										<ItemInfoContainer>
											<ImageContainer>
												<RandomAvatar width={ 45 } height={ 45 } username={ username } />
											</ImageContainer>
											<ItemInfoNameWrapper>
												<ItemSourceContainer>
													<SourceWrapper>
														<ItemSource>{username}</ItemSource>
													</SourceWrapper>
													<TouchableWrapper
														onPress={ handlePressSettings }
													>
														<DotsIcon />
													</TouchableWrapper>
												</ItemSourceContainer>
											</ItemInfoNameWrapper>
										</ItemInfoContainer>
										{!!replyTo && (
											<ReplyBlock>
												<ReplyToText>reply to </ReplyToText>
												<ReplyUser> @{replyTo}</ReplyUser>
											</ReplyBlock>
										)}
										<ArticleWrapperComment>
											<Article>{feedBody}</Article>
										</ArticleWrapperComment>
									</ItemHeaderBlock>
									{!!gifUrl && (
										<FastImage
											style={ { width: "100%", height: 200, marginBottom: 16, borderRadius: 10 } }
											source={ { uri: gifUrl } }
										/>
									)}
									<ActionBlock>
										<InfoReplyContainer>
											<InfoTime>{typeofPublishedDate}</InfoTime>
											<ReplyAction>
												<ReplyText onPress={ () => handleReplyComment() }>Reply</ReplyText>
											</ReplyAction>
										</InfoReplyContainer>
										<InfoActionBlock
											navigation={ navigation }
											isLiked={ sharedIsLiked }
											likesCount={ sharedLikesCount }
											commentsCount={ commentsCount }
											itemId={ itemId }
											userId={ userId }
											commentToggle={ toggleArticleExtended }
											type={ type }
										/>
									</ActionBlock>
								</Item>
							</ScrollView>
						</SwipeComment>
					</Animated.View>
				</Container>
			)}
		</>
	);
};

const Container = styled.View``;
const ItemHeaderBlock = styled.View`
	flex-direction: column;
	position: relative;
`;
const Item = styled.View<{ isSwiped?: boolean }>`
	margin-top: 10px;
	padding: 0 16px;
	border-bottom-color: rgba(37, 37, 37, 0.2);
	border-bottom-width: ${scale(0.3)}px;
	border-radius: ${scale(10)}px;
	background: ${({ isSwiped }) => (isSwiped ? "#1103200e" : "rgba(255,255,255,1)")};
`;
const ItemSourceContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const ItemInfoNameWrapper = styled.View`
	flex: 1;
	padding-top: ${verticalScale(14)}px;
`;

const SourceWrapper = styled.View`
	flex-direction: row;
	margin-right: auto;
	align-items: center;
`;
const ItemSource = styled.Text`
	font-family: ProximaNova-Semibold;
	font-style: normal;
	font-weight: 600;
	font-size: ${scale(17)}px;
	line-height: ${verticalScale(19)}px;
	letter-spacing: ${scale(0.25)}px;
	font-variant: lining-nums;
	margin-right: ${scale(5)}px;
`;

const ReplyBlock = styled.View`
	display: flex;
	flex-direction: row;
	margin-top: ${verticalScale(15)}px;
`;

const PercentVoice = styled.Text`
	font-size: ${scale(16)}px;
	color: #03061d;
	letter-spacing: ${scale(0.5)}px;
	margin-left: ${scale(8)}px;
`;

const ReplyToText = styled.Text`
	color: #9a9ba5;
	font-size: ${scale(14)}px;
	line-height: ${scale(20)}px;
	font-family: Proxima Nova;
`;
const ReplyUser = styled.Text`
	color: #566aec;
	font-family: Proxima Nova;
	font-size: ${scale(14)}px;
	line-height: ${scale(20)}px;
`;

const ArticleWrapperComment = styled.View`
	position: relative;
`;
const Article = styled.Text`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	font-variant: lining-nums;
	margin-top: ${verticalScale(19)}px;
	margin-bottom: ${verticalScale(16)}px;
`;
const ImageContainer = styled.View`
	margin-right: ${scale(8)}px;
	width: ${scale(48)}px;
	height: ${verticalScale(48)}px;
`;
const PollContainer = styled.View`
	width: 100%;
`;
const PollItem = styled.TouchableOpacity<{ isVoted: boolean }>`
	flex-direction: row;
	width: 100%;
	align-items: center;
	padding: 0 ${scale(12)}px 0 ${scale(18)}px;
	min-height: 48px;
	background: ${({ isVoted }) => (isVoted ? "rgba(86, 106, 236, 0.1)" : "rgba(17, 3, 32, 0.1)")};
	border-radius: ${scale(10)}px;
	margin-bottom: ${verticalScale(10)}px;
`;
const PollItemVoted = styled.View<{ isVoted: boolean }>`
	flex-direction: row;
	width: 100%;
	align-items: center;
	padding: 0 ${scale(12)}px 0 ${scale(18)}px;
	min-height: 48px;
	background: ${({ isVoted }) => (isVoted ? "rgba(86, 106, 236, 0.1)" : "rgba(17, 3, 32, 0.1)")};
	border-radius: ${scale(10)}px;
	margin-bottom: ${verticalScale(10)}px;
`;
const PollTitle = styled.Text`
	font-family: Proxima Nova;
	font-size: ${scale(16)}px;
	letter-spacing: ${scale(0.5)}px;
`;
const ReplyAction = styled.TouchableOpacity`
	margin-left: ${scale(16)}px;
`;
const ReplyText = styled.Text`
	color: #03061d;
	font-family: Proxima Nova;
	font-weight: bold;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(19)}px;
`;
const ItemInfoContainer = styled.View`
	flex-direction: row;
	flex-shrink: 1;
`;
const VoiceActive = styled.TouchableOpacity`
	margin-left: auto;
	flex-direction: row;
`;

const PicturesContainer = styled.View`
	position: relative;
`;
const PictureCover = styled.View`
	margin-bottom: ${verticalScale(15)}px;
`;
const Picture = styled.Image`
	width: 100%;
	height: ${verticalScale(200)}px;
	resize-mode: contain;
`;
const InfoReplyContainer = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const TouchableWrapper = styled.TouchableOpacity``;
const ActionBlock = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: ${verticalScale(-5)}px;
	padding: ${verticalScale(5)}px 0;
`;
const PollWrapper = styled.View`
	flex-direction: row;
	width: 100%;
	height: auto;
	margin-bottom: ${verticalScale(10)}px;
`;

const InfoTime = styled.Text<{ isDateMoreThenMonth?: boolean }>`
	font-family: ProximaNova-Regular;
	font-size: ${scale(16)}px;
	line-height: ${verticalScale(21)}px;
	letter-spacing: ${scale(0.25)}px;
	font-variant: lining-nums;
	transform: translateX(-2px);
	color: #000000;
`;

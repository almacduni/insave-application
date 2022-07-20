import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Animated, {
	interpolateColor,
	useAnimatedProps,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

import { scale, verticalScale } from "../../helpers/sizeConverter";
import CommentsIcon from "../../assets/CommentIconBlack.svg";
import ShareIcon from "../../assets/ShareTweetIcon.svg";
import {
	setLikeToComment,
	setLikeToPost,
	setUnLikeToComment,
	setUnLikeToPost,
} from "../../redux/feedSlice";
import { authenticationCheck } from "../../helpers/authenticationCheck";
import { LikeIcon } from "../Icons/LikeIcon";
import { useAppDispatch } from "../../hooks/useRedux";

type PropsType = {
	likesCount: Animated.SharedValue<number>;
	sharedCount?: Animated.SharedValue<number>;
	sharedLiked?: Animated.SharedValue<boolean>;
	commentsCount: number;
	isLiked: Animated.SharedValue<boolean>;
	itemId: number;
	userId: number | null;
	navigation: any;
	type: string;
	publishedAt?: string;
	commentToggle?: () => void;
};

export const InfoActionBlock: FC<PropsType> = ({
	likesCount,
	sharedCount,
	commentsCount = 0,
	isLiked,
	sharedLiked,
	itemId,
	navigation,
	type,
	commentToggle,
}) => {
	const dispatch = useAppDispatch();
	const [countLikes, setCountLikes] = useState(likesCount.value);
	const toggleLike = (likeCount: number | null, isLiked: boolean) => {
		const isAbleToToggle = typeof likeCount === "number" && typeof itemId === "number";

		if (isAbleToToggle && !isLiked) {
			if (type === "articleSmall") {
				handleAnimate();
				dispatch(setLikeToPost({ itemId, likeCount, isLiked }));

				return;
			}
			if (type === "articleExtended") {
				handleAnimate();
				setCountLikes((prevCount) => (prevCount += 1));
				dispatch(setLikeToPost({ itemId, likeCount, isLiked }));

				return;
			}
			if (type === "comments") {
				handleAnimate();
				dispatch(setLikeToComment({ itemId, likeCount, isLiked }));

				return;
			}
		}
		if (isAbleToToggle && isLiked) {
			if (type === "articleExtended") {
				handleAnimate();
				setCountLikes((prevCount) => --prevCount);
				dispatch(setUnLikeToPost({ itemId, likeCount, isLiked }));

				return;
			}
			if (type === "articleSmall") {
				handleAnimate();
				dispatch(setUnLikeToPost({ itemId, likeCount, isLiked }));

				return;
			}
			if (type === "comments") {
				handleAnimate();
				dispatch(setUnLikeToComment({ itemId, likeCount, isLiked }));

				return;
			}
		}
	};
	const checkIsLogged = () => {
		authenticationCheck(
			() => toggleLike(likesCount.value, isLiked.value),
			null,
			navigation,
			"LoginScreen",
		);
	};

	const scaleAnimate = useSharedValue(1);
	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ scale: scaleAnimate.value }],
	}));

	const handleAnimate = () => {
		if (isLiked.value) {
			likesCount.value -= 1;
			if (sharedCount && sharedLiked) {
				sharedCount.value -= 1;
				sharedLiked.value = false;
			}
		} else {
			likesCount.value += 1;
			if (sharedCount && sharedLiked) {
				sharedCount.value += 1;
				sharedLiked.value = true;
			}
		}
		isLiked.value = !isLiked.value;
		scaleAnimate.value = withSpring(1.1, {}, (finished) => {
			if (finished) scaleAnimate.value = withTiming(1, { duration: 500 });
			else console.log("ANIMATION GOT CANCELLED");
		});
	};

	const progress = useDerivedValue(() => isLiked.value ? withTiming(1) : withTiming(0));
	const animatedPropsFill = useAnimatedProps(() => {
		const fill = interpolateColor(
			progress.value,
			[0, 1],
			["rgba(255,255,255,1)", "rgb(86, 106, 236)"],
			"RGB",
		);

		return { fill };
	});

	const animatedPropsStroke = useAnimatedProps(() => {
		const fill = interpolateColor(
			progress.value,
			[0, 1],
			["rgba(0,0,0,1)", "rgb(86, 106, 236)"],
			"RGB",
		);

		return { fill };
	});

	function toggleShare () {
		navigation.navigate("InfoBottomSheetNew", {
			title: "Sorry, we’re still working on this",
		});
	}

	return (
		<Container>
			<ActionsWrapper type={ type }>
				<Like onPress={ checkIsLogged }>
					<Animated.View style={ animatedStyles }>
						<LikeIcon fill={ animatedPropsFill } stroke={ animatedPropsStroke } />
					</Animated.View>
					<LikeCount isLiked={ isLiked.value }>
						{type === "articleExtended" ? countLikes : likesCount.value}
					</LikeCount>
				</Like>
				{type !== "comments" && (
					<>
						<Comment
							onPress={ () => (commentToggle && type !== "articleExtended" ? commentToggle() : {}) }
						>
							<CommentsIcon />
							<CommentCount>{commentsCount}</CommentCount>
						</Comment>
						<Share onPress={ toggleShare }>
							<ShareIcon />
						</Share>
					</>
				)}
			</ActionsWrapper>
		</Container>
	);
};

const Container = styled.View`
	flex-direction: row;
	align-items: center;
	position: relative;
`;

const ActionsWrapper = styled.View<{ type?: string }>`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: ${({ type }) => (type !== "comments" ? "90%" : "auto")};
`;
const CommentCount = styled.Text`
	color: #000000;
	/*font-family: ProximaNova-Medium;*/
	font-family: ProximaNova-Regular;
	font-style: normal;
	font-weight: normal;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(17)}px;
	letter-spacing: ${scale(0.25)}px;
	font-variant: lining-nums;
	margin-left: ${scale(7)}px;
`;

const LikeCount = styled.Text<{ isLiked?: boolean }>`
	color: ${({ isLiked }) => (isLiked ? "#566AEC" : "#000000")};
	font-family: Proxima Nova;
	font-style: normal;
	font-weight: normal;
	font-size: ${scale(14)}px;
	line-height: ${verticalScale(17)}px;
	letter-spacing: ${scale(0.25)}px;
	font-variant: lining-nums;
	margin-left: ${scale(4)}px;
`;

const Like = styled.Pressable<{ type?: string }>`
	flex-direction: row;
	align-items: center;
	min-width: ${scale(40)}px;
`;

const Comment = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	align-items: center;
	position: absolute;
	left: ${scale(110)}px;
`;
const Share = styled.TouchableOpacity`
	margin-left: ${wp("3.7%")}px;
	transform: scale(0.9);
	position: absolute;
	left: ${scale(200)}px;
`;

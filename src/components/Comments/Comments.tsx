import React, { useCallback } from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";

import { sizeConverter } from "../../helpers/sizeConverter";
import { useAppSelector } from "../../hooks/useRedux";
import { ArticleSmall } from "../ArticleSmall/ArticleSmall";

export const Comments = ({
	navigation,
	userId,
	setReply,
	setInputValue,
	setRepliedUsername,
	repliedUsername,
}: any) => {
	const comments = useAppSelector((state) => state.feed.comments);
	const stateLogin = useAppSelector((state) => state.user.isLogin);
	const renderItem = useCallback(
		({ item }) => (
			<ArticleSmall
				username={ item.username }
				logoLink={ item.userLogo }
				feedBody={ item.text }
				replyTo={ item.replyTo }
				likesCount={ item.likesCount }
				commentsCount={ item.commentsCount }
				itemId={ item.id }
				isLiked={ item.isLiked }
				gifUrl={ item.gifUrl }
				userId={ userId }
				navigation={ navigation }
				publishedAt={ item.date }
				type="comments"
				name={ `${item.userFirstName} ${item.userLastName}` }
				isLogged={ stateLogin }
				setReply={ setReply }
				repliedUsername={ repliedUsername }
				setRepliedUsername={ setRepliedUsername }
				setInputValue={ setInputValue }
			/>
		),
		[],
	);
	const keyExtractor = useCallback((item, index) => index.toString(), []);

	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<Header>Comments</Header>
			{!!comments && (
				<CommentsWrapper
					keyboardShouldPersistTaps="handled"
					data={ comments }
					renderItem={ renderItem }
					keyExtractor={ keyExtractor }
				/>
			)}
		</ScrollView>
	);
};

const Header = styled.Text`
	margin: ${wp("2.6%")}px ${wp("4.26%")}px ${sizeConverter(15)}px ${wp("4.26%")}px;
	font-size: ${wp("4.8%")}px;
	line-height: ${wp("5.8%")}px;
`;

const CommentsWrapper = styled.FlatList``;

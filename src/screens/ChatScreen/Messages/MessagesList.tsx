import React, { FC, useEffect, useRef } from "react";
import { FlatList, ListRenderItem } from "react-native";
import styled from "styled-components/native";

import { verticalScale } from "../../../helpers/sizeConverter";
import { useAppSelector, useAppDispatch } from "../../../hooks/useRedux";
import {
	getChatMessages,
	setIsFetchingMessages,
	setMessages,
	setTotalMessages,
} from "../../../redux/chatSlice";
import { Message } from "./Message";
import { Message as MessageType } from "../../../types/commonTypes";
import { withLoader } from "../../../components/WithLoader/withLoader";

const RESULTS_LIMIT = 15;

const MessagesLoader: FC<any> = withLoader("totalMessages", RESULTS_LIMIT);

export const MessagesList: FC<any> = () => {
	const { activeChat, messages, totalMessages, selectedImages } = useAppSelector(
		(state) => state.chat,
	);
	const userId = useAppSelector((state) => state.user.userId);
	const dispatch = useAppDispatch();
	const offset = useRef(0);

	useEffect(() => {
		if (activeChat?.chatId) {
			dispatch(
				getChatMessages({
					chatId: activeChat.chatId,
					offset: offset.current,
					limit: RESULTS_LIMIT,
				}),
			);
		}
	}, [activeChat]);

	useEffect(() => function clear () {
		dispatch(setMessages([]));
		dispatch(setTotalMessages(0));
	}, []);

	function onReachedEnd () {
		if (activeChat) {
			if (offset.current <= Math.floor(totalMessages / RESULTS_LIMIT)) {
				offset.current += 1;
			}
			if (offset.current <= Math.floor(totalMessages / RESULTS_LIMIT)) {
				dispatch(
					getChatMessages({
						chatId: activeChat.chatId,
						offset: offset.current * RESULTS_LIMIT,
						limit: RESULTS_LIMIT,
					}),
				);
			} else {
				dispatch(setIsFetchingMessages(true));
				if (offset.current == Math.floor(totalMessages / RESULTS_LIMIT)) {
					offset.current += 1;
				}
				dispatch(setIsFetchingMessages(false));
			}
		}
	}

	function extractKey (item: MessageType, index: number) {
		return `message-${item.creationDate}+${index}`;
	}

	const renderMessage: ListRenderItem<MessageType> = ({ item }) => <Message { ...item } currentUserId={ userId ?? 0 } />;

	const BottomRenderItem = () => <MessagesLoader offset={ offset } />;

	return (
		<MessagesListWrapper height={ selectedImages.length ? 590 : 655 }>
			<FlatList
				keyExtractor={ extractKey }
				showsVerticalScrollIndicator={ false }
				renderItem={ renderMessage }
				data={ messages }
				onEndReached={ onReachedEnd }
				onEndReachedThreshold={ 0.1 }
				inverted
				ListFooterComponent={ BottomRenderItem }
				style={ {
					minHeight: "100%",
				} }
			/>
		</MessagesListWrapper>
	);
};

const MessagesListWrapper = styled.View<{ height: number }>`
	max-height: ${({ height }) => verticalScale(height)}px;
	height: 100%;
	border-bottom-width: 1px;
	border-bottom-color: rgba(0, 0, 0, 0.05);
	padding: 0 16px;
`;

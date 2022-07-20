import React, { FC, useEffect, useRef } from "react";
import { FlatList, ListRenderItem } from "react-native";
import styled from "styled-components/native";

import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { ChatType } from "../../../types/commonTypes";
import { getChatsList, setChatsList, setIsFetchingChats } from "../../../redux/chatSlice";
import { ChatBox } from "./ChatBox";
import { withLoader } from "../../../components/WithLoader/withLoader";

const RESULTS_LIMIT = 15;

const ChatsLoader: FC<any> = withLoader("totalChats", RESULTS_LIMIT);

export const ChatsList: FC<any> = ({ navigation }) => {
	const chats = useAppSelector((state) => state.chat.chatsList);
	const total = useAppSelector((state) => state.chat.totalChats);
	const userId = useAppSelector((state) => state.user.userId);
	const dispatch = useAppDispatch();
	const offset = useRef(0);

	useEffect(() => {
		if (userId) {
			dispatch(getChatsList({ userId, offset: offset.current, limit: RESULTS_LIMIT }));
		}

		return () => {
			dispatch(setChatsList([]));
		};
	}, []);

	const renderItem: ListRenderItem<ChatType> = ({ item }) => <ChatBox navigation={ navigation } data={ item } />;

	const onReachedEnd = () => {
		if (userId) {
			if (offset.current <= Math.floor(total / RESULTS_LIMIT)) {
				offset.current += 1;
			}
			if (offset.current <= Math.floor(total / RESULTS_LIMIT)) {
				dispatch(getChatsList({ userId, offset: offset.current, limit: RESULTS_LIMIT }));
			} else {
				dispatch(setIsFetchingChats(true));
				if (offset.current == Math.floor(total / RESULTS_LIMIT)) {
					offset.current += 1;
				}
				dispatch(setIsFetchingChats(false));
			}
		}
	};

	const BottomRenderItem = () => <ChatsLoader offset={ offset } />;

	const extractKey = (item: ChatType) => `chat-${item.chatId}`;

	return (
		<Wrapper>
			<FlatList
				keyExtractor={ extractKey }
				data={ chats }
				renderItem={ renderItem }
				showsVerticalScrollIndicator={ false }
				onEndReached={ onReachedEnd }
				onEndReachedThreshold={ 0.1 }
				ListFooterComponent={ BottomRenderItem }
			/>
		</Wrapper>
	);
};

const Wrapper = styled.View`
	padding: 8px 16px 0 16px;
`;

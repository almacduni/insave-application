import React, { FC, useEffect } from "react";
import styled from "styled-components/native";

import { TopBar } from "../../../components/TopBar/TopBar";
import { WIDTH } from "../../../constants/sizes";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { useChatWebsocket } from "../../../hooks/useChatWebsocket";
import { addMessage, setActiveChat, setAssets, setMessages } from "../../../redux/chatSlice";
import { MessagesList } from "./MessagesList";
import { MessageSendForm } from "./MessageSendForm";
import { baseUrl } from "../../../api/api-helpers";

export const MessagesScreen: FC<any> = ({ navigation, route }) => {
	const dispatch = useAppDispatch();
	const activeChat = useAppSelector((state) => state.chat.activeChat);
	const userId = useAppSelector((state) => state.user.userId);

	const stompSocket = useChatWebsocket(
		{
			brokerUrl: `${baseUrl}stomp`,
			subs: [
				{
					dest: ([chatId]) => `/messages/${chatId}`,
					onMessage: (message) => {
						const msg = JSON.parse(message.body);

						dispatch(
							addMessage({
								userId: msg.userId,
								text: msg.text,
								creationDate: msg.creationDate,
								files: msg.filesLinks,
							}),
						);
					},
					headers: {},
				},
			],
		},
		[activeChat?.chatId],
	);

	useEffect(() => () => {
		dispatch(setMessages([]));
		dispatch(setActiveChat(null));
		dispatch(setAssets([]));
		stompSocket.deactivate();
	}, []);

	return (
		<ChatWrapper behavior={ userId === null ? "height" : "padding" } keyboardVerticalOffset={ -130 }>
			<TopBar
				title={ route?.params?.params?.chatName || "Support" }
				backButtonTitle={ "Back" }
				goBack={ navigation.goBack }
			/>
			{userId && <MessagesList />}
			<MessageSendForm />
		</ChatWrapper>
	);
};

const ChatWrapper = styled.KeyboardAvoidingView`
	flex: 1;
	width: ${WIDTH}px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
`;

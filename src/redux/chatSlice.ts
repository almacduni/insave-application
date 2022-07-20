import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset } from "react-native-image-picker";

import { ChatAPI } from "../api/chat-api";
import { ChatType, Message } from "../types/commonTypes";
import { RootState } from "./redux-store";

const initialState = {
	activeChat: null as ChatType | null,
	chatsList: [] as ChatType[],
	messages: [] as Message[],
	totalMessages: 0,
	totalChats: 0,
	isFetchingChats: false,
	isFetchingActiveChat: false,
	isFetchingMessages: false,
	isFetchingMessage: false,
	selectedImages: [] as Asset[],
};

export type ChatStateType = typeof initialState;
export type FetchingType = PayloadAction<boolean>;

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		deleteAsset: (state: ChatStateType, action: PayloadAction<{ uri: string }>) => {
			const assets = state.selectedImages.filter((image) => image.uri !== action.payload.uri);

			state.selectedImages = assets;
		},
		setAssets: (state: ChatStateType, action: PayloadAction<Asset[]>) => {
			state.selectedImages = action.payload;
		},
		addMessage: (state: ChatStateType, action: PayloadAction<Message>) => {
			state.messages = [action.payload, ...state.messages];
		},
		setMessages: (state: ChatStateType, action: PayloadAction<Message[]>) => {
			state.messages = action.payload;
		},
		addChats: (state: ChatStateType, action: PayloadAction<ChatType[]>) => {
			state.chatsList = [...state.chatsList, ...action.payload];
		},
		setChatsList: (state: ChatStateType, action: PayloadAction<ChatType[]>) => {
			state.chatsList = action.payload;
		},
		setActiveChat: (state: ChatStateType, action: PayloadAction<ChatType | null>) => {
			state.activeChat = action.payload;
		},
		setTotalMessages: (state: ChatStateType, action: PayloadAction<number>) => {
			state.totalMessages = action.payload;
		},
		setTotalChats: (state: ChatStateType, action: PayloadAction<number>) => {
			state.totalChats = action.payload;
		},
		setIsFetchingChats: (state: ChatStateType, action: FetchingType) => {
			state.isFetchingChats = action.payload;
		},
		setIsFetchingActiveChat: (state: ChatStateType, action: FetchingType) => {
			state.isFetchingActiveChat = action.payload;
		},
		setIsFetchingMessages: (state: ChatStateType, action: FetchingType) => {
			state.isFetchingMessages = action.payload;
		},
		setIsFetchingMessage: (state: ChatStateType, action: FetchingType) => {
			state.isFetchingMessage = action.payload;
		},
	},
});

export const {
	setAssets,
	deleteAsset,
	setActiveChat,
	addMessage,
	setChatsList,
	setMessages,
	setIsFetchingChats,
	setIsFetchingActiveChat,
	setIsFetchingMessages,
	setIsFetchingMessage,
	setTotalMessages,
	setTotalChats,
	addChats,
} = chatSlice.actions;

const getChats = async (payload: {
	userId: number;
	offset: number;
	limit: number;
}): Promise<{
	chatsList: ChatType[];
	total: number;
}> => {
	let chatMessages: {
		chatsList: ChatType[];
		total: number;
	} = { chatsList: [], total: 0 };

	try {
		chatMessages = await ChatAPI.getSupportChats(payload);
		chatMessages.chatsList.unshift(await ChatAPI.getCommonChat());
	} catch (e) {
		chatMessages = await ChatAPI.getUserChats(payload);
	}

	return chatMessages;
};

export const getChatsList = createAsyncThunk(
	"chat/get-chats-list",
	async (
		payload: { userId: number; offset: number; limit: number },
		{ dispatch, rejectWithValue },
	) => {
		dispatch(setIsFetchingChats(true));
		try {
			const { chatsList, total } = await getChats(payload);

			dispatch(setChatsList(chatsList));
			dispatch(setTotalChats(total));
			dispatch(setIsFetchingChats(false));
		} catch (e) {
			dispatch(setIsFetchingChats(false));

			return rejectWithValue(e);
		}
	},
);

export const getChatMessages = createAsyncThunk<any, any, { state: RootState }>(
	"chat/get-chat-messages",
	async (
		payload: { chatId: number; offset: number; limit: number },
		{ getState, dispatch, rejectWithValue },
	) => {
		dispatch(setIsFetchingMessages(true));
		try {
			const chatMessages = await ChatAPI.getChatMessages(payload);
			const currentMessages = getState().chat.messages;

			dispatch(
				setMessages(chatMessages.messages ? [...currentMessages, ...chatMessages.messages] : []),
			);
			dispatch(setTotalMessages(chatMessages.total || 0));
			dispatch(setIsFetchingMessages(false));
		} catch (e) {
			dispatch(setIsFetchingMessages(false));

			return rejectWithValue(e);
		}
	},
);

export const sendMessage = createAsyncThunk(
	"chat/send-message",
	async (payload: any, { dispatch, rejectWithValue }) => {
		dispatch(setIsFetchingMessage(true));
		try {
			await ChatAPI.sendMessage(payload);
			dispatch(setIsFetchingMessage(false));
		} catch (e) {
			dispatch(setIsFetchingMessage(false));

			return rejectWithValue(e);
		}
	},
);

export const getCommonChat = createAsyncThunk(
	"chat/get-common-chat",
	async (_, { dispatch, rejectWithValue }) => {
		dispatch(setIsFetchingChats(true));
		try {
			const chat = await ChatAPI.getCommonChat();

			dispatch(setActiveChat(chat));
			dispatch(setIsFetchingChats(false));
		} catch (e) {
			dispatch(setIsFetchingChats(false));

			return rejectWithValue(e);
		}
	},
);
